"use client";

import { useMemo, useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Loader, Send } from "lucide-react";
import ErrorModal from "@/components/ErrorModal";

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, Filler, Tooltip, Legend
);

const TIERS = [
  { name: "Registered", threshold: "$0", color: "bg-[#185FA5]/10 text-[#185FA5]" },
  { name: "Silver", threshold: "$25K", color: "bg-slate-200 text-slate-600" },
  { name: "Gold", threshold: "$50K", color: "bg-amber-100 text-amber-700" },
  { name: "Platinum", threshold: "$100K+", color: "bg-violet-100 text-violet-700" },
];

function useChartColors() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return {
    gridColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    labelColor: isDark ? "#9c9a92" : "#73726c",
  };
}

function Card({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="rounded-xl border border-border bg-background p-5"
    >
      <div className="text-[13px] font-medium text-foreground mb-4">{title}</div>
      {children}
    </motion.div>
  );
}

function CommissionLineChart({ data }: { data: { month: string; amount: number }[] }) {
  const { gridColor, labelColor } = useChartColors();

  const chartData = useMemo(() => ({
    labels: data.map((d) => d.month),
    datasets: [{
      label: "Commission ($)",
      data: data.map((d) => d.amount),
      borderColor: "#185FA5",
      backgroundColor: "rgba(24, 95, 165, 0.08)",
      fill: true,
      tension: 0.4,
    }],
  }), [data]);

  const options: ChartOptions<"line"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (c: TooltipItem<"line">) => `$${Number(c.parsed.y).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 11 } } },
      y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 11 }, callback: (v) => `$${v}` } },
    },
    animation: { duration: 900, easing: "easeOutQuart" },
  }), [gridColor, labelColor]);

  return <Line data={chartData} options={options} />;
}

function RevenueVsCommissionChart({ data }: { data: { label: string; revenue: number; commission: number }[] }) {
  const { gridColor, labelColor } = useChartColors();

  const chartData = useMemo(() => ({
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Net Revenue",
        data: data.map((d) => d.revenue),
        backgroundColor: "#185FA5",
        borderRadius: 4,
        barThickness: 16,
      },
      {
        label: "Commission",
        data: data.map((d) => d.commission),
        backgroundColor: "#3B6D11",
        borderRadius: 4,
        barThickness: 16,
      },
    ],
  }), [data]);

  const options: ChartOptions<"bar"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: labelColor, font: { size: 11 }, boxWidth: 12 } },
      tooltip: {
        callbacks: {
          // Fixed: use TooltipItem<"bar"> to avoid implicit any on c.parsed.y
          label: (c: TooltipItem<"bar">) => ` $${Math.round(Number(c.parsed.y)).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 10 } } },
      y: {
        grid: { color: gridColor },
        ticks: { color: labelColor, font: { size: 11 }, callback: (v) => `$${v}` },
      },
    },
    animation: { duration: 900, easing: "easeOutQuart" },
  }), [gridColor, labelColor]);

  return <Bar data={chartData} options={options} />;
}

export default function CommissionsPage() {
  const commissions = useQuery(api.leads.getCommissions);
  const partnerData = useQuery(api.dashboard.getPartnerData);
  // getCurrentPartner includes email — getPartnerData does not
  const currentPartner = useQuery(api.users.getCurrentPartner);

  const [disputeOpen, setDisputeOpen] = useState(false);
  const [disputeMsg, setDisputeMsg] = useState("");
  const [disputeSending, setDisputeSending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "info">("info");

  const showModal = (msg: string, type: "error" | "info" = "info") => {
    setModalMsg(msg);
    setModalType(type);
    setModalOpen(true);
  };

  const handleDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeMsg.trim()) return showModal("Please describe the dispute.", "error");
    setDisputeSending(true);
    try {
      const res = await fetch("/api/dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerEmail: currentPartner?.email ?? "unknown",
          partnerName: currentPartner?.name ?? partnerData?.name ?? "unknown",
          message: disputeMsg,
        }),
      });
      if (res.ok) {
        setDisputeOpen(false);
        setDisputeMsg("");
        showModal("Dispute submitted. We'll review it within 2 business days.", "info");
      } else {
        showModal("Failed to send. Please email partnerships@deeptrack.io directly.", "error");
      }
    } catch {
      showModal("Network error. Please email partnerships@deeptrack.io directly.", "error");
    } finally {
      setDisputeSending(false);
    }
  };

  const safeCommissions = commissions ?? [];
  const totalEarned = safeCommissions.reduce((s: number, c: any) => s + (c.amount || 0), 0);
  const pending = safeCommissions.filter((c: any) => c.status === "pending");
  const pendingTotal = pending.reduce((s: number, c: any) => s + (c.amount || 0), 0);

  const metrics = [
    { label: "Lifetime earned", value: `$${totalEarned.toLocaleString()}`, sub: "All time commissions" },
    {
      label: "Pending payment",
      value: `$${pendingTotal.toLocaleString()}`,
      sub: `${pending.length} deal${pending.length !== 1 ? "s" : ""} awaiting payment`,
    },
    {
      label: "Commission rate",
      value: partnerData ? `${partnerData.commissionRate}%` : "—",
      sub: `${partnerData?.tier || "Registered"} tier rate`,
    },
  ];

  const monthlyData = useMemo(() => {
    const byMonth: Record<string, number> = {};
    safeCommissions.forEach((c: any) => {
      const m = new Date(c.createdAt || Date.now()).toLocaleString("default", { month: "short" });
      byMonth[m] = (byMonth[m] || 0) + (c.amount || 0);
    });
    return Object.entries(byMonth).map(([month, amount]) => ({ month, amount }));
  }, [safeCommissions]);

  const revVsCommData = useMemo(() => {
    return safeCommissions.slice(0, 8).map((c: any, i: number) => ({
      label: `Deal ${i + 1}`,
      revenue: c.amount && c.rate ? Math.round(c.amount / c.rate) : 0,
      commission: c.amount || 0,
    }));
  }, [safeCommissions]);

  const isLoading = commissions === undefined || partnerData === undefined || currentPartner === undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
      <ErrorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalType === "error" ? "Error" : "Submitted"}
        message={modalMsg}
        type={modalType}
      />

      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-[18px] font-medium text-foreground">Commissions</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Track your earnings and payment history</p>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="rounded-xl border border-border bg-muted/40 px-4 py-4"
          >
            <div className="text-[10px] uppercase tracking-[0.07em] font-medium text-muted-foreground mb-2">{m.label}</div>
            <div className="text-[22px] font-semibold text-[#3B6D11] mb-1">{m.value}</div>
            <div className="text-[11px] text-muted-foreground">{m.sub}</div>
          </motion.div>
        ))}
      </div>

      {safeCommissions.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">No commissions earned yet</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card title="Commission over time" delay={0.1}>
              <div className="h-[200px]"><CommissionLineChart data={monthlyData} /></div>
            </Card>
            <Card title="Revenue vs commission per deal" delay={0.15}>
              <div className="h-[200px]"><RevenueVsCommissionChart data={revVsCommData} /></div>
            </Card>
          </div>

          {/* Deal breakdown */}
          <Card title="Deal breakdown" delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Deal", "Close date", "Net revenue", "Rate", "Commission", "Status"].map((h) => (
                      <th key={h} className="px-4 py-2 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {safeCommissions.map((c: any, i: number) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 text-[13px] text-foreground">Deal {i + 1}</td>
                      <td className="px-4 py-3 text-[13px] text-foreground">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-foreground">
                        ${c.rate ? Math.round(c.amount / c.rate).toLocaleString() : "—"}
                      </td>
                      <td className="px-4 py-3 text-[13px] text-foreground">
                        {c.rate ? `${Math.round(c.rate * 100)}%` : "—"}
                      </td>
                      <td className="px-4 py-3 text-[13px] font-medium text-[#3B6D11]">${c.amount?.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          c.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {c.status === "paid" ? "Paid" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Payment history */}
          <Card title="Payment history" delay={0.25}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Period", "Amount", "Method", "Paid on", "Status"].map((h) => (
                      <th key={h} className="px-4 py-2 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {safeCommissions.filter((c: any) => c.status === "paid").length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-[13px] text-muted-foreground">No payments recorded yet</td>
                    </tr>
                  ) : (
                    safeCommissions
                      .filter((c: any) => c.status === "paid")
                      .map((c: any, i: number) => (
                        <tr key={i} className="border-b border-border hover:bg-muted/20">
                          <td className="px-4 py-3 text-[13px] text-foreground">{c.period || "—"}</td>
                          <td className="px-4 py-3 text-[13px] font-medium text-[#3B6D11]">${c.amount?.toLocaleString()}</td>
                          <td className="px-4 py-3 text-[13px] text-foreground">{c.paymentMethod || "—"}</td>
                          <td className="px-4 py-3 text-[13px] text-foreground">
                            {c.paidAt ? new Date(c.paidAt).toLocaleDateString() : "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-green-100 text-green-700">Paid</span>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Tier progress card */}
      <Card title="Partner tiers" delay={0.3}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIERS.map((tier) => {
            const isCurrent = partnerData?.tier === tier.name;
            return (
              <div key={tier.name} className={`rounded-lg p-3 border-2 transition-all ${isCurrent ? "border-[#185FA5] shadow-sm" : "border-transparent bg-muted/40"}`}>
                <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${tier.color}`}>{tier.name}</span>
                <p className="text-[11px] text-muted-foreground mt-1.5">From {tier.threshold}</p>
                {isCurrent && <p className="text-[10px] text-[#185FA5] font-medium mt-1">← Current tier</p>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Dispute */}
      <div className="flex flex-col items-center gap-3">
        {!disputeOpen ? (
          <button onClick={() => setDisputeOpen(true)}
            className="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
            Flag a Commission Dispute
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg rounded-xl border border-border bg-background p-5 space-y-3"
          >
            <h3 className="text-[14px] font-medium text-foreground">Commission Dispute</h3>
            <p className="text-[12px] text-muted-foreground">Describe the issue and we'll review it within 2 business days.</p>
            <form onSubmit={handleDispute} className="space-y-3">
              <textarea
                value={disputeMsg}
                onChange={(e) => setDisputeMsg(e.target.value)}
                rows={4}
                placeholder="Describe the commission discrepancy, including deal reference and expected amount..."
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
              />
              <div className="flex gap-2">
                <button type="submit" disabled={disputeSending}
                  className="flex items-center gap-2 px-4 py-2 bg-[#185FA5] text-white rounded-md text-sm font-medium hover:bg-[#154c88] disabled:bg-muted disabled:cursor-not-allowed">
                  <Send className="w-3.5 h-3.5" />
                  {disputeSending ? "Sending..." : "Submit Dispute"}
                </button>
                <button type="button" onClick={() => { setDisputeOpen(false); setDisputeMsg(""); }}
                  className="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted/50">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
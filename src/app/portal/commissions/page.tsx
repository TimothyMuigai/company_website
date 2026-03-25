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
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Loader } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

function useChartColors() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return {
    gridColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    labelColor: isDark ? "#9c9a92" : "#73726c",
  };
}

function CommissionOverTimeChart({ data }: { data: any[] }) {
  const { gridColor, labelColor } = useChartColors();

  const chartData = useMemo(() => {
    const labels = data.map((d) => d.month);
    const values = data.map((d) => d.amount || 0);
    return {
      labels,
      datasets: [
        {
          label: "Commission ($)",
          data: values,
          borderColor: "#185FA5",
          backgroundColor: "rgba(24, 95, 165, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => `$${c.parsed.y}`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: labelColor, font: { size: 11 } },
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: labelColor,
            font: { size: 11 },
            callback: (v) => `$${v}`,
          },
        },
      },
      animation: {
        duration: 900,
        easing: "easeOutQuart",
      },
    }),
    [gridColor, labelColor]
  );

  return <Line data={chartData} options={options} />;
}

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`rounded-xl border border-border bg-background p-5 ${className}`}
    >
      <div className="text-[13px] font-medium text-foreground mb-3">{title}</div>
      {children}
    </motion.div>
  );
}

export default function CommissionsPage() {
  const commissions = useQuery(api.leads.getCommissions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (commissions !== undefined) {
      setIsLoading(false);
    }
  }, [commissions]);

  if (isLoading) {
    return (
      <div className="px-6 py-6 max-w-[1200px] mx-auto flex items-center justify-center min-h-[400px]">
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!commissions || commissions.length === 0) {
    return (
      <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-[18px] font-medium text-foreground">Commissions</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Track your earnings and payment history
          </p>
        </motion.div>
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            No commissions earned yet
          </p>
        </div>
      </div>
    );
  }

  // Calculate metrics from commissions
  const totalEarned = commissions.reduce((sum: number, c: any) => sum + (c.amount || 0), 0);
  const metrics = [
    { label: "Lifetime earned", value: `$${totalEarned}`, sub: "Total commissions" },
    { label: "Total deals", value: commissions.length.toString(), sub: "Closed deals" },
    { label: "Average deal", value: `$${Math.round(totalEarned / (commissions.length || 1))}`, sub: "Average commission" },
  ];

  // Build monthly data for charts
  const monthlyData = useMemo(() => {
    const byMonth: Record<string, number> = {};
    commissions.forEach((c: any) => {
      const date = new Date(c.createdAt || Date.now());
      const month = date.toLocaleString("default", { month: "short" });
      byMonth[month] = (byMonth[month] || 0) + (c.amount || 0);
    });
    return Object.entries(byMonth).map((m) => ({ month: m[0], amount: m[1] }));
  }, [commissions]);

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-[18px] font-medium text-foreground">Commissions</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Track your earnings and payment history
        </p>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="rounded-xl border border-border bg-muted/40 px-4 py-4"
          >
            <div className="text-[10px] uppercase tracking-[0.07em] font-medium text-muted-foreground mb-2">
              {metric.label}
            </div>
            <div className="text-[22px] font-semibold text-[#3B6D11] mb-1">
              {metric.value}
            </div>
            <div className="text-[11px] text-muted-foreground">{metric.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4">
        <Card title="Commission over time">
          <div className="relative h-[200px]">
            <CommissionOverTimeChart data={monthlyData} />
          </div>
        </Card>
      </div>

      {/* Deal breakdown table */}
      <Card title="Deal breakdown">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Lead Name
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Created
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((commission: any, i: number) => (
                <tr key={i} className="border-b border-border">
                  <td className="px-4 py-3 text-[13px] text-foreground">{commission.leadId}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">
                    {new Date(commission.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-foreground">${commission.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Dispute button */}
      <div className="flex justify-center">
        <button className="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted/50">
          Flag Commission Dispute
        </button>
      </div>
    </div>
  );
}
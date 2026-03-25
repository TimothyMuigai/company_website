"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Loader,
} from "lucide-react";
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
import { Bar } from "react-chartjs-2";

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

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

type Tier = "Registered" | "Silver" | "Gold" | "Platinum";

interface MetricCard {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  colorClass: string;
}

interface FunnelStage {
  label: string;
  count: number;
  color: string;
  pct: number;
}

// ---------------------------------------------------------------------------
// ANIMATION VARIANTS
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const cardVariant = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

const TIER_COLORS: Record<Tier, { badge: string }> = {
  Registered: { badge: "bg-[#185FA5]/10 text-[#185FA5]" },
  Silver: { badge: "bg-slate-200/70 text-slate-600" },
  Gold: { badge: "bg-amber-100 text-amber-700" },
  Platinum: { badge: "bg-violet-100 text-violet-700" },
};

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

// ---------------------------------------------------------------------------
// useChartColors — SSR safe (no window access on server)
// ---------------------------------------------------------------------------

function useChartColors() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Return safe defaults before mount — same on server and client first pass
  if (!mounted) {
    return { gridColor: "rgba(0,0,0,0.06)", labelColor: "#73726c" };
  }

  return {
    gridColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    labelColor: isDark ? "#9c9a92" : "#73726c",
  };
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function TierBar({
  tier,
  currentRevenue,
  tierTarget,
  nextTier,
}: {
  tier: Tier;
  currentRevenue: number;
  tierTarget: number;
  nextTier: Tier;
}) {
  const pct = Math.min(100, Math.round((currentRevenue / tierTarget) * 100));
  const remaining = tierTarget - currentRevenue;
  const tierColor = TIER_COLORS[tier] ?? TIER_COLORS["Registered"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-5 rounded-xl border border-border bg-muted/40 px-5 py-4 mb-6"
    >
      <span className={`shrink-0 rounded px-3 py-1 text-[11px] font-semibold tracking-wide ${tierColor.badge}`}>
        {tier} partner
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-muted-foreground">
            {fmt(currentRevenue)} toward {nextTier} ({fmt(tierTarget)})
          </span>
          <span className="text-xs font-semibold text-foreground">{pct}%</span>
        </div>
        <div className="h-[6px] rounded-full bg-background border border-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#185FA5]"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
      <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
        {fmt(remaining)} to {nextTier}
      </span>
    </motion.div>
  );
}

function MetricCardComponent({ card, index }: { card: MetricCard; index: number }) {
  const Icon = card.icon;
  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: 0.12 + index * 0.07, ease: "easeOut" }}
      className="rounded-xl border border-border bg-muted/40 px-4 py-4 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.07em] font-medium text-muted-foreground">
          {card.label}
        </span>
        <Icon className={`w-3.5 h-3.5 ${card.colorClass} opacity-70`} />
      </div>
      <div className={`text-[22px] font-semibold leading-none ${card.colorClass}`}>
        {card.value}
      </div>
      <div className="text-[11px] text-muted-foreground">{card.sub}</div>
    </motion.div>
  );
}

function FunnelChart({ stages }: { stages: FunnelStage[] }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-2 mt-2">
      {stages.map((s, i) => (
        <motion.div
          key={s.label}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, delay: i * 0.06 }}
          className="flex items-center gap-3"
        >
          <span className="text-[12px] text-muted-foreground w-24 text-right shrink-0">
            {s.label}
          </span>
          <div className="flex-1 h-7 rounded bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded flex items-center px-3"
              style={{ backgroundColor: s.color }}
              initial={{ width: 0 }}
              animate={{ width: animated ? `${s.pct}%` : 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] font-medium text-white whitespace-nowrap">
                {s.count} {s.label === "Closed" ? "deals" : "leads"}
              </span>
            </motion.div>
          </div>
          <span className="text-[12px] text-muted-foreground w-6 shrink-0">{s.count}</span>
        </motion.div>
      ))}
    </div>
  );
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

function RevenueChart({ chartData }: { chartData: { month: string; revenue: number }[] }) {
  // ✅ useChartColors called at top of this component — never conditionally
  const { gridColor, labelColor } = useChartColors();

  const data = useMemo(() => ({
    labels: chartData.map((d) => d.month),
    datasets: [{
      data: chartData.map((d) => d.revenue),
      backgroundColor: "#185FA5",
      borderRadius: 4,
      barThickness: 28,
    }],
  }), [chartData]);

  const options: ChartOptions<"bar"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (c) => " $" + Math.round(c.parsed.y).toLocaleString() } },
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 11 } } },
      y: {
        grid: { color: gridColor },
        ticks: { color: labelColor, font: { size: 11 }, callback: (v) => "$" + v.toLocaleString() },
      },
    },
    animation: { duration: 900, easing: "easeOutQuart" },
  }), [gridColor, labelColor]);

  return <Bar data={data} options={options} />;
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  // ✅ ALL hooks here — before any conditional returns
  const partnerData = useQuery(api.dashboard.getPartnerData);
  const revenueChartData = useQuery(api.dashboard.getRevenueData);
  const funnel = useQuery(api.dashboard.getFunnel);

  const subtitle = useMemo(() => {
    const now = new Date();
    return `Your program snapshot for ${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}.`;
  }, []);

  const chartData = useMemo(() => {
    if (!revenueChartData) return [];
    return (revenueChartData.labels as string[]).map((label, idx) => ({
      month: label,
      revenue: (revenueChartData.data as number[])[idx] ?? 0,
    }));
  }, [revenueChartData]);

  const metrics: MetricCard[] = useMemo(() => {
    if (!partnerData) return [];
    return [
      {
        label: "Total leads",
        value: String(partnerData.totalLeads),
        sub: "Total leads submitted",
        icon: Users,
        colorClass: "text-[#185FA5]",
      },
      {
        label: "Deals closed",
        value: String(partnerData.dealsClosed),
        sub: `$${partnerData.currentRevenue.toLocaleString()} net revenue`,
        icon: Briefcase,
        colorClass: "text-[#3B6D11]",
      },
      {
        label: "Commission earned",
        value: `$${Math.round(partnerData.currentRevenue * (partnerData.commissionRate / 100))}`,
        sub: "Lifetime total",
        icon: DollarSign,
        colorClass: "text-[#3B6D11]",
      },
      {
        label: "Conversion rate",
        value: `${partnerData.conversionRate}%`,
        sub: `${partnerData.dealsClosed} of ${partnerData.totalLeads} leads closed`,
        icon: TrendingUp,
        colorClass: "text-[#BA7517]",
      },
    ];
  }, [partnerData]);

  // ✅ Early returns AFTER all hooks
  const isLoading = partnerData === undefined || revenueChartData === undefined || funnel === undefined;

  if (isLoading) {
    return (
      <div className="px-6 py-6 max-w-[1100px] mx-auto flex items-center justify-center min-h-[400px]">
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!partnerData || !revenueChartData || !funnel) {
    return (
      <div className="px-6 py-6 max-w-[1100px] mx-auto">
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
          <p className="text-sm text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 max-w-[1100px] mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5"
      >
        <h1 className="text-[18px] font-medium text-foreground">Dashboard</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">{subtitle}</p>
      </motion.div>

      {/* Tier progress bar */}
      <TierBar
        tier={partnerData.tier as Tier}
        currentRevenue={partnerData.currentRevenue}
        tierTarget={partnerData.tierTarget ?? 10000}
        nextTier={partnerData.nextTier as Tier}
      />

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {metrics.map((card, i) => (
          <MetricCardComponent key={card.label} card={card} index={i} />
        ))}
      </div>

      {/* Revenue + Funnel */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card title="Monthly revenue generated" delay={0.28}>
          <div className="relative h-[180px]">
            <RevenueChart chartData={chartData} />
          </div>
        </Card>

        <Card title="Lead pipeline funnel" delay={0.34}>
          <FunnelChart stages={funnel as FunnelStage[]} />
        </Card>
      </div>

      {/* Partner insights */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.45 }}
        className="rounded-xl border border-border bg-background p-5"
      >
        <div className="text-[13px] font-medium text-foreground mb-4">Partner insights</div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Current tier", value: partnerData.tier },
            { label: "Commission rate", value: `${partnerData.commissionRate}%` },
            { label: "Total revenue", value: `$${partnerData.currentRevenue.toLocaleString()}` },
            { label: "Next tier goal", value: fmt(partnerData.tierTarget ?? 10000) },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-muted/70 p-3">
              <div className="text-[10px] uppercase tracking-[0.07em] text-muted-foreground mb-1">{item.label}</div>
              <div className="text-[13px] font-semibold text-foreground">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <a
            href="/portal/leads/submit"
            className="inline-block rounded-md bg-[#185FA5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#154c88] transition-colors"
          >
            Submit a new lead →
          </a>
        </div>
      </motion.div>
    </div>
  );
}
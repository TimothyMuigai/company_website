"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Activity,
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
import { Bar, Doughnut } from "react-chartjs-2";

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
type DotColor = "green" | "blue" | "amber";

interface Partner {
  name: string;
  tier: Tier;
  commissionRate: number;
  currentRevenue: number;
  tierTarget: number;
  nextTier: Tier;
}

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

interface MarketRow {
  label: string;
  count: number;
  pct: number;
}

interface ActivityEvent {
  dot: DotColor;
  text: string;
  time: string;
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

const DOT_CLASSES: Record<DotColor, string> = {
  green: "bg-[#3B6D11]",
  blue: "bg-[#185FA5]",
  amber: "bg-[#BA7517]",
};

const TIER_COLORS: Record<Tier, { badge: string; label: string }> = {
  Registered: {
    badge: "bg-[#185FA5]/10 text-[#185FA5]",
    label: "Registered",
  },
  Silver: { badge: "bg-slate-200/70 text-slate-600", label: "Silver" },
  Gold: { badge: "bg-amber-100 text-amber-700", label: "Gold" },
  Platinum: { badge: "bg-violet-100 text-violet-700", label: "Platinum" },
};

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function TierBar({ partner }: { partner: Partner }) {
  const pct = Math.min(
    100,
    Math.round((partner.currentRevenue / partner.tierTarget) * 100)
  );
  const remaining = partner.tierTarget - partner.currentRevenue;
  const tierColor = TIER_COLORS[partner.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-5 rounded-xl border border-border bg-muted/40 px-5 py-4 mb-6"
    >
      <span
        className={`shrink-0 rounded px-3 py-1 text-[11px] font-semibold tracking-wide ${tierColor.badge}`}
      >
        {partner.tier} partner
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-muted-foreground">
            {fmt(partner.currentRevenue)} toward {partner.nextTier} (
            {fmt(partner.tierTarget)})
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
        {fmt(remaining)} to {partner.nextTier}
      </span>
    </motion.div>
  );
}

function MetricCardComponent({
  card,
  index,
}: {
  card: MetricCard;
  index: number;
}) {
  const Icon = card.icon;
  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: "easeOut" }}
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
          custom={i}
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
              transition={{
                duration: 0.7,
                delay: 0.5 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="text-[11px] font-medium text-white whitespace-nowrap">
                {s.count} {s.count === 1 ? "lead" : s.label === "Closed" ? "deals" : "leads"}
              </span>
            </motion.div>
          </div>
          <span className="text-[12px] text-muted-foreground w-6 shrink-0">
            {s.count}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function Card({
  title,
  children,
  delay = 0,
  legend,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
  legend?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="rounded-xl border border-border bg-background p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-[13px] font-medium text-foreground">{title}</div>
        {legend}
      </div>
      {children}
    </motion.div>
  );
}

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

function RevenueChartWithData({ chartData }: { chartData: any[] }) {
  const { gridColor, labelColor } = useChartColors();

  const data = useMemo(() => {
    const labels = chartData.map((d) => d.month);
    const values = chartData.map((d) => d.revenue || 0);

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: "#185FA5",
          borderRadius: 4,
          barThickness: 28,
        },
      ],
    };
  }, [chartData]);

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => " $" + Math.round(c.parsed.y || 0).toLocaleString(),
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
            callback: (v) => "$" + v.toLocaleString(),
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

  return <Bar data={data} options={options} />;
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  // Real Convex queries
  const partnerData = useQuery(api.dashboard.getPartnerData);
  const dashboardStats = useQuery(api.dashboard.getMetrics);
  const revenueChartData = useQuery(api.dashboard.getRevenueData);
  const funnel = useQuery(api.dashboard.getFunnel);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      partnerData !== undefined &&
      dashboardStats !== undefined &&
      revenueChartData !== undefined &&
      funnel !== undefined
    ) {
      setIsLoading(false);
    }
  }, [partnerData, dashboardStats, revenueChartData, funnel]);

  if (isLoading) {
    return (
      <div className="px-6 py-6 max-w-[1400px] mx-auto flex items-center justify-center min-h-[400px]">
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!partnerData || !dashboardStats || !revenueChartData || !funnel) {
    return (
      <div className="px-6 py-6 max-w-[1400px] mx-auto">
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
          <p className="text-sm text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  // Build metric cards from real data
  const metrics: MetricCard[] = [
    {
      label: "Total leads",
      value: partnerData.totalLeads.toString(),
      sub: "Total leads submitted",
      icon: Users,
      colorClass: "text-[#185FA5]",
    },
    {
      label: "Deals closed",
      value: partnerData.dealsClosed.toString(),
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

  // Build revenue chart data from labels and data arrays
  const chartData = useMemo(() => {
    return revenueChartData.labels.map((label: string, idx: number) => ({
      month: label,
      revenue: revenueChartData.data[idx] || 0,
    }));
  }, [revenueChartData]);


  const subtitle = useMemo(() => {
    const now = new Date();
    return `Your program snapshot for ${now.toLocaleString("default", {
      month: "long",
    })} ${now.getFullYear()}.`;
  }, []);

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
      <TierBar partner={{ ...partnerData, nextTier: partnerData.nextTier as Tier }} />

      {/* Metric cards */}
      <motion.div className="grid grid-cols-4 gap-3 mb-6">
        {metrics.map((card, i) => (
          <MetricCardComponent key={card.label} card={card} index={i} />
        ))}
      </motion.div>

      {/* Row 1 + side panel */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <Card title="Monthly revenue generated" delay={0.28}>
            <div className="relative h-[180px]">
              <RevenueChartWithData chartData={chartData} />
            </div>
          </Card>

          <Card title="Lead pipeline funnel" delay={0.34}>
            <FunnelChart stages={funnel} />
          </Card>
        </div>

        <aside className="space-y-4 rounded-xl border border-border bg-background p-4">
          <div className="text-[14px] font-semibold text-foreground">Partner Insights</div>
          <div className="text-sm text-muted-foreground">Quick reference for your performance and next steps.</div>

          <div className="rounded-lg bg-muted/70 p-3">
            <div className="text-xs text-muted-foreground uppercase mb-1">Current tier</div>
            <div className="text-sm font-semibold text-foreground">{partnerData.tier}</div>
          </div>

          <div className="rounded-lg bg-muted/70 p-3">
            <div className="text-xs text-muted-foreground uppercase mb-1">Commission rate</div>
            <div className="text-sm font-semibold text-foreground">{partnerData.commissionRate}%</div>
          </div>

          <div className="rounded-lg bg-muted/70 p-3">
            <div className="text-xs text-muted-foreground uppercase mb-1">Total revenue</div>
            <div className="text-sm font-semibold text-foreground">${partnerData.currentRevenue.toLocaleString()}</div>
          </div>

          <div className="rounded-lg bg-muted/70 p-3">
            <div className="text-xs text-muted-foreground uppercase mb-1">Next tier goal</div>
            <div className="text-sm font-semibold text-foreground">$10,000 (Silver)</div>
          </div>

          <a
            href="/portal/leads/submit"
            className="block text-center rounded-md bg-[#185FA5] py-2 text-xs font-semibold text-white hover:bg-[#154c88]"
          >
            Submit a new lead
          </a>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
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

// Mock data
const COMMISSION_METRICS = [
  { label: "Lifetime earned", value: "$340", sub: "Total commissions" },
  { label: "Pending payment", value: "$170", sub: "Due Apr 30" },
  { label: "Current rate", value: "10%", sub: "Commission rate" },
];

const COMMISSION_OVER_TIME_LABELS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const COMMISSION_OVER_TIME_DATA = [0, 0, 0, 160, 180, 0];

const REVENUE_VS_COMMISSION_LABELS = ["Deal 1", "Deal 2"];
const REVENUE_DATA = [1600, 1800];
const COMMISSION_DATA = [160, 180];

const DEAL_BREAKDOWN = [
  { name: "VerifyNow EU", closeDate: "2024-03-01", market: "EU", netRevenue: 1800, rate: 10, commission: 180, status: "Paid" },
  { name: "FastLend Africa", closeDate: "2024-01-15", market: "Kenya", netRevenue: 1600, rate: 10, commission: 160, status: "Paid" },
];

const PAYMENT_HISTORY = [
  { period: "Feb 2024", deals: 1, amount: 180, method: "Bank Transfer", status: "Paid" },
  { period: "Jan 2024", deals: 1, amount: 160, method: "Bank Transfer", status: "Paid" },
];

function useChartColors() {
  return {
    gridColor: "rgba(0,0,0,0.06)",
    labelColor: "#73726c",
  };
}

function CommissionOverTimeChart() {
  const { gridColor, labelColor } = useChartColors();

  const data = useMemo(
    () => ({
      labels: COMMISSION_OVER_TIME_LABELS,
      datasets: [
        {
          label: "Commission ($)",
          data: COMMISSION_OVER_TIME_DATA,
          borderColor: "#185FA5",
          backgroundColor: "rgba(24, 95, 165, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    }),
    []
  );

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

  return <Line data={data} options={options} />;
}

function RevenueVsCommissionChart() {
  const { gridColor, labelColor } = useChartColors();

  const data = useMemo(
    () => ({
      labels: REVENUE_VS_COMMISSION_LABELS,
      datasets: [
        {
          label: "Net Revenue ($)",
          data: REVENUE_DATA,
          backgroundColor: "#185FA5",
          borderRadius: 4,
          barThickness: 20,
        },
        {
          label: "Commission ($)",
          data: COMMISSION_DATA,
          backgroundColor: "#3B6D11",
          borderRadius: 4,
          barThickness: 20,
        },
      ],
    }),
    []
  );

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: { color: labelColor, font: { size: 11 } },
        },
        tooltip: {
          callbacks: {
            label: (c) => `${c.dataset.label}: $${c.parsed.y}`,
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

  return <Bar data={data} options={options} />;
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
        {COMMISSION_METRICS.map((metric, i) => (
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
      <div className="grid grid-cols-2 gap-4">
        <Card title="Commission over time">
          <div className="relative h-[200px]">
            <CommissionOverTimeChart />
          </div>
        </Card>

        <Card title="Revenue vs Commission per deal">
          <div className="relative h-[200px]">
            <RevenueVsCommissionChart />
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
                  Deal Name
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Close Date
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Market
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Net Revenue
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Rate
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Commission
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {DEAL_BREAKDOWN.map((deal, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="px-4 py-3 text-[13px] text-foreground">{deal.name}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">{deal.closeDate}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">{deal.market}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">${deal.netRevenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">{deal.rate}%</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">${deal.commission}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">
                    <span className={`px-2 py-1 rounded text-[11px] font-medium ${
                      deal.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment history */}
      <Card title="Payment history">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Period
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Deals Included
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Method
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_HISTORY.map((payment, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="px-4 py-3 text-[13px] text-foreground">{payment.period}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">{payment.deals}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">${payment.amount}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">{payment.method}</td>
                  <td className="px-4 py-3 text-[13px] text-foreground">
                    <span className="px-2 py-1 rounded text-[11px] font-medium bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
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
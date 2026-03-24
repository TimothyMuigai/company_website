import { query } from "./_generated/server";
import { v } from "convex/values";

// Get partner data for dashboard
export const getPartner = query({
  args: {},
  handler: async (ctx) => {
    // For now, return mock data. Replace with auth-based query later.
    return {
      name: "Partner account",
      tier: "Registered" as const,
      commissionRate: 10,
      currentRevenue: 3400,
      tierTarget: 10000,
      nextTier: "Silver" as const,
    };
  },
});

// Get metric cards data
export const getMetrics = query({
  args: {},
  handler: async (ctx) => {
    // Mock data - replace with real calculations
    return [
      {
        label: "Total leads",
        value: "8",
        sub: "+2 this month",
        icon: "Users",
        colorClass: "text-[#185FA5]",
      },
      {
        label: "Deals closed",
        value: "2",
        sub: "$3,400 net revenue",
        icon: "Briefcase",
        colorClass: "text-[#3B6D11]",
      },
      {
        label: "Commission earned",
        value: "$340",
        sub: "Lifetime total",
        icon: "DollarSign",
        colorClass: "text-[#3B6D11]",
      },
      {
        label: "Conversion rate",
        value: "25%",
        sub: "2 of 8 leads closed",
        icon: "TrendingUp",
        colorClass: "text-[#BA7517]",
      },
    ];
  },
});

// Get revenue data for chart
export const getRevenueData = query({
  args: {},
  handler: async (ctx) => {
    // Mock data - last 6 months
    return {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      data: [0, 0, 0, 1600, 1800, 0],
    };
  },
});

// Get lead pipeline funnel
export const getFunnel = query({
  args: {},
  handler: async (ctx) => {
    // Mock data
    return [
      { label: "Submitted", count: 8, color: "#185FA5", pct: 100 },
      { label: "Contacted", count: 6, color: "#378ADD", pct: 75 },
      { label: "Negotiating", count: 4, color: "#BA7517", pct: 50 },
      { label: "Closed", count: 2, color: "#3B6D11", pct: 25 },
      { label: "Lost", count: 1, color: "#A32D2D", pct: 12.5 },
    ];
  },
});

// Get markets data
export const getMarkets = query({
  args: {},
  handler: async (ctx) => {
    // Mock data
    return [
      { label: "Kenya", count: 6, pct: 75 },
      { label: "USA", count: 2, pct: 25 },
      { label: "EU", count: 1, pct: 12 },
    ];
  },
});

// Get industry data
export const getIndustries = query({
  args: {},
  handler: async (ctx) => {
    // Mock data
    return {
      labels: ["Fintech", "Insurance", "HR Tech", "Media"],
      data: [4, 2, 1, 1],
      colors: ["#185FA5", "#378ADD", "#3B6D11", "#BA7517"],
    };
  },
});

// Get recent activity
export const getActivity = query({
  args: {},
  handler: async (ctx) => {
    // Mock data
    return [
      {
        dot: "green" as const,
        text: "Deal closed — VerifyNow EU",
        time: "2 days ago · $1,800 net revenue",
      },
      {
        dot: "blue" as const,
        text: "Demo completed — Equity Fintech",
        time: "3 days ago · Pricing discussion started",
      },
      {
        dot: "amber" as const,
        text: "Lead registered — NationMedia Group",
        time: "5 days ago · Confirmed by Office of Sales",
      },
      {
        dot: "blue" as const,
        text: "Commission statement issued",
        time: "7 days ago · $340 due Apr 30",
      },
      {
        dot: "green" as const,
        text: "Deal closed — FastLend Africa",
        time: "18 days ago · $1,600 net revenue",
      },
      {
        dot: "amber" as const,
        text: "Tier progress update",
        time: "20 days ago · 34% toward Silver",
      },
    ];
  },
});
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

async function getPartner(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");

  const partner = await ctx.db
    .query("partners")
    .withIndex("by_userId", (q: any) => q.eq("userId", userId))
    .first();

  if (!partner) throw new Error("Partner not found");
  return partner;
}

export const getPartnerData = query({
  args: {},
  handler: async (ctx) => {
    const partner = await getPartner(ctx);

    const leadRecord = await ctx.db
      .query("leads")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partner._id))
      .collect();

    const deals = await ctx.db
      .query("deals")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partner._id))
      .collect();

    const totalRevenue = deals.reduce((sum: number, d: any) => sum + d.netRevenue, 0);

    return {
      name: partner.name,
      tier: partner.tier,
      commissionRate: partner.commissionRate,
      currentRevenue: totalRevenue,
      tierTarget:
        partner.tier === "Platinum"
          ? totalRevenue
          : partner.tier === "Gold"
          ? 50000
          : partner.tier === "Silver"
          ? 25000
          : 10000,
      nextTier:
        partner.tier === "Registered"
          ? "Silver"
          : partner.tier === "Silver"
          ? "Gold"
          : partner.tier === "Gold"
          ? "Platinum"
          : "Platinum",
      totalLeads: leadRecord.length,
      dealsClosed: deals.filter((d: any) => d).length,
      commissionEarned: 0,
      conversionRate:
        leadRecord.length === 0
          ? 0
          : Math.round((deals.length / leadRecord.length) * 100),
    };
  },
});

// Get metric cards data
export const getMetrics = query({
  args: {},
  handler: async (ctx) => {
    const partner = await getPartner(ctx);

    const leads = await ctx.db
      .query("leads")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partner._id))
      .collect();

    const deals = await ctx.db
      .query("deals")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partner._id))
      .collect();

    const commissions = await ctx.db
      .query("commissions")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partner._id))
      .collect();

    const totalRevenue = deals.reduce((sum: number, d: any) => sum + d.netRevenue, 0);
    const totalCommission = commissions.reduce((sum: number, c: any) => sum + c.amount, 0);
    const closedDeals = deals.length;
    const conversion = leads.length === 0 ? 0 : Math.round((closedDeals / leads.length) * 100);

    return [
      {
        label: "Total leads",
        value: `${leads.length}`,
        sub: leads.length > 0 ? `${Math.max(0, leads.length - 1)} new this month` : "No leads yet",
        icon: "Users",
        colorClass: "text-[#185FA5]",
      },
      {
        label: "Deals closed",
        value: `${closedDeals}`,
        sub: `$${totalRevenue.toLocaleString()} net revenue`,
        icon: "Briefcase",
        colorClass: "text-[#3B6D11]",
      },
      {
        label: "Commission earned",
        value: `$${totalCommission.toLocaleString()}`,
        sub: "Lifetime total",
        icon: "DollarSign",
        colorClass: "text-[#3B6D11]",
      },
      {
        label: "Conversion rate",
        value: `${conversion}%`,
        sub: `${closedDeals} of ${leads.length} leads closed`,
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
    const partner = await getPartner(ctx);
    const deals = await ctx.db
      .query("deals")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partner._id))
      .collect();

    const monthBuckets: Record<string, number> = {};
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = dt.toLocaleString("default", { month: "short" });
      monthBuckets[key] = 0;
    }

    deals.forEach((deal: any) => {
      const dealDate = new Date(deal.closeDate);
      const key = dealDate.toLocaleString("default", { month: "short" });
      if (key in monthBuckets) {
        monthBuckets[key] += deal.netRevenue;
      }
    });

    return {
      labels: Object.keys(monthBuckets),
      data: Object.values(monthBuckets),
    };
  },
});

// Get lead pipeline funnel
export const getFunnel = query({
  args: {},
  handler: async (ctx) => {
    const partner = await getPartner(ctx);
    const leads = await ctx.db
      .query("leads")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partner._id))
      .collect();

    const buckets: Record<string, number> = {
      Submitted: 0,
      Contacted: 0,
      "In negotiation": 0,
      Closed: 0,
      Lost: 0,
    };

    leads.forEach((lead: any) => {
      if (buckets[lead.status] !== undefined) {
        buckets[lead.status] += 1;
      }
    });

    const total = leads.length || 1;
    return [
      { label: "Submitted", count: buckets.Submitted, color: "#185FA5", pct: Math.round((buckets.Submitted / total) * 100) },
      { label: "Contacted", count: buckets.Contacted, color: "#378ADD", pct: Math.round((buckets.Contacted / total) * 100) },
      { label: "Negotiating", count: buckets["In negotiation"], color: "#BA7517", pct: Math.round((buckets["In negotiation"] / total) * 100) },
      { label: "Closed", count: buckets.Closed, color: "#3B6D11", pct: Math.round((buckets.Closed / total) * 100) },
      { label: "Lost", count: buckets.Lost, color: "#A32D2D", pct: Math.round((buckets.Lost / total) * 100) },
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
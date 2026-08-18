import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

function assertAuthenticated(userId: string | null) {
  if (!userId) {
    throw new Error("Not authenticated");
  }
}

// Ensure the partner record exists for this user
async function getPartnerId(ctx: any) {
  const userId = await getAuthUserId(ctx);
  assertAuthenticated(userId);
  const partner = await ctx.db
    .query("partners")
    .withIndex("by_userId", (q: any) => q.eq("userId", userId))
    .first();

  if (!partner) {
    throw new Error("Partner not found");
  }
  return { partnerId: partner._id, partner };
}

export const createLead = mutation({
  args: {
    orgName: v.string(),
    contactName: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    industry: v.string(),
    geography: v.string(),
    dealSize: v.string(),
    expectedClose: v.string(),
    notes: v.string(),
    partnerName: v.string(),
    partnerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const { partnerId } = await getPartnerId(ctx);
    const now = Date.now();

    const leadId = await ctx.db.insert("leads", {
      partnerId,
      partnerName: args.partnerName,
      partnerEmail: args.partnerEmail,
      orgName: args.orgName,
      contactName: args.contactName,
      contactEmail: args.contactEmail,
      contactPhone: args.contactPhone,
      industry: args.industry,
      geography: args.geography,
      dealSize: args.dealSize,
      expectedClose: args.expectedClose,
      notes: args.notes,
      status: "Submitted",
      deeptrackNotes: "",
      submittedAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("notifications", {
      partnerId,
      message: `Lead submitted: ${args.orgName}`,
      createdAt: now,
      read: false,
    });

    return { leadId };
  },
});

export const getMyLeads = query({
  args: {},
  handler: async (ctx) => {
    const { partnerId } = await getPartnerId(ctx);
    return await ctx.db
      .query("leads")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partnerId))
      .collect();
  },
});

// Admin-only — returns null for non-admins instead of throwing,
// so the client can show a modal rather than crashing.
export const getAllLeads = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const partner = await ctx.db
      .query("partners")
      .withIndex("by_userId", (q: any) => q.eq("userId", userId))
      .first();

    if (!partner) return null;

    const isAdmin =
      (partner.email || "").toLowerCase().endsWith("@deeptrack.io") ||
      (partner.email || "").toLowerCase() === "bryan@deeptrack.io" ||
      (partner.email || "").toLowerCase() === "ianngari01@gmail.com";

    if (!isAdmin) return null;

    return await ctx.db.query("leads").collect();
  },
});

export const getLeadById = query({
  args: { leadId: v.id("leads") },
  handler: async (ctx, { leadId }) => {
    const { partnerId } = await getPartnerId(ctx);
    const lead = await ctx.db.get(leadId);
    if (!lead || lead.partnerId !== partnerId) {
      throw new Error("Lead not found");
    }
    return lead;
  },
});

export const updateLeadStatus = mutation({
  args: {
    leadId: v.id("leads"),
    status: v.union(
      v.literal("Submitted"),
      v.literal("Contacted"),
      v.literal("In negotiation"),
      v.literal("Closed"),
      v.literal("Lost")
    ),
    deeptrackNotes: v.string(),
  },
  handler: async (ctx, { leadId, status, deeptrackNotes }) => {
    const userId = await getAuthUserId(ctx);
    assertAuthenticated(userId);

    const lead = await ctx.db.get(leadId);
    if (!lead) {
      throw new Error("Lead not found");
    }

    await ctx.db.patch(leadId, {
      status,
      deeptrackNotes,
      updatedAt: Date.now(),
    });

    return { leadId };
  },
});

export const createDeal = mutation({
  args: {
    leadId: v.id("leads"),
    netRevenue: v.number(),
    closeDate: v.number(),
    market: v.string(),
  },
  handler: async (ctx, { leadId, netRevenue, closeDate, market }) => {
    const userId = await getAuthUserId(ctx);
    assertAuthenticated(userId);

    const lead = await ctx.db.get(leadId);
    if (!lead) {
      throw new Error("Lead not found");
    }

    const partner = await ctx.db.get(lead.partnerId);
    if (!partner) {
      throw new Error("Partner not found");
    }

    const dealId = await ctx.db.insert("deals", {
      leadId,
      partnerId: lead.partnerId,
      netRevenue,
      closeDate,
      market,
    });

    const commissionAmount = netRevenue * partner.commissionRate;
    const period = new Date(closeDate).toISOString().slice(0, 7);

    await ctx.db.insert("commissions", {
      partnerId: lead.partnerId,
      dealId,
      amount: commissionAmount,
      rate: partner.commissionRate,
      period,
      status: "pending",
      paidAt: undefined,
      paymentMethod: undefined,
    });

    await ctx.db.patch(leadId, { status: "Closed", updatedAt: Date.now() });

    await ctx.db.insert("notifications", {
      partnerId: lead.partnerId,
      message: `Deal closed and commission recorded: ${Math.round(commissionAmount)}`,
      createdAt: Date.now(),
      read: false,
    });

    return { dealId };
  },
});

export const getCommissions = query({
  args: {},
  handler: async (ctx) => {
    const { partnerId } = await getPartnerId(ctx);
    return await ctx.db
      .query("commissions")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partnerId))
      .collect();
  },
});

export const getMaterials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("materials").collect();
  },
});

export const getNotifications = query({
  args: {},
  handler: async (ctx) => {
    const { partnerId } = await getPartnerId(ctx);
    return await ctx.db
      .query("notifications")
      .withIndex("by_partnerId", (q: any) => q.eq("partnerId", partnerId))
      .collect();
  },
});

export const markNotificationRead = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, { notificationId }) => {
    const { partnerId } = await getPartnerId(ctx);
    const notification = await ctx.db.get(notificationId);
    if (!notification || notification.partnerId !== partnerId) {
      throw new Error("Notification not found");
    }

    await ctx.db.patch(notificationId, { read: true });
    return { notificationId };
  },
});
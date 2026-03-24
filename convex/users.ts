import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { createAccount, getAuthUserId } from "@convex-dev/auth/server";

/**
 * Get the current authenticated partner
 * Returns partner data for the logged-in user
 */
export const getCurrentPartner = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const partner = await ctx.db
      .query("partners")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    return partner;
  },
});

/**
 * Sign up a new partner (ADMIN ONLY - called from server/API)
 * Creates both a user account and partner record
 */
export const createPartnerAccount = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    companyName: v.string(),
    tier: v.union(
      v.literal("registered"),
      v.literal("silver"),
      v.literal("gold"),
      v.literal("platinum")
    ),
  },
  handler: async (ctx, args) => {
    // Check if partner with this email already exists
    const existingPartner = await ctx.db
      .query("partners")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingPartner) {
      throw new Error("Partner with this email already exists");
    }

    // Determine commission rate based on tier
    const tierRates: Record<string, number> = {
      registered: 0.10, // 10%
      silver: 0.12,     // 12%
      gold: 0.13,       // 13%
      platinum: 0.15,   // 15%
    };

    const commissionRate = tierRates[args.tier] ?? 0.10;

    // createAccount returns { account, user } — extract the user ID from result
    const { user } = await createAccount(ctx as any, {
      provider: "password",
      account: {
        id: args.email,
        secret: args.password,
      },
      profile: {
        email: args.email,
      },
    });

    const userId = user._id;

    // Capitalise tier for storage
    const partnerTier =
      args.tier === "platinum"
        ? "Platinum"
        : args.tier === "gold"
        ? "Gold"
        : args.tier === "silver"
        ? "Silver"
        : "Registered";

    // Create partner record linked to the user
    const partnerId = await ctx.db.insert("partners", {
      userId,
      email: args.email,
      name: args.companyName,
      tier: partnerTier,
      commissionRate,
      programStart: Date.now(),
      renewalDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
    });

    return { partnerId, userId, email: args.email };
  },
});

/**
 * Get partner by ID (scoped to current user)
 */
export const getPartner = query({
  args: { partnerId: v.id("partners") },
  handler: async (ctx, args) => {
    // Bug fix: was using auth.getUserId — use getAuthUserId instead
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const partner = await ctx.db.get(args.partnerId);

    // Ensure partner belongs to current user
    if (!partner || partner.userId !== userId) {
      return null;
    }

    return partner;
  },
});

/**
 * Update partner payment details
 */
export const updatePaymentDetails = mutation({
  args: {
    method: v.string(),
    account: v.string(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    // Bug fix: was using auth.getUserId — use getAuthUserId instead
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const partner = await ctx.db
      .query("partners")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!partner) {
      throw new Error("Partner not found");
    }

    await ctx.db.patch(partner._id, {
      paymentDetails: {
        method: args.method,
        account: args.account,
        currency: args.currency,
      },
    });

    return { success: true };
  },
});
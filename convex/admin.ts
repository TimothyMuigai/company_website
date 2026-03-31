import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// ─── Auth helper ──────────────────────────────────────────────────────────────

async function requireAdmin(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");

  const partner = await ctx.db
    .query("partners")
    .withIndex("by_userId", (q: any) => q.eq("userId", userId))
    .first();

  if (!partner) throw new Error("Partner not found");

  const isAdmin =
    (partner.email || "").toLowerCase().endsWith("@deeptrack.io") ||
    (partner.email || "").toLowerCase() === "bryan@deeptrack.io" ||
    (partner.email || "").toLowerCase() === "ianngari01@gmail.com";

  if (!isAdmin) throw new Error("Admin access required");

  return partner;
}

// ─── Commissions ──────────────────────────────────────────────────────────────

// Admin: get all commissions across all partners
export const getAllCommissions = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("commissions").collect();
  },
});

// Admin: mark a commission as paid
export const markCommissionPaid = mutation({
  args: {
    commissionId: v.id("commissions"),
    paymentMethod: v.string(),
  },
  handler: async (ctx, { commissionId, paymentMethod }) => {
    await requireAdmin(ctx);

    const commission = await ctx.db.get(commissionId);
    if (!commission) throw new Error("Commission not found");

    await ctx.db.patch(commissionId, {
      status: "paid",
      paidAt: Date.now(),
      paymentMethod,
    });

    // Notify the partner
    await ctx.db.insert("notifications", {
      partnerId: commission.partnerId,
      message: `Commission of $${commission.amount} marked as paid via ${paymentMethod}.`,
      createdAt: Date.now(),
      read: false,
    });

    return { commissionId };
  },
});

// ─── Materials ────────────────────────────────────────────────────────────────

// Admin: get all materials (including non-visible)
export const getAllMaterials = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("materials").collect();
  },
});

// Admin: add a new material
export const addMaterial = mutation({
  args: {
    name: v.string(),
    fileType: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, { name, fileType, fileUrl }) => {
    await requireAdmin(ctx);

    const materialId = await ctx.db.insert("materials", {
      name,
      fileType,
      fileUrl,
      updatedAt: Date.now(),
      visible: true,
    });

    return { materialId };
  },
});

// Admin: remove a material
export const removeMaterial = mutation({
  args: { materialId: v.id("materials") },
  handler: async (ctx, { materialId }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(materialId);
    return { materialId };
  },
});

// Admin: toggle material visibility
export const toggleMaterialVisibility = mutation({
  args: { materialId: v.id("materials") },
  handler: async (ctx, { materialId }) => {
    await requireAdmin(ctx);
    const material = await ctx.db.get(materialId);
    if (!material) throw new Error("Material not found");
    await ctx.db.patch(materialId, { visible: !material.visible });
    return { materialId };
  },
});

// ─── Notifications ────────────────────────────────────────────────────────────

// Admin: send a notification to one or all partners
export const sendNotification = mutation({
  args: {
    partnerId: v.optional(v.id("partners")),
    message: v.string(),
  },
  handler: async (ctx, { partnerId, message }) => {
    await requireAdmin(ctx);

    if (partnerId) {
      // Single partner
      await ctx.db.insert("notifications", {
        partnerId,
        message,
        createdAt: Date.now(),
        read: false,
      });
    } else {
      // Broadcast — insert one notification per partner
      const allPartners = await ctx.db.query("partners").collect();
      await Promise.all(
        allPartners.map((p: any) =>
          ctx.db.insert("notifications", {
            partnerId: p._id,
            message,
            createdAt: Date.now(),
            read: false,
          })
        )
      );
    }

    return { sent: true };
  },
});
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  partners: defineTable({
    userId: v.id("users"), // Links to Convex Auth user
    name: v.string(),
    email: v.string(),
    tier: v.union(
      v.literal("Registered"),
      v.literal("Silver"),
      v.literal("Gold"),
      v.literal("Platinum")
    ),
    commissionRate: v.number(),
    programStart: v.number(), // timestamp
    renewalDate: v.number(), // timestamp
    paymentDetails: v.optional(
      v.object({
        method: v.string(),
        account: v.string(),
        currency: v.string(),
      })
    ),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  leads: defineTable({
    partnerId: v.id("partners"),
    orgName: v.string(),
    contactName: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    industry: v.string(),
    geography: v.string(),
    dealSize: v.string(),
    expectedClose: v.string(), // month picker, maybe string
    notes: v.string(),
    status: v.union(
      v.literal("Submitted"),
      v.literal("Contacted"),
      v.literal("In negotiation"),
      v.literal("Closed"),
      v.literal("Lost")
    ),
    deeptrackNotes: v.string(),
    submittedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_partnerId", ["partnerId"])
    .index("by_status", ["status"])
    .index("by_geography", ["geography"]),

  deals: defineTable({
    leadId: v.id("leads"),
    partnerId: v.id("partners"),
    netRevenue: v.number(),
    closeDate: v.number(),
    market: v.string(),
  })
    .index("by_partnerId", ["partnerId"])
    .index("by_closeDate", ["closeDate"]),

  commissions: defineTable({
    partnerId: v.id("partners"),
    dealId: v.id("deals"),
    amount: v.number(),
    rate: v.number(),
    period: v.string(), // e.g., "2024-06"
    status: v.union(v.literal("pending"), v.literal("paid")),
    paidAt: v.optional(v.number()),
    paymentMethod: v.optional(v.string()),
  })
    .index("by_partnerId", ["partnerId"])
    .index("by_status", ["status"])
    .index("by_period", ["period"]),

  materials: defineTable({
    name: v.string(),
    fileType: v.string(),
    fileUrl: v.string(),
    updatedAt: v.number(),
    visible: v.boolean(),
  }),

  notifications: defineTable({
    partnerId: v.optional(v.id("partners")), // null for broadcast
    message: v.string(),
    createdAt: v.number(),
    read: v.boolean(),
  })
    .index("by_partnerId", ["partnerId"])
    .index("by_createdAt", ["createdAt"]),
});
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AccountPage() {
  const [paymentDetails, setPaymentDetails] = useState({
    method: "",
    account: "",
    currency: "USD",
  });

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to Convex
    console.log("Saving payment details:", paymentDetails);
    alert("Payment details saved successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPaymentDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Mock partner data
  const partnerData = {
    partnerId: "PTN-001",
    tier: "Registered",
    commissionRate: 10,
    programStart: "2024-01-01",
    renewalDate: "2025-01-01",
    deeptrackContact: "Bryan Koyundi (bryan@deeptrack.io)",
  };

  return (
    <div className="px-6 py-6 max-w-[800px] mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-[18px] font-medium text-foreground">My Account</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Manage your partner profile and payment settings
        </p>
      </motion.div>

      {/* Partner Details */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="rounded-xl border border-border bg-background p-6"
      >
        <h2 className="text-[16px] font-medium text-foreground mb-4">Partner Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Partner ID
            </label>
            <div className="text-[14px] text-foreground">{partnerData.partnerId}</div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Tier
            </label>
            <div className="text-[14px] text-foreground">{partnerData.tier}</div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Commission Rate
            </label>
            <div className="text-[14px] text-foreground">{partnerData.commissionRate}%</div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Program Start Date
            </label>
            <div className="text-[14px] text-foreground">{partnerData.programStart}</div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Renewal Date
            </label>
            <div className="text-[14px] text-foreground">{partnerData.renewalDate}</div>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Deeptrack Contact
            </label>
            <div className="text-[14px] text-foreground">{partnerData.deeptrackContact}</div>
          </div>
        </div>
      </motion.div>

      {/* Payment Details Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="rounded-xl border border-border bg-background p-6"
      >
        <h2 className="text-[16px] font-medium text-foreground mb-4">Payment Details</h2>
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Payment Method *
            </label>
            <select
              name="method"
              required
              value={paymentDetails.method}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            >
              <option value="">Select Method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Wise">Wise</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Account Number / Mobile Number *
            </label>
            <input
              type="text"
              name="account"
              required
              value={paymentDetails.account}
              onChange={handleChange}
              placeholder="Enter account details"
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Preferred Currency *
            </label>
            <select
              name="currency"
              required
              value={paymentDetails.currency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            >
              <option value="USD">USD</option>
              <option value="KES">KES</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-[#185FA5] text-white rounded-md text-sm font-medium hover:bg-[#185FA5]/90 focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20"
          >
            Save Payment Details
          </button>
        </form>
      </motion.div>

      {/* Support Contact */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        className="rounded-xl border border-border bg-background p-6"
      >
        <h2 className="text-[16px] font-medium text-foreground mb-4">Support</h2>
        <div className="space-y-2">
          <div>
            <span className="text-[13px] font-medium text-foreground">Email: </span>
            <a href="mailto:partnerships@deeptrack.io" className="text-[13px] text-[#185FA5] hover:underline">
              partnerships@deeptrack.io
            </a>
          </div>
          <div>
            <span className="text-[13px] font-medium text-foreground">Founder: </span>
            <a href="mailto:bryan@deeptrack.io" className="text-[13px] text-[#185FA5] hover:underline">
              bryan@deeptrack.io
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
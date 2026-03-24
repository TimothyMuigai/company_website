"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SubmitLeadPage() {
  const [formData, setFormData] = useState({
    orgName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    industry: "",
    geography: "",
    dealSize: "",
    expectedClose: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/leads-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to submit lead.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="px-6 py-6 max-w-[600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-emerald-50 border border-emerald-200 rounded-lg p-6"
        >
          <h1 className="text-[18px] font-medium text-emerald-900 mb-4">Lead Submitted Successfully!</h1>
          <p className="text-[13px] text-emerald-800 mb-6">
            Your lead has been submitted with reference number: <strong>LD-2024-001</strong>
          </p>
          <p className="text-[13px] text-emerald-700 mb-6">
            Deeptrack will confirm registration within 5 business days. You'll receive an email notification once processed.
          </p>
          <button
            onClick={() => window.location.href = "/portal/leads"}
            className="mt-6 px-4 py-2 bg-[#185FA5] text-white rounded-md text-sm font-medium hover:bg-[#185FA5]/90"
          >
            View My Leads
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 max-w-[600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-[18px] font-medium text-foreground">Submit a Lead</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Submit a new lead for the Deeptrack channel program
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-900">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Organisation Name *
            </label>
            <input
              type="text"
              name="orgName"
              required
              value={formData.orgName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Contact Name *
            </label>
            <input
              type="text"
              name="contactName"
              required
              value={formData.contactName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              required
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Industry *
            </label>
            <select
              name="industry"
              required
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            >
              <option value="">Select Industry</option>
              <option value="Fintech">Fintech</option>
              <option value="Insurance">Insurance</option>
              <option value="HR Tech">HR Tech</option>
              <option value="Media">Media</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Geography *
            </label>
            <select
              name="geography"
              required
              value={formData.geography}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            >
              <option value="">Select Geography</option>
              <option value="Kenya">Kenya</option>
              <option value="USA">USA</option>
              <option value="EU">EU</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Estimated Deal Size *
            </label>
            <select
              name="dealSize"
              required
              value={formData.dealSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            >
              <option value="">Select Size</option>
              <option value="$10k-$50k">$10k-$50k</option>
              <option value="$50k-$100k">$50k-$100k</option>
              <option value="$100k-$500k">$100k-$500k</option>
              <option value="$500k+">$500k+</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Expected Close Date
            </label>
            <input
              type="month"
              name="expectedClose"
              value={formData.expectedClose}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-foreground mb-2">
            Opportunity Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            placeholder="Any additional details about the opportunity..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[#185FA5] text-white rounded-md text-sm font-medium hover:bg-[#185FA5]/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? "Submitting..." : "Submit Lead"}
        </button>
      </form>
    </div>
  );
}
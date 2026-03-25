"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/lib/auth-context";

export default function SubmitLeadPage() {
  const { partner } = useAuth();
  const [formData, setFormData] = useState({
    partnerName: "",
    partnerEmail: "",
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
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLead = useMutation(api.leads.createLead);

  useEffect(() => {
    if (partner) {
      setFormData((prev) => ({
        ...prev,
        partnerName: partner.name || "",
        partnerEmail: partner.email || "",
      }));
    }
  }, [partner]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requiredFields = [
      "partnerName",
      "partnerEmail",
      "orgName",
      "contactName",
      "contactEmail",
      "industry",
      "geography",
      "dealSize",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        setError(`Missing required field: ${field}`);
        setLoading(false);
        return;
      }
    }

    try {
      const leadResponse = await createLead({
        partnerName: formData.partnerName,
        partnerEmail: formData.partnerEmail,
        orgName: formData.orgName,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone || "",
        industry: formData.industry,
        geography: formData.geography,
        dealSize: formData.dealSize,
        expectedClose: formData.expectedClose || "",
        notes: formData.notes || "",
      });

      // Send notification emails and Mongo fallback
      const res = await fetch("/api/leads-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          leadId: leadResponse?.leadId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.warn("Email route returned error:", data);
      }

      setSubmitted(leadResponse?.leadId?.toString() ?? `LD-${Date.now()}`);
    } catch (err) {
      console.error("Lead submission error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="px-6 py-6 max-w-[600px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-emerald-50 border border-emerald-200 rounded-lg p-6"
        >
          <h1 className="text-[18px] font-medium text-emerald-900 mb-4">Lead Submitted Successfully!</h1>
          <p className="text-[13px] text-emerald-800 mb-6">
            Your lead has been submitted with reference number: <strong>{submitted}</strong>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Partner Name *
            </label>
            <input
              type="text"
              name="partnerName"
              required
              value={formData.partnerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-foreground mb-2">
              Partner Email *
            </label>
            <input
              type="email"
              name="partnerEmail"
              required
              value={formData.partnerEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
            />
          </div>
        </div>

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
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
              className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
            className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#185FA5]/20 focus:border-[#185FA5]"
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
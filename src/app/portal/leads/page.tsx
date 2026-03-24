"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Lead = {
  id: string;
  orgName: string;
  industry: string;
  market: string;
  dateSubmitted: string;
  status: string;
  notes: string;
  lastUpdated: string;
};

// Mock data
const LEADS: Lead[] = [
  {
    id: "1",
    orgName: "VerifyNow EU",
    industry: "Fintech",
    market: "EU",
    dateSubmitted: "2024-02-15",
    status: "Closed",
    notes: "Closed deal - $1,800 net revenue",
    lastUpdated: "2024-03-01",
  },
  {
    id: "2",
    orgName: "Equity Fintech",
    industry: "Fintech",
    market: "Kenya",
    dateSubmitted: "2024-02-20",
    status: "Contacted",
    notes: "Demo completed, pricing discussion started",
    lastUpdated: "2024-02-25",
  },
  {
    id: "3",
    orgName: "NationMedia Group",
    industry: "Media",
    market: "Kenya",
    dateSubmitted: "2024-02-22",
    status: "Submitted",
    notes: "Confirmed by Office of Sales",
    lastUpdated: "2024-02-22",
  },
];

export default function MyLeadsPage() {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMarket, setFilterMarket] = useState("");

  const filteredLeads = LEADS.filter((lead) => {
    if (filterStatus && lead.status !== filterStatus) return false;
    if (filterMarket && lead.market !== filterMarket) return false;
    return true;
  });

  return (
    <div className="px-6 py-6 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-[18px] font-medium text-foreground">My Leads</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Track and manage your submitted leads
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm"
        >
          <option value="">All Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="In negotiation">In negotiation</option>
          <option value="Closed">Closed</option>
          <option value="Lost">Lost</option>
        </select>
        <select
          value={filterMarket}
          onChange={(e) => setFilterMarket(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm"
        >
          <option value="">All Markets</option>
          <option value="Kenya">Kenya</option>
          <option value="USA">USA</option>
          <option value="EU">EU</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                Organisation
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                Industry
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                Market
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                Date Submitted
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                Notes from Deeptrack
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t border-border hover:bg-muted/20">
                <td className="px-4 py-3 text-[13px] text-foreground">{lead.orgName}</td>
                <td className="px-4 py-3 text-[13px] text-foreground">{lead.industry}</td>
                <td className="px-4 py-3 text-[13px] text-foreground">{lead.market}</td>
                <td className="px-4 py-3 text-[13px] text-foreground">{lead.dateSubmitted}</td>
                <td className="px-4 py-3 text-[13px] text-foreground">
                  <span className={`px-2 py-1 rounded text-[11px] font-medium ${
                    lead.status === "Closed" ? "bg-green-100 text-green-800" :
                    lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                    lead.status === "Submitted" ? "bg-gray-100 text-gray-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[13px] text-foreground">{lead.notes}</td>
                <td className="px-4 py-3 text-[13px] text-foreground">{lead.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AlertCircle, Loader } from "lucide-react";

type Lead = {
  _id: string;
  orgName: string;
  industry: string;
  geography: string;
  dealSize: string;
  submittedAt: number;
  status: "Submitted" | "Contacted" | "In negotiation" | "Closed" | "Lost";
  notes: string;
  updatedAt: number;
};

export default function MyLeadsPage() {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterGeography, setFilterGeography] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const leads = useQuery(api.leads.getMyLeads);
  const [displayLeads, setDisplayLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (!leads) return;

    let filtered = leads.filter((lead: Lead) => {
      if (filterStatus && lead.status !== filterStatus) return false;
      if (filterGeography && lead.geography !== filterGeography) return false;
      return true;
    });

    if (sortBy === "recent") {
      filtered.sort((a, b) => b.submittedAt - a.submittedAt);
    } else if (sortBy === "updated") {
      filtered.sort((a, b) => b.updatedAt - a.updatedAt);
    } else if (sortBy === "org") {
      filtered.sort((a, b) => a.orgName.localeCompare(b.orgName));
    }

    setDisplayLeads(filtered);
  }, [leads, filterStatus, filterGeography, sortBy]);

  const statuses: Array<
    "Submitted" | "Contacted" | "In negotiation" | "Closed" | "Lost"
  > = ["Submitted", "Contacted", "In negotiation", "Closed", "Lost"];
  const geographies = [
    "North America",
    "Europe",
    "Asia Pacific",
    "Africa",
    "Latin America",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-amber-100 text-amber-800";
      case "In negotiation":
        return "bg-purple-100 text-purple-800";
      case "Closed":
        return "bg-green-100 text-green-800";
      case "Lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto">
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

      {/* Filters and Sort */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-background"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterGeography}
          onChange={(e) => setFilterGeography(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-background"
        >
          <option value="">All Markets</option>
          {geographies.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-background"
        >
          <option value="recent">Most Recent</option>
          <option value="updated">Recently Updated</option>
          <option value="org">Organization Name</option>
        </select>
      </div>

      {/* Table */}
      {leads ? (
        <div className="rounded-xl border border-border bg-background overflow-hidden">
          {displayLeads.length > 0 ? (
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
                    Deal Size
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-border hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 text-[13px] text-foreground font-medium">
                      {lead.orgName}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {lead.industry}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {lead.geography}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {new Date(lead.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-[13px]">
                      <span
                        className={`px-2 py-1 rounded text-[11px] font-medium ${getStatusColor(lead.status)}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-foreground">
                      {lead.dealSize}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-12 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-[13px] text-muted-foreground">
                No leads matching your filters
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
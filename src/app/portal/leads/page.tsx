"use client";

import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AlertCircle, Loader, ChevronDown, ChevronUp } from "lucide-react";

type Lead = {
  _id: string;
  orgName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  industry: string;
  geography: string;
  dealSize: string;
  expectedClose: string;
  notes: string;
  deeptrackNotes: string;
  submittedAt: number;
  updatedAt: number;
  status: "Submitted" | "Contacted" | "In negotiation" | "Closed" | "Lost";
};

const STATUS_COLORS: Record<string, string> = {
  Submitted: "bg-blue-100 text-blue-800",
  Contacted: "bg-amber-100 text-amber-800",
  "In negotiation": "bg-purple-100 text-purple-800",
  Closed: "bg-green-100 text-green-800",
  Lost: "bg-red-100 text-red-800",
};

export default function MyLeadsPage() {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterGeography, setFilterGeography] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [displayLeads, setDisplayLeads] = useState<Lead[]>([]);

  const leads = useQuery(api.leads.getMyLeads);

  useEffect(() => {
    if (!leads) return;
    let filtered = leads.filter((lead: Lead) => {
      if (filterStatus && lead.status !== filterStatus) return false;
      if (filterGeography && lead.geography !== filterGeography) return false;
      return true;
    });
    if (sortBy === "recent") filtered.sort((a, b) => b.submittedAt - a.submittedAt);
    else if (sortBy === "updated") filtered.sort((a, b) => b.updatedAt - a.updatedAt);
    else if (sortBy === "org") filtered.sort((a, b) => a.orgName.localeCompare(b.orgName));
    setDisplayLeads(filtered);
  }, [leads, filterStatus, filterGeography, sortBy]);

  const statuses = ["Submitted", "Contacted", "In negotiation", "Closed", "Lost"];
  const geographies = ["Kenya", "USA", "EU", "Other", "North America", "Europe", "Asia Pacific", "Africa", "Latin America"];

  const toggleRow = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
        <h1 className="text-[18px] font-medium text-foreground">My Leads</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Track and manage your submitted leads</p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap items-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterGeography}
          onChange={(e) => setFilterGeography(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
        >
          <option value="">All Markets</option>
          {geographies.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
        >
          <option value="recent">Most Recent</option>
          <option value="updated">Recently Updated</option>
          <option value="org">Organisation Name</option>
        </select>
        <a
          href="/portal/leads/submit"
          className="ml-auto px-4 py-2 bg-[#185FA5] text-white rounded-md text-sm font-medium hover:bg-[#154c88] transition-colors"
        >
          + Submit Lead
        </a>
      </div>

      {/* Table */}
      {!leads ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-background overflow-hidden">
          {displayLeads.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-[13px] text-muted-foreground">No leads matching your filters</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-muted/40">
                <tr>
                  {["Organisation", "Industry", "Market", "Date Submitted", "Status", "Deal Size", "Notes from Deeptrack", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayLeads.map((lead) => (
                  <Fragment key={lead._id}>
                    <tr
                      className="border-t border-border hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => toggleRow(lead._id)}
                    >
                      <td className="px-4 py-3 text-[13px] text-foreground font-medium">{lead.orgName}</td>
                      <td className="px-4 py-3 text-[13px] text-foreground">{lead.industry}</td>
                      <td className="px-4 py-3 text-[13px] text-foreground">{lead.geography}</td>
                      <td className="px-4 py-3 text-[13px] text-foreground whitespace-nowrap">
                        {new Date(lead.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${STATUS_COLORS[lead.status] || "bg-gray-100 text-gray-800"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-foreground">{lead.dealSize}</td>
                      <td className="px-4 py-3 text-[13px] text-foreground max-w-[180px]">
                        {lead.deeptrackNotes ? (
                          <span className="text-[12px] text-muted-foreground italic truncate block">
                            {lead.deeptrackNotes}
                          </span>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/50">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {expandedId === lead._id
                          ? <ChevronUp className="w-4 h-4" />
                          : <ChevronDown className="w-4 h-4" />}
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    <AnimatePresence>
                      {expandedId === lead._id && (
                        <tr key={`${lead._id}-detail`} className="border-t border-border bg-muted/10">
                          <td colSpan={8} className="px-6 py-5">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-[13px]">
                                <div>
                                  <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Contact Name</span>
                                  <span className="text-foreground">{lead.contactName || "—"}</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Contact Email</span>
                                  <span className="text-foreground">{lead.contactEmail || "—"}</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Contact Phone</span>
                                  <span className="text-foreground">{lead.contactPhone || "—"}</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Expected Close</span>
                                  <span className="text-foreground">{lead.expectedClose || "—"}</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Last Updated</span>
                                  <span className="text-foreground">{new Date(lead.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Your Notes</span>
                                  <span className="text-foreground">{lead.notes || "—"}</span>
                                </div>
                                {lead.deeptrackNotes && (
                                  <div className="col-span-2">
                                    <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Notes from Deeptrack</span>
                                    <span className="text-foreground italic">{lead.deeptrackNotes}</span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
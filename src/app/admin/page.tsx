"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Loader, AlertCircle, CheckCircle2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export default function AdminPage() {
  const leads = useQuery(api.leads.getAllLeads);
  const partners = useQuery(api.users.getAllPartners);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");

  const updateLeadMutation = useMutation(api.leads.updateLeadStatus);

  useEffect(() => {
    if (leads !== undefined) {
      setIsLoading(false);
    }
  }, [leads]);

  const handleStatusChange = async () => {
    if (!selectedLead || !newStatus) return;

    setIsLoading(true);
    try {
      await updateLeadMutation({
        leadId: selectedLead as Id<"leads">,
        status: newStatus as any,
        deeptrackNotes: notes,
      });
      setSelectedLead(null);
      setNewStatus("");
      setNotes("");
    } catch (error) {
      console.error("Failed to update lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !leads) {
    return (
      <div className="px-6 py-6 max-w-[1200px] mx-auto flex items-center justify-center min-h-[400px]">
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-[24px] font-semibold text-foreground">Lead Management</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Review, update, and manage partner leads
        </p>
      </motion.div>

      {!leads || leads.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/40 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No leads available</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {leads.map((lead: any, i: number) => (
              <motion.div
                key={lead._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[15px] font-semibold text-foreground">
                      {lead.orgName}
                    </h3>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-[12px] text-muted-foreground">
                      <div>
                        <span className="font-medium">Partner:</span> {lead.partnerName || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Partner Email:</span> {lead.partnerEmail || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Contact:</span> {lead.contactName}
                      </div>
                      <div>
                        <span className="font-medium">Industry:</span> {lead.industry}
                      </div>
                      <div>
                        <span className="font-medium">Geography:</span> {lead.geography}
                      </div>
                      <div>
                        <span className="font-medium">Deal Size:</span> {lead.dealSize}
                      </div>
                    </div>
                    {partners && partners.length > 0 && (
                      <div className="mt-2 text-[12px] text-muted-foreground">
                        <strong>Partner payment info:</strong>{" "}
                        {(() => {
                          const partnerEntry = partners.find((p: any) => p._id?.toString() === lead.partnerId?.toString());
                          return partnerEntry?.paymentDetails ? `${partnerEntry.paymentDetails.method} • ${partnerEntry.paymentDetails.account} (${partnerEntry.paymentDetails.currency})` : "Not set";
                        })()}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`px-3 py-1 rounded text-[11px] font-medium ${
                        lead.status === "Closed"
                          ? "bg-green-100 text-green-800"
                          : lead.status === "Contacted"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>

                {selectedLead === lead._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 border-t border-border space-y-3"
                  >
                    <div>
                      <label className="block text-[12px] font-medium text-foreground mb-1">
                        New Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm"
                      >
                        <option value="">Select a status</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In negotiation">In negotiation</option>
                        <option value="Closed">Closed</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-foreground mb-1">
                        Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm"
                        rows={3}
                        placeholder="Add any notes about this lead..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleStatusChange}
                        disabled={isLoading || !newStatus}
                        className="flex-1 rounded-md bg-[#185FA5] hover:bg-[#154c88] disabled:bg-muted py-2 text-sm font-medium text-white transition-colors"
                      >
                        {isLoading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLead(null);
                          setNewStatus("");
                          setNotes("");
                        }}
                        className="flex-1 rounded-md border border-border hover:bg-muted py-2 text-sm font-medium text-foreground transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {selectedLead !== lead._id && (
                  <button
                    onClick={() => setSelectedLead(lead._id)}
                    className="mt-3 px-4 py-2 rounded-md text-sm font-medium text-[#185FA5] border border-[#185FA5] hover:bg-[#185FA5]/10 transition-colors"
                  >
                    Update Status
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

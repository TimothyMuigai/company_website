"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Loader, AlertCircle, ChevronDown, ChevronUp, Plus, Send, Upload, CheckCircle2, ArrowLeft } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import ErrorModal from "@/components/ErrorModal";
import FinalCTASection from "@/components/Footer";

type Tab = "leads" | "commissions" | "materials" | "notifications";
type StatusForm = { leadId: string; status: string; notes: string };
type DealForm = { leadId: string; revenue: string; market: string };
type PayForm = { id: string; method: string };

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <div className="text-[14px] font-semibold text-foreground mb-4">{title}</div>
      {children}
    </div>
  );
}

function LeadsTab({ leads, partners }: { leads: any[]; partners: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusForm, setStatusForm] = useState<StatusForm | null>(null);
  const [dealForm, setDealForm] = useState<DealForm | null>(null);
  const [saving, setSaving] = useState(false);

  const updateStatus = useMutation(api.leads.updateLeadStatus);
  const createDeal = useMutation(api.leads.createDeal);

  const getPartnerInfo = (partnerId: string) =>
    partners.find((p: any) => p._id?.toString() === partnerId?.toString());

  const handleStatusSave = async (form: StatusForm) => {
    if (!form.status) return;
    setSaving(true);
    try {
      await updateStatus({
        leadId: form.leadId as Id<"leads">,
        status: form.status as any,
        deeptrackNotes: form.notes,
      });
      setStatusForm(null);
      setExpandedId(null);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDealSave = async (form: DealForm) => {
    if (!form.revenue) return;
    setSaving(true);
    try {
      await createDeal({
        leadId: form.leadId as Id<"leads">,
        netRevenue: parseFloat(form.revenue),
        closeDate: Date.now(),
        market: form.market,
      });
      setDealForm(null);
      setExpandedId(null);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-3">
      {leads.length === 0 && (
        <div className="rounded-lg border border-border bg-muted/40 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No leads submitted yet</p>
        </div>
      )}
      {leads.map((lead: any) => {
        const partner = getPartnerInfo(lead.partnerId);
        const isExpanded = expandedId === lead._id;
        const isStatusFormOpen = statusForm !== null && statusForm.leadId === lead._id;
        const isDealFormOpen = dealForm !== null && dealForm.leadId === lead._id;

        return (
          <div key={lead._id} className="rounded-xl border border-border bg-background overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/20 transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : lead._id)}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div>
                  <p className="text-[14px] font-semibold text-foreground">{lead.orgName}</p>
                  <p className="text-[12px] text-muted-foreground">
                    {lead.partnerName || partner?.name || "Unknown partner"} · {lead.industry} · {lead.geography}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  lead.status === "Closed" ? "bg-green-100 text-green-800"
                  : lead.status === "Contacted" ? "bg-blue-100 text-blue-800"
                  : lead.status === "In negotiation" ? "bg-purple-100 text-purple-800"
                  : lead.status === "Lost" ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-700"
                }`}>
                  {lead.status}
                </span>
                {isExpanded
                  ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-border px-4 py-4 space-y-4 bg-muted/10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-[12px]">
                  {([
                    ["Contact", lead.contactName],
                    ["Email", lead.contactEmail],
                    ["Phone", lead.contactPhone || "—"],
                    ["Deal size", lead.dealSize],
                    ["Expected close", lead.expectedClose || "—"],
                    ["Submitted", new Date(lead.submittedAt).toLocaleDateString()],
                    ["Partner email", lead.partnerEmail || partner?.email || "—"],
                    ["Payment info", partner?.paymentDetails
                      ? `${partner.paymentDetails.method} · ${partner.paymentDetails.account} (${partner.paymentDetails.currency})`
                      : "Not set"],
                  ] as [string, string][]).map(([label, val]) => (
                    <div key={label}>
                      <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">{label}</span>
                      <span className="text-foreground">{val}</span>
                    </div>
                  ))}
                  {lead.notes && (
                    <div className="col-span-3">
                      <span className="block text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">Partner notes</span>
                      <span className="text-foreground">{lead.notes}</span>
                    </div>
                  )}
                </div>

                {/* Status form */}
                {isStatusFormOpen && statusForm !== null ? (
                  <div className="space-y-2 p-3 rounded-lg bg-background border border-border">
                    <p className="text-[12px] font-medium text-foreground">Update status</p>
                    <select
                      value={statusForm.status}
                      onChange={(e) => setStatusForm((prev) => prev ? { ...prev, status: e.target.value } : prev)}
                      className="w-full px-3 py-1.5 border border-border rounded-md text-sm text-foreground"
                    >
                      <option value="">Select status</option>
                      {["Contacted", "In negotiation", "Closed", "Lost"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <textarea
                        rows={2}
                        value={statusForm.notes}
                        onChange={(e) => setStatusForm((prev) => prev ? { ...prev, notes: e.target.value } : prev)}
                        placeholder="Notes visible to partner..."
                        className="w-full px-3 py-1.5 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground"
                      />
                    <div className="flex gap-2">
                      <button onClick={() => handleStatusSave(statusForm)} disabled={saving}
                        className="px-3 py-1.5 bg-[#185FA5] text-white rounded-md text-xs font-medium disabled:bg-muted">
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button onClick={() => setStatusForm(null)}
                        className="px-3 py-1.5 border border-border rounded-md text-xs">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setStatusForm({ leadId: lead._id, status: lead.status, notes: lead.deeptrackNotes || "" })}
                    className="px-3 py-1.5 border border-[#185FA5] text-[#185FA5] rounded-md text-xs font-medium hover:bg-[#185FA5]/10"
                  >
                    Update Status / Add Note
                  </button>
                )}

                {/* Deal form */}
                {lead.status !== "Closed" && (
                  isDealFormOpen && dealForm !== null ? (
                    <div className="space-y-2 p-3 rounded-lg bg-background border border-border">
                      <p className="text-[12px] font-medium text-foreground">Record closed deal</p>
                      <input
                        type="number"
                        value={dealForm.revenue}
                        onChange={(e) => setDealForm((prev) => prev ? { ...prev, revenue: e.target.value } : prev)}
                        placeholder="Net revenue ($)"
                        className="w-full px-3 py-1.5 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground"
                      />
                      <input
                        type="text"
                        value={dealForm.market}
                        onChange={(e) => setDealForm((prev) => prev ? { ...prev, market: e.target.value } : prev)}
                        placeholder="Market (e.g. Kenya)"
                        className="w-full px-3 py-1.5 border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleDealSave(dealForm)} disabled={saving}
                          className="px-3 py-1.5 bg-[#3B6D11] text-white rounded-md text-xs font-medium disabled:bg-muted">
                          {saving ? "Recording..." : "Record Deal + Commission"}
                        </button>
                        <button onClick={() => setDealForm(null)}
                          className="px-3 py-1.5 border border-border rounded-md text-xs">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDealForm({ leadId: lead._id, revenue: "", market: lead.geography || "" })}
                      className="px-3 py-1.5 border border-[#3B6D11] text-[#3B6D11] rounded-md text-xs font-medium hover:bg-[#3B6D11]/10"
                    >
                      <Plus className="w-3 h-3 inline mr-1" />Record Closed Deal
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CommissionsTab({ partners }: { partners: any[] }) {
  const allCommissions = useQuery(api.admin.getAllCommissions);
  const markPaid = useMutation(api.admin.markCommissionPaid);
  const [saving, setSaving] = useState<string | null>(null);
  const [payForm, setPayForm] = useState<PayForm | null>(null);

  const getPartnerName = (partnerId: string) =>
    partners.find((p: any) => p._id?.toString() === partnerId?.toString())?.name || "Unknown";

  const handleMarkPaid = async (form: PayForm) => {
    setSaving(form.id);
    try {
      await markPaid({ commissionId: form.id as Id<"commissions">, paymentMethod: form.method });
      setPayForm(null);
    } catch (e) { console.error(e); }
    finally { setSaving(null); }
  };

  if (allCommissions === undefined) return <div className="flex justify-center py-8"><Loader className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  if (!allCommissions || allCommissions.length === 0) return (
    <div className="rounded-lg border border-border bg-muted/40 p-6 text-center">
      <p className="text-sm text-muted-foreground">No commissions recorded yet</p>
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background">
      <table className="w-full">
        <thead className="bg-muted/40">
          <tr>
            {["Partner", "Period", "Amount", "Rate", "Status", "Paid on", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allCommissions.map((c: any) => {
            const isPayFormOpen = payForm !== null && payForm.id === c._id;
            return (
              <tr key={c._id} className="border-t border-border hover:bg-muted/20">
                <td className="px-4 py-3 text-[13px] text-foreground">{getPartnerName(c.partnerId)}</td>
                <td className="px-4 py-3 text-[13px] text-foreground">{c.period || "—"}</td>
                <td className="px-4 py-3 text-[13px] font-medium text-[#3B6D11]">${c.amount?.toLocaleString()}</td>
                <td className="px-4 py-3 text-[13px] text-foreground">{c.rate ? `${Math.round(c.rate * 100)}%` : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${c.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {c.status === "paid" ? "Paid" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[13px] text-foreground">{c.paidAt ? new Date(c.paidAt).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3">
                  {c.status !== "paid" && (
                    isPayFormOpen && payForm !== null ? (
                      <div className="flex gap-1 items-center">
                        <input
                          type="text"
                          value={payForm.method}
                          onChange={(e) => setPayForm((prev) => prev ? { ...prev, method: e.target.value } : prev)}
                          placeholder="e.g. Bank Transfer"
                          className="px-2 py-1 border border-border rounded text-xs w-32"
                        />
                        <button onClick={() => handleMarkPaid(payForm)} disabled={saving === c._id}
                          className="px-2 py-1 bg-[#3B6D11] text-white rounded text-xs disabled:bg-muted">
                          {saving === c._id ? "..." : "Confirm"}
                        </button>
                        <button onClick={() => setPayForm(null)} className="px-2 py-1 border border-border rounded text-xs">✕</button>
                      </div>
                    ) : (
                      <button onClick={() => setPayForm({ id: c._id, method: "" })}
                        className="flex items-center gap-1 px-2 py-1 border border-[#3B6D11] text-[#3B6D11] rounded text-xs font-medium hover:bg-[#3B6D11]/10">
                        <CheckCircle2 className="w-3 h-3" /> Mark Paid
                      </button>
                    )
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MaterialsTab() {
  const materials = useQuery(api.admin.getAllMaterials);
  const addMaterial = useMutation(api.admin.addMaterial);
  const removeMaterial = useMutation(api.admin.removeMaterial);
  const [form, setForm] = useState({ name: "", fileType: "", fileUrl: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.fileType || !form.fileUrl) return;
    setSaving(true);
    try {
      await addMaterial({ name: form.name, fileType: form.fileType, fileUrl: form.fileUrl });
      setForm({ name: "", fileType: "", fileUrl: "" });
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleRemove = async (id: string) => {
    setDeleting(id);
    try { await removeMaterial({ materialId: id as Id<"materials"> }); }
    catch (e) { console.error(e); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-5">
      <Card title="Add new material">
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Asset name (e.g. One-pager)" className="px-3 py-2 border border-border rounded-md text-sm text-foreground" required />
          <input value={form.fileType} onChange={(e) => setForm((p) => ({ ...p, fileType: e.target.value }))}
            placeholder="File type (e.g. PDF, MP4)" className="px-3 py-2 border border-border rounded-md text-sm text-foreground" required />
          <input value={form.fileUrl} onChange={(e) => setForm((p) => ({ ...p, fileUrl: e.target.value }))}
            placeholder="File URL (S3/GCP signed URL)" className="px-3 py-2 border border-border rounded-md text-sm text-foreground" required />
          <button type="submit" disabled={saving}
            className="md:col-span-3 flex items-center justify-center gap-2 px-4 py-2 bg-[#185FA5] text-white rounded-md text-sm font-medium hover:bg-[#154c88] disabled:bg-muted">
            <Upload className="w-3.5 h-3.5" />{saving ? "Adding..." : "Add Material"}
          </button>
        </form>
      </Card>
      <Card title="All materials">
        {!materials || materials.length === 0 ? (
          <p className="text-sm text-muted-foreground">No materials uploaded yet</p>
        ) : (
          <div className="space-y-2">
            {materials.map((m: any) => (
              <div key={m._id} className="flex items-center justify-between px-3 py-2 rounded-lg border border-border hover:bg-muted/20">
                <div>
                  <p className="text-[13px] font-medium text-foreground">{m.name}</p>
                  <p className="text-[11px] text-muted-foreground">{m.fileType} · Updated {new Date(m.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <a href={m.fileUrl} target="_blank" rel="noopener noreferrer"
                    className="px-2 py-1 border border-border rounded text-xs text-foreground hover:bg-muted">View</a>
                  <button onClick={() => handleRemove(m._id)} disabled={deleting === m._id}
                    className="px-2 py-1 border border-red-200 text-red-600 rounded text-xs hover:bg-red-50 disabled:opacity-50">
                    {deleting === m._id ? "..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function NotificationsTab({ partners }: { partners: any[] }) {
  const sendNotif = useMutation(api.admin.sendNotification);
  const [form, setForm] = useState({ partnerId: "all", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setSending(true);
    try {
      await sendNotif({
        partnerId: form.partnerId === "all" ? undefined : form.partnerId as Id<"partners">,
        message: form.message,
      });
      setForm({ partnerId: "all", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (e) { console.error(e); }
    finally { setSending(false); }
  };

  return (
    <Card title="Send in-portal notification">
      <form onSubmit={handleSend} className="space-y-3 max-w-lg">
        <div>
          <label className="block text-[12px] font-medium text-foreground mb-1">Recipient</label>
          <select value={form.partnerId} onChange={(e) => setForm((p) => ({ ...p, partnerId: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground">
            <option value="all">All partners (broadcast)</option>
            {partners.map((p: any) => (
              <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-foreground mb-1">Message</label>
          <textarea rows={3} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            placeholder="e.g. Commission rates updated for Q2 2026..."
            className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground" required />
        </div>
        <button type="submit" disabled={sending}
          className="flex items-center gap-2 px-4 py-2 bg-[#185FA5] text-white rounded-md text-sm font-medium hover:bg-[#154c88] disabled:bg-muted">
          <Send className="w-3.5 h-3.5" />{sending ? "Sending..." : "Send Notification"}
        </button>
        {sent && <p className="text-[12px] text-[#3B6D11] font-medium">✓ Notification sent</p>}
      </form>
    </Card>
  );
}

export default function AdminPage() {
  const leads = useQuery(api.leads.getAllLeads);
  const partners = useQuery(api.users.getAllPartners);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("leads");

  useEffect(() => {
    if (leads !== undefined && partners !== undefined) {
      setIsLoading(false);
      if (leads === null || partners === null) setAccessDenied(true);
    }
  }, [leads, partners]);

  const leadsArray: any[] = Array.isArray(leads) ? leads : [];
  const partnersArray: any[] = Array.isArray(partners) ? partners : [];

  const TABS: { id: Tab; label: string }[] = [
    { id: "leads", label: `Leads (${leadsArray.length})` },
    { id: "commissions", label: "Commissions" },
    { id: "materials", label: "Materials" },
    { id: "notifications", label: "Notifications" },
  ];

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
    </div>
  );

  return (
    <>
      <ErrorModal
        isOpen={accessDenied}
        onClose={() => { setAccessDenied(false); router.push("/portal/dashboard"); }}
        title="Access Denied"
        message="This area is restricted to Deeptrack staff only."
        type="error"
      />
      {!accessDenied && (
        <div className="px-6 py-6 max-w-[1400px] mx-auto space-y-6">
              <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/portal/dashboard")}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div>
                <h1 className="text-[22px] font-semibold text-foreground">Admin Panel</h1>
                <p className="text-[13px] text-muted-foreground mt-0.5">Deeptrack internal — manage leads, commissions, materials and notifications</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-1 p-1 bg-muted/40 rounded-xl w-fit">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  activeTab === tab.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {activeTab === "leads" && <LeadsTab leads={leadsArray} partners={partnersArray} />}
            {activeTab === "commissions" && <CommissionsTab partners={partnersArray} />}
            {activeTab === "materials" && <MaterialsTab />}
            {activeTab === "notifications" && <NotificationsTab partners={partnersArray} />}
          </motion.div>
        </div>
      )}
      <FinalCTASection />
    </>
  );
}
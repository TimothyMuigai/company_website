"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, KeyRound, Loader, RefreshCw } from "lucide-react";

type Track = "api" | "platform";
type ApiPlan = "payg" | "starter" | "growth" | "scale" | "enterprise";
type PlatformPlan = "trial" | "starter" | "pro" | "business" | "enterprise";
type Plan = ApiPlan | PlatformPlan;

interface ApiKeyRecord {
  id: string;
  owner: string;
  api_key: string;
  track: Track;
  plan: Plan;
  monthly_limit: number;
  is_active: boolean;
  notes?: string;
  created_at: string;
}

interface ListKeysResponse {
  keys: ApiKeyRecord[];
  total: number;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface UsageResponse {
  usage: Record<string, number>;
  month: string;
}

const PLAN_DEFAULTS: Record<Track, Record<string, number>> = {
  api: {
    payg: 999999,
    starter: 5000,
    growth: 25000,
    scale: 100000,
    enterprise: 999999,
  },
  platform: {
    trial: 20,
    starter: 150,
    pro: 600,
    business: 2500,
    enterprise: 999999,
  },
};

const TRACK_PLANS: Record<Track, Plan[]> = {
  api: ["payg", "starter", "growth", "scale", "enterprise"],
  platform: ["trial", "starter", "pro", "business", "enterprise"],
};

const UNLIMITED_LIMIT = 999999;

function isUnlimited(limit: number) {
  return limit >= UNLIMITED_LIMIT;
}

function displayLimit(limit: number) {
  return isUnlimited(limit) ? "∞" : limit.toLocaleString();
}

async function readJsonOrThrow(res: Response) {
  const json = await res.json();
  if (!res.ok) {
    if (res.status === 403) {
      throw new Error(
        "Forbidden by Deeptrack backend. Verify DEEPTRACK_ADMIN_SECRET (X-Admin-Secret) is the correct admin secret.",
      );
    }

    const err = (json && (json.error || json.details || json.message)) || "Request failed";
    throw new Error(typeof err === "string" ? err : JSON.stringify(err));
  }
  return json;
}

export default function ApiKeysTab() {
  const [keys, setKeys] = useState<ApiKeyRecord[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usage, setUsage] = useState<Record<string, number>>({});
  const [usageMonth, setUsageMonth] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionBusyId, setActionBusyId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [owner, setOwner] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [track, setTrack] = useState<Track>("api");
  const [plan, setPlan] = useState<Plan>("starter");
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [notes, setNotes] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdRawKey, setCreatedRawKey] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const [planDrafts, setPlanDrafts] = useState<Record<string, { track: Track; plan: Plan; monthlyLimit: string }>>({});
  const [limitDrafts, setLimitDrafts] = useState<Record<string, string>>({});

  const trackPlanOptions = useMemo(() => TRACK_PLANS[track], [track]);

  useEffect(() => {
    setPlan(trackPlanOptions[0]);
    setMonthlyLimit("");
  }, [track, trackPlanOptions]);

  useEffect(() => {
    void loadAll();
  }, []);

  async function loadAll() {
    setError(null);
    setLoading(true);
    try {
      const [keysRes, usageRes, usersRes] = await Promise.all([
        fetch("/api/admin/keys", { cache: "no-store" }),
        fetch("/api/admin/usage/month", { cache: "no-store" }),
        fetch("/api/admin/users", { cache: "no-store" }),
      ]);

      const keysJson = (await readJsonOrThrow(keysRes)) as ListKeysResponse;
      const usageJson = (await readJsonOrThrow(usageRes)) as UsageResponse;
      const usersJson = (await readJsonOrThrow(usersRes)) as { users: AdminUser[] };

      setKeys(keysJson.keys || []);
      setUsage(usageJson.usage || {});
      setUsageMonth(usageJson.month || "");
      setUsers(usersJson.users || []);

      const nextPlanDrafts: Record<string, { track: Track; plan: Plan; monthlyLimit: string }> = {};
      const nextLimitDrafts: Record<string, string> = {};
      for (const key of keysJson.keys || []) {
        nextPlanDrafts[key.id] = {
          track: key.track,
          plan: key.plan,
          monthlyLimit: "",
        };
        nextLimitDrafts[key.id] = "";
      }
      setPlanDrafts(nextPlanDrafts);
      setLimitDrafts(nextLimitDrafts);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load API key data";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function refreshKeysAndUsage() {
    setRefreshing(true);
    try {
      const [keysRes, usageRes] = await Promise.all([
        fetch("/api/admin/keys", { cache: "no-store" }),
        fetch("/api/admin/usage/month", { cache: "no-store" }),
      ]);
      const keysJson = (await readJsonOrThrow(keysRes)) as ListKeysResponse;
      const usageJson = (await readJsonOrThrow(usageRes)) as UsageResponse;
      setKeys(keysJson.keys || []);
      setUsage(usageJson.usage || {});
      setUsageMonth(usageJson.month || "");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Refresh failed";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  }

  async function onCreateKey(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setCreatedRawKey(null);

    try {
      const payload: Record<string, unknown> = {
        owner,
        user_id: selectedUserId,
        track,
        plan,
      };

      if (monthlyLimit.trim()) {
        payload.monthly_limit = Number(monthlyLimit);
      }
      if (notes.trim()) {
        payload.notes = notes.trim();
      }

      const res = await fetch("/api/admin/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await readJsonOrThrow(res)) as { key: string };
      setCreatedRawKey(json.key);
      setOwner("");
      setSelectedUserId("");
      setMonthlyLimit("");
      setNotes("");
      await refreshKeysAndUsage();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create key";
      setError(message);
    } finally {
      setCreating(false);
    }
  }

  async function copyRawKey() {
    if (!createdRawKey) return;
    try {
      await navigator.clipboard.writeText(createdRawKey);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setError("Copy failed. Please copy the key manually.");
    }
  }

  async function toggleKey(id: string, activate: boolean) {
    setActionBusyId(id);
    setError(null);
    try {
      const endpoint = activate ? "activate" : "deactivate";
      const res = await fetch(`/api/admin/keys/${id}/${endpoint}`, { method: "PATCH" });
      await readJsonOrThrow(res);
      await refreshKeysAndUsage();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update key status";
      setError(message);
    } finally {
      setActionBusyId(null);
    }
  }

  async function updatePlan(id: string) {
    const draft = planDrafts[id];
    if (!draft) return;

    setActionBusyId(id);
    setError(null);
    try {
      const payload: Record<string, unknown> = {
        track: draft.track,
        plan: draft.plan,
      };
      if (draft.monthlyLimit.trim()) {
        payload.monthly_limit = Number(draft.monthlyLimit);
      }

      const res = await fetch(`/api/admin/keys/${id}/plan`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await readJsonOrThrow(res);
      await refreshKeysAndUsage();
      setPlanDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], monthlyLimit: "" },
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update plan";
      setError(message);
    } finally {
      setActionBusyId(null);
    }
  }

  async function updateLimit(id: string) {
    const limitValue = Number(limitDrafts[id]);
    if (!Number.isFinite(limitValue) || limitValue <= 0) {
      setError("Monthly limit must be a positive number.");
      return;
    }

    setActionBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/keys/${id}/limit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monthly_limit: limitValue }),
      });
      await readJsonOrThrow(res);
      await refreshKeysAndUsage();
      setLimitDrafts((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to override limit";
      setError(message);
    } finally {
      setActionBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-background p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-[15px] font-semibold text-foreground">Generate API key</h3>
            <p className="text-[12px] text-muted-foreground mt-1">Create and assign keys for API or platform access.</p>
          </div>
          <button
            onClick={() => void refreshKeysAndUsage()}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-xs font-medium hover:bg-muted disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <form onSubmit={onCreateKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            placeholder="Owner (e.g. Gotham Media)"
            className="px-3 py-2 border border-border rounded-md text-sm"
          />

          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
            className="px-3 py-2 border border-border rounded-md text-sm"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>

          <select
            value={track}
            onChange={(e) => setTrack(e.target.value as Track)}
            className="px-3 py-2 border border-border rounded-md text-sm"
          >
            <option value="api">api</option>
            <option value="platform">platform</option>
          </select>

          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as Plan)}
            className="px-3 py-2 border border-border rounded-md text-sm"
          >
            {trackPlanOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <input
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            type="number"
            min={1}
            placeholder={`Optional custom limit (default ${PLAN_DEFAULTS[track][plan].toLocaleString()})`}
            className="px-3 py-2 border border-border rounded-md text-sm"
          />

          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes"
            className="px-3 py-2 border border-border rounded-md text-sm"
          />

          <button
            type="submit"
            disabled={creating}
            className="md:col-span-2 lg:col-span-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#185FA5] text-white text-sm font-medium hover:bg-[#154c88] disabled:opacity-60"
          >
            <KeyRound className="w-4 h-4" />
            {creating ? "Generating..." : "Generate key"}
          </button>
        </form>

        {createdRawKey && (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3">
            <p className="text-[12px] font-semibold text-amber-900">Raw key (shown once)</p>
            <p className="text-[12px] text-amber-900 mt-1">Copy and store this key now. It will not be shown again.</p>
            <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:items-center">
              <code className="flex-1 overflow-x-auto rounded bg-amber-100 px-2 py-2 text-[12px] text-amber-950">
                {createdRawKey}
              </code>
              <button
                onClick={copyRawKey}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded border border-amber-300 text-[12px] font-medium text-amber-900 hover:bg-amber-100"
              >
                <Copy className="w-3.5 h-3.5" />
                {copyStatus === "copied" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
            {error}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-background overflow-x-auto">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <p className="text-[13px] font-semibold text-foreground">All keys</p>
          <p className="text-[12px] text-muted-foreground">
            Billing month: {usageMonth || "-"}
          </p>
        </div>

        {loading ? (
          <div className="py-10 flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : keys.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">No keys found.</div>
        ) : (
          <table className="w-full min-w-[1200px]">
            <thead className="bg-muted/40">
              <tr>
                {[
                  "Owner",
                  "Track",
                  "Plan",
                  "Limit",
                  "Usage",
                  "Status",
                  "Created",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="text-left px-3 py-3 text-[11px] uppercase tracking-wide font-medium text-muted-foreground"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => {
                const used = usage[key.id] ?? 0;
                const unlimited = isUnlimited(key.monthly_limit);
                const usagePct = unlimited ? 0 : Math.min(100, (used / key.monthly_limit) * 100);
                const usageColor =
                  usagePct >= 90
                    ? "bg-red-500"
                    : usagePct >= 70
                      ? "bg-amber-500"
                      : "bg-emerald-500";

                const planDraft = planDrafts[key.id] || {
                  track: key.track,
                  plan: key.plan,
                  monthlyLimit: "",
                };

                const isBusy = actionBusyId === key.id;

                return (
                  <tr key={key.id} className="border-t border-border align-top hover:bg-muted/20">
                    <td className="px-3 py-3 text-[13px] text-foreground">
                      <div className="font-medium">{key.owner}</div>
                      <div className="text-[11px] text-muted-foreground mt-1">{key.id}</div>
                    </td>
                    <td className="px-3 py-3 text-[13px] text-foreground">{key.track}</td>
                    <td className="px-3 py-3 text-[13px] text-foreground">{key.plan}</td>
                    <td className="px-3 py-3 text-[13px] text-foreground">{displayLimit(key.monthly_limit)}</td>
                    <td className="px-3 py-3 text-[13px] text-foreground min-w-[260px]">
                      <div className="flex items-center justify-between text-[12px] mb-1">
                        <span>{used.toLocaleString()} used</span>
                        <span>
                          {unlimited ? "∞" : `${Math.round(usagePct)}%`}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${usageColor}`}
                          style={{ width: unlimited ? "8%" : `${usagePct}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          key.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {key.is_active ? "active" : "inactive"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[12px] text-foreground">{new Date(key.created_at).toLocaleDateString()}</td>
                    <td className="px-3 py-3 min-w-[360px]">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => void toggleKey(key.id, !key.is_active)}
                            disabled={isBusy}
                            className="px-2 py-1 text-[11px] rounded border border-border hover:bg-muted disabled:opacity-60"
                          >
                            {key.is_active ? "Deactivate" : "Activate"}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <select
                            value={planDraft.track}
                            onChange={(e) => {
                              const nextTrack = e.target.value as Track;
                              setPlanDrafts((prev) => ({
                                ...prev,
                                [key.id]: {
                                  track: nextTrack,
                                  plan: TRACK_PLANS[nextTrack][0],
                                  monthlyLimit: prev[key.id]?.monthlyLimit || "",
                                },
                              }));
                            }}
                            className="px-2 py-1 border border-border rounded text-[12px]"
                          >
                            <option value="api">api</option>
                            <option value="platform">platform</option>
                          </select>

                          <select
                            value={planDraft.plan}
                            onChange={(e) =>
                              setPlanDrafts((prev) => ({
                                ...prev,
                                [key.id]: {
                                  ...planDraft,
                                  plan: e.target.value as Plan,
                                },
                              }))
                            }
                            className="px-2 py-1 border border-border rounded text-[12px]"
                          >
                            {TRACK_PLANS[planDraft.track].map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => void updatePlan(key.id)}
                            disabled={isBusy}
                            className="px-2 py-1 text-[11px] rounded border border-[#185FA5] text-[#185FA5] hover:bg-[#185FA5]/10 disabled:opacity-60"
                          >
                            Save plan
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input
                            type="number"
                            min={1}
                            value={planDraft.monthlyLimit}
                            onChange={(e) =>
                              setPlanDrafts((prev) => ({
                                ...prev,
                                [key.id]: { ...planDraft, monthlyLimit: e.target.value },
                              }))
                            }
                            placeholder="Optional plan limit override"
                            className="md:col-span-2 px-2 py-1 border border-border rounded text-[12px]"
                          />
                          <div className="text-[11px] text-muted-foreground self-center">
                            Blank uses plan default
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <input
                            type="number"
                            min={1}
                            value={limitDrafts[key.id] || ""}
                            onChange={(e) =>
                              setLimitDrafts((prev) => ({ ...prev, [key.id]: e.target.value }))
                            }
                            placeholder="Override monthly limit"
                            className="md:col-span-2 px-2 py-1 border border-border rounded text-[12px]"
                          />
                          <button
                            onClick={() => void updateLimit(key.id)}
                            disabled={isBusy}
                            className="px-2 py-1 text-[11px] rounded border border-[#3B6D11] text-[#3B6D11] hover:bg-[#3B6D11]/10 disabled:opacity-60"
                          >
                            Set limit
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

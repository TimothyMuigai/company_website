"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import Alert from "@/components/Alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const authActions = useAuthActions();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await authActions.signIn("password", {
        flow: "reset",
        email,
      });
      setMessage("If the account exists, check your email for reset instructions.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to start password reset flow. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!code || !newPassword) {
      setError("Please provide both reset code and new password.");
      return;
    }

    setLoading(true);
    try {
      await authActions.signIn("password", {
        flow: "reset-verification",
        verifier: code,
        params: {
          newPassword,
        },
      });
      setMessage("Password reset successful. You can now log in with your new password.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to verify reset code. Check code and try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-xl font-semibold text-gray-900">Forgot password</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter your email to receive reset instructions.
        </p>

        {error && (
          <div className="mt-4">
            <Alert type="error">{error}</Alert>
          </div>
        )}

        {message && (
          <div className="mt-4">
            <Alert type="success">{message}</Alert>
          </div>
        )}

        <form className="mt-4 space-y-3" onSubmit={handleRequestReset}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset email"}
          </button>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-slate-600">
          <p className="mb-2 font-medium">Have reset code already?</p>
          <form className="space-y-2" onSubmit={handleResetConfirm}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Reset code"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="New password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 inline-flex items-center text-gray-500"
                onClick={() => setShowNewPassword((prev) => !prev)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Confirm new password"}
            </button>
          </form>
        </div>

        <div className="mt-4 text-sm text-center">
          <Link href="/portal/login" className="text-indigo-600 hover:text-indigo-700">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

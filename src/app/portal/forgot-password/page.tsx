"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ErrorModal from "@/components/ErrorModal";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"request" | "verify">("request");
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { signIn } = useAuthActions();

  const showError = (msg: string) => {
    setError(msg);
    setModalOpen(true);
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return showError("Please enter your email address.");

    setLoading(true);
    try {
      await signIn("password", { flow: "reset", email });
      setSuccessMessage(
        "Reset instructions sent! Check your email for a verification code. It expires in 10 minutes."
      );
      setSuccessModalOpen(true);
      // Advance to step 2 after user closes the modal
      setStep("verify");
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      if (
        raw.includes("not found") ||
        raw.includes("NoUser") ||
        raw.includes("no user") ||
        raw.includes("InvalidAccountId")
      ) {
        showError("No account found with that email address.");
      } else if (raw.includes("Password reset is not enabled")) {
        showError("Password reset is currently disabled. Please contact support.");
      } else {
        showError("Unable to send reset email. Please try again in a moment.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return showError("Please enter the verification code from your email.");
    if (!newPassword) return showError("Please enter a new password.");
    if (newPassword.length < 8) return showError("Password must be at least 8 characters long.");

    setLoading(true);
    try {
      // Correct payload for @convex-dev/auth Password provider reset-verification
      await signIn("password", {
        flow: "reset-verification",
        email,
        code,
        newPassword,
      });
      setSuccessMessage("Password reset successfully! Redirecting you to sign in...");
      setSuccessModalOpen(true);
      setTimeout(() => router.push("/portal/login"), 2000);
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      if (raw.includes("InvalidCode") || raw.includes("expired") || raw.includes("invalid code")) {
        showError("Invalid or expired code. Please request a new reset email.");
      } else if (raw.includes("InvalidSecret") || raw.includes("Invalid secret")) {
        showError("Invalid verification code. Please check and try again.");
      } else {
        showError("Could not reset password. Please request a new code.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-xl font-semibold text-gray-900">Reset your password</h1>
        <p className="text-sm text-gray-500 mt-1">
          {step === "request"
            ? "Enter your email and we'll send a reset code."
            : `Enter the code sent to ${email} and choose a new password.`}
        </p>

        {/* Error modal */}
        <ErrorModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Password Reset Error"
          message={error || "Something went wrong."}
          type="error"
        />

        {/* Success modal */}
        <ErrorModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          title="Success"
          message={successMessage}
          type="info"
        />

        {/* Step 1 — Request reset */}
        {step === "request" && (
          <form className="mt-5 space-y-3" onSubmit={handleRequestReset}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send reset code"}
            </button>
            <p className="text-center text-sm text-gray-500">
              Already have a code?{" "}
              <button
                type="button"
                className="text-indigo-600 hover:underline"
                onClick={() => setStep("verify")}
              >
                Enter it here
              </button>
            </p>
          </form>
        )}

        {/* Step 2 — Enter code + new password */}
        {step === "verify" && (
          <form className="mt-5 space-y-3" onSubmit={handleResetConfirm}>
            {/* Allow editing the email in case they need to go back */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Verification code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Paste code from email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-medium text-gray-600 mb-1">New password</label>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="At least 8 characters"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-2 bottom-2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowNewPassword((p) => !p)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Set new password"}
            </button>
            <p className="text-center text-sm text-gray-500">
              <button
                type="button"
                className="text-indigo-600 hover:underline"
                onClick={() => setStep("request")}
              >
                ← Request a new code
              </button>
            </p>
          </form>
        )}

        <div className="mt-5 text-center text-sm">
          <Link href="/portal/login" className="text-indigo-600 hover:text-indigo-700">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
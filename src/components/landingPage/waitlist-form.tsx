'use client'

import { useState } from "react";


export default function WaitlistForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          company,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Submission failed.");
      }

      setSuccess("Message sent successfully.");
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCompany("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
     <form onSubmit={handleSubmit} className="space-y-6">
      <div className="">
        <label className="text-sm text-gray-800">Full name</label>
        <input
          type="text"
          placeholder="John Kamau"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm text-gray-800">Email*</label>
        <input
          type="email"
          placeholder="email@gmail.com"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="text-sm text-gray-800">Phone Number</label>
        <input
          type="text"
          placeholder="+254 744 567 890"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      {/* company or organisation */}
      <div className="space-y-2">
        <label className="text-sm text-gray-800">Company or Organization</label>
        <input
          type="text"
          placeholder="Company Name"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      {/* Feedback Messages */}
      {success && (
        <p className="text-green-600 text-sm">{success}</p>
      )}
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex items-center gap-3 bg-[#1E88C8] hover:bg-[#166DA3] transition px-8 py-3 text-white text-sm tracking-wide disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  )
}

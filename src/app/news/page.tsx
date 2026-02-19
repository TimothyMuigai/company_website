"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Navbar } from "@/components/landingPage/navs/navBar";
import Link from "next/link";

export default function News() {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/news-centre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          institution,
          email,
          message: "News Centre Access Request",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Thank you! Your request has been received.");
        setName("");
        setInstitution("");
        setEmail("");
        
        window.open(process.env.NEXT_PUBLIC_AIRTABLE_LINK, "_blank");
      } else {
        setLoading(false);
        setError(data.message || "Submission failed. Try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-sm text-gray-500">\ Resources</span>

              <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                Deepfake News <br /> Center
              </h1>

              <p className="text-gray-600 max-w-md leading-7">
                Used by journalists and industry veterans, this database is
                updated daily with the latest news stories and is provided as
                a free service for research and news-gathering purposes.
              </p>
            </motion.div>

            {/* RIGHT SIDE FORM */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Full name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Institution */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Institution</label>
                <input
                  type="text"
                  placeholder="University of Example"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Email*</label>
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              {/* Privacy Note */}
              <p className="text-sm text-gray-500 max-w-md">
                Please see our{" "}
                <Link href="/privacy-policy">
                  <span className="underline cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                </Link>
                to learn about how we will handle this information.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-[#1E88C8] hover:bg-[#166DA3] transition px-8 py-3 text-white text-sm tracking-wide disabled:opacity-60"
                disabled={loading}
              >
                <span className="text-xs">▶</span>
                {loading ? "Sending..." : "Access News Center"}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}

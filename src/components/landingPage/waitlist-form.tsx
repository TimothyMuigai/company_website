'use client'

import { useState } from "react";


export default function WaitlistForm() {
  const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [jobTitle, setJobTitle] = useState("");
   const [company, setCompany] = useState("");
   const [message, setMessage] = useState("");
 
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");
 
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setError("");
     setSuccess("");
     setLoading(true);
 
     try {
       const res = await fetch("/api/contact", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           firstName,
           lastName,
           email,
           jobTitle,
           company,
           message,
 
         }),
       });
 
       const data = await res.json();
 
       if (!res.ok) {
         throw new Error(data?.message || "Submission failed.");
       }
 
       setSuccess("Message sent successfully.");
       setFirstName("");
       setLastName("");
       setEmail("");
       setJobTitle("");
       setCompany("");
       setMessage("");
     } catch (err: any) {
       setError(err.message || "Network error. Please try again.");
     } finally {
       setLoading(false);
     }
   };
  return (
    <div>
        <div className="">
                <label className="text-sm text-gray-800">First name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              {/* last name */}
              <div className="space-y-2">
                <label className="text-sm text-gray-800">Last name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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

              {/* job title */}
              <div className="space-y-2">
                <label className="text-sm text-gray-800">Job Title</label>
                <input
                  type="text"
                  placeholder="Security officer"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-black py-2 text-gray-900"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
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
    </div>
  )
}

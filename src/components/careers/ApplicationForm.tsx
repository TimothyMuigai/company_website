"use client";
import React, { useState } from 'react';

type Props = {
  jobSlug: string;
  jobTitle: string;
};

export default function ApplicationForm({ jobSlug, jobTitle }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [links, setLinks] = useState('');
  const [github, setGithub] = useState('');
  const [cover, setCover] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  function validate() {
    if (!firstName || !lastName || !email) {
      setError('Please fill first name, last name and email.');
      return false;
    }
    if (!cover) {
      setError('Cover letter is required.');
      return false;
    }
    if (!cvFile) {
      setError('Please upload your CV.');
      return false;
    }
    if (!ALLOWED.includes(cvFile.type)) {
      setError('Invalid CV format. Use PDF or DOC/DOCX.');
      return false;
    }
    if (cvFile.size > MAX_SIZE) {
      setError('CV exceeds 5MB size limit.');
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!validate()) return;
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('jobSlug', jobSlug);
      fd.append('jobTitle', jobTitle);
      fd.append('firstName', firstName);
      fd.append('lastName', lastName);
      fd.append('email', email);
      if (phone) fd.append('phone', phone);
      if (links) fd.append('links', links);
      if (github) fd.append('github', github);
      fd.append('cover', cover);
      if (cvFile) fd.append('cv', cvFile);

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Submission failed');
      }

      setSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setLinks('');
      setGithub('');
      setCover('');
      setCvFile(null);
    } catch (err: any) {
      setError(err?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">First name *</span>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 border rounded px-3 py-2 text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Last name *</span>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">GitHub (optional)</span>
        <input
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/your-username"
          className="mt-1 border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">Email *</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">Phone (optional)</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">LinkedIn / Portfolio (optional)</span>
          <input
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            className="mt-1 border rounded px-3 py-2 text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">Cover letter *</span>
        <textarea
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          rows={6}
          className="mt-1 border rounded px-3 py-2 text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">CV (PDF, DOC, or DOCX) *</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
          className="mt-2 text-gray-700"
        />
        <p className="text-xs text-gray-500 mt-1">Max size 5MB. PDF preferred.</p>
      </label>

      {error && <div className="text-sm text-red-600">{error}</div>}
      {success && <div className="text-sm text-green-700">Application submitted — we’ll be in touch.</div>}

      <div>
        <button type="submit" disabled={loading} className="bg-sky-600 text-white px-5 py-2 rounded hover:bg-sky-700 disabled:opacity-60">
          {loading ? 'Submitting…' : `Apply for ${jobTitle}`}
        </button>
      </div>
    </form>
  );
}

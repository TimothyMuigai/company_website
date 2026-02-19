import { jobs } from '@/data/jobs';
import React from 'react';
import JobCard from './JobCard';

export default function JobList() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-black">Open roles</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

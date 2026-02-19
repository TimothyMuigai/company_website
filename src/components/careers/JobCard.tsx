import Link from 'next/link';

import { Job } from '@/data/jobs'

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="bg-[#001D2C66] text-black rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-1">
        <Link href={`/career/${job.slug}`} className="underline">
          {job.title}
        </Link>
      </h3>
      <div className="text-sm text-gray-900 mb-3">
        <span className="mr-3">{job.department}</span>
        <span className="mr-3">•</span>
        <span className="mr-3">{job.location}</span>
        <span className="mr-3">•</span>
        <span>{job.employmentType}</span>
      </div>
      <p className="text-black mb-4">{job.summary}</p>
      <div className="flex items-center gap-4">
        <Link href={`/career/${job.slug}`} 
            className="inline-block bg-gray-600 text-shadow-black px-3 py-1 rounded hover:bg-gray-300 transition font-semibold">
          View role →
        </Link>
        {job.docUrl && (
          <a href={job.docUrl} download className="bg-gray-600 text-shadow-black px-3 py-1 rounded hover:bg-gray-300 transition font-semibold">
            Download JD
          </a>
        )}
      </div>
    </article>
  );
}

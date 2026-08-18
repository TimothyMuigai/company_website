import Link from 'next/link';

import { Job } from '@/data/jobs'

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="border border-gray-700 text-black rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl text-gray-900 mb-1">
        <Link href={`/career/${job.slug}`} className="underline">
          {job.title}
        </Link>
      </h3>
      <div className="text-sm text-gray-800 mb-3">
        <span className="mr-3">{job.department}</span>
        <span className="mr-3">•</span>
        <span className="mr-3">{job.location}</span>
        <span className="mr-3">•</span>
        <span>{job.employmentType}</span>
      </div>
      <p className="text-gray-700 mb-4">{job.summary}</p>
      <div className="flex items-center gap-4">
        <Link href={`/career/${job.slug}`} 
            className="inline-block border border-gray-700 bg-gray-300 text-gray-800 tracking-wide px-3 py-1 rounded hover:bg-white transition">
          View role →
        </Link>
        {job.docUrl && (
          <a href={job.docUrl} download className="border border-gray-700 bg-gray-300 text-gray-800 tracking-wide px-3 py-1 rounded hover:bg-white transition">
            Download JD
          </a>
        )}
      </div>
    </article>
  );
}

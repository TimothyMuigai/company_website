
import { notFound } from 'next/navigation';
import { jobs } from '@/data/jobs';
import JobDetail from '@/components/careers/JobDetail';
import { Navbar } from '@/components/landingPage/navs/navBar';

type Props = {
  // `params` may be a Promise in the Next.js app router; unwrap with `await`.
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function JobPage({ params }: Props) {
  const { slug } = (await params) as { slug: string };
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return notFound();

  return (
    <div className="space-y-6">
      <Navbar />
      <JobDetail job={job} />
    </div>
  );
}

// Pre-render all known job pages at build time so they don't 404 in static deployments.
export async function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

"use client";
import { Job } from "@/data/jobs";
import ApplicationForm from "./ApplicationForm";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function JobDetail({ job }: { job: Job }) {
    const router = useRouter();
    return (
        <section className="max-w-7xl mx-auto py-4 px-4 ">
                <div className="mb-8">
                    <Button onClick={() => router.back()}>
                        Back
                    </Button>
                </div>
            <div className="grid gap-8 lg:grid-cols-2">
                <div >
                    <h1 className="text-3xl font-semibold mb-2 text-black">{job.title}</h1>
                    <div className="text-sm text-gray-900 mb-4">
                        <span className="mr-3">{job.department}</span>
                        <span className="mr-3">•</span>
                        <span className="mr-3">{job.location}</span>
                        <span className="mr-3">•</span>
                        <span>{job.employmentType}</span>
                    </div>
                    {job.description && <p className="text-gray-700 mb-4">{job.description}</p>}
                    {job.docUrl && (
                        <p className="mb-4">
                            <a href={job.docUrl} download className="inline-block bg-gray-600 text-shadow-black px-3 py-2 rounded hover:bg-gray-700 transition font-semibold">Download full job description</a>
                        </p>
                    )}
                    {job.responsibilities && (
                        <div className="mb-4">
                            <h3 className="font-medium mb-2 text-gray-700 underline">Responsibilities</h3>
                            <ul className="list-disc pl-5 text-gray-900">
                                {job.responsibilities.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {job.requirements && (
                        <div>
                            <h3 className="font-medium mb-2 text-gray-700 underline">Qualifications</h3>
                            <ul className="list-disc pl-5 text-gray-900">
                                {job.requirements.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            <aside>
                <div className="sticky top-24">
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h4 className="font-medium mb-2">Apply for this role</h4>
                        <ApplicationForm jobSlug={job.slug} jobTitle={job.title} />
                    </div>
                </div>
            </aside>
            </div>
        </section>
    );
}

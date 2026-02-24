import { Lock } from "lucide-react";

export default function ResourcesCard() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Resources</h2>
        <button className="text-sm text-[#8A8F3C] hover:underline">
          View all
        </button>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-8">
        {/* Assessments */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-4">
            Assessments
          </p>

          <div className="space-y-4">
            <ResourceItem text="SOC2 Type 2 Report - October 2025" />
            <ResourceItem text="Penetration Test - 2025" />
          </div>
        </div>

        {/* Policies */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-4">
            Policies
          </p>

          <div className="space-y-4">
            <ResourceItem text="Access Control Policy" />
            <ResourceItem text="AI Benchmarking Policy" />
            <ResourceItem text="Asset Management Policy" />
            <ResourceItem text="Business Continuity and Disaster Recovery Plan" />
          </div>

          <button className="mt-4 text-sm text-[#8A8F3C] hover:underline">
            View 14 more
          </button>
        </div>

        {/* Other resources */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-4">
            Other resources
          </p>

          <ResourceItem text="Certificate of Insurance Engagement Letter" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Reusable Item Component */
/* ---------------------------------- */

function ResourceItem({ text }: { text: string }) {
  return (
    <div className="flex items-start justify-between group cursor-pointer">
      <p className="text-[#8A8F3C] text-sm leading-relaxed group-hover:underline max-w-[85%]">
        {text}
      </p>

      <Lock
        size={16}
        className="text-gray-400 mt-1 shrink-0"
      />
    </div>
  );
}
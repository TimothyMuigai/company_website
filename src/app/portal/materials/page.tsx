"use client";

import { motion } from "framer-motion";
import { Download, FileText, Video, Image, File } from "lucide-react";

type Material = {
  name: string;
  type: string;
  lastUpdated: string;
  icon: React.ElementType;
  color: string;
};

// Mock data
const MATERIALS: Material[] = [
  {
    name: "Deeptrack One-Pager",
    type: "PDF",
    lastUpdated: "2024-03-01",
    icon: FileText,
    color: "text-red-500",
  },
  {
    name: "Pitch Deck",
    type: "PDF",
    lastUpdated: "2024-02-28",
    icon: FileText,
    color: "text-red-500",
  },
  {
    name: "Demo Video",
    type: "MP4",
    lastUpdated: "2024-02-25",
    icon: Video,
    color: "text-blue-500",
  },
  {
    name: "Email Templates",
    type: "ZIP",
    lastUpdated: "2024-02-20",
    icon: File,
    color: "text-gray-500",
  },
  {
    name: "Brand Guidelines",
    type: "PDF",
    lastUpdated: "2024-02-15",
    icon: Image,
    color: "text-green-500",
  },
  {
    name: "Partner Agreement",
    type: "PDF",
    lastUpdated: "2024-02-10",
    icon: FileText,
    color: "text-red-500",
  },
  {
    name: "Case Study: VerifyNow",
    type: "PDF",
    lastUpdated: "2024-02-05",
    icon: FileText,
    color: "text-red-500",
  },
  {
    name: "Onboarding Guide",
    type: "PDF",
    lastUpdated: "2024-02-01",
    icon: FileText,
    color: "text-red-500",
  },
  {
    name: "Pricing Sheet",
    type: "XLSX",
    lastUpdated: "2024-01-30",
    icon: File,
    color: "text-green-500",
  },
];

function MaterialCard({ material, index }: { material: Material; index: number }) {
  const Icon = material.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="rounded-xl border border-border bg-background p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-muted/50 ${material.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[14px] font-medium text-foreground">{material.name}</h3>
            <p className="text-[12px] text-muted-foreground">{material.type}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-muted/50 rounded-md transition-colors">
          <Download className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="text-[11px] text-muted-foreground">
        Last updated: {material.lastUpdated}
      </div>
    </motion.div>
  );
}

export default function MaterialsPage() {
  return (
    <div className="px-6 py-6 max-w-[1000px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-[18px] font-medium text-foreground">Marketing Materials</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Download assets to support your sales efforts
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MATERIALS.map((material, i) => (
          <MaterialCard key={material.name} material={material} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 p-4 bg-muted/40 rounded-xl border border-border"
      >
        <h3 className="text-[14px] font-medium text-foreground mb-2">Download Instructions</h3>
        <ul className="text-[12px] text-muted-foreground space-y-1">
          <li>• Signed URLs expire after 1 hour for security</li>
          <li>• Files are hosted on secure cloud storage</li>
          <li>• Contact partnerships@deeptrack.io for additional materials</li>
        </ul>
      </motion.div>
    </div>
  );
}
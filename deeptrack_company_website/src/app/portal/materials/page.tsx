"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Download, FileText, Video, Image, File, Loader, AlertCircle } from "lucide-react";

type Material = {
  _id: string;
  name: string;
  fileType: string;
  updatedAt: number;
  fileUrl: string;
};

function getIconForType(type: string): React.ElementType {
  if (type.includes("pdf")) return FileText;
  if (type.includes("video") || type.includes("mp4")) return Video;
  if (type.includes("image") || type.includes("png") || type.includes("jpg")) return Image;
  return File;
}

function getColorForType(type: string): string {
  if (type.includes("pdf")) return "text-red-500";
  if (type.includes("video") || type.includes("mp4")) return "text-blue-500";
  if (type.includes("image")) return "text-green-500";
  return "text-gray-500";
}

function MaterialCard({ material, index }: { material: Material; index: number }) {
  const Icon = getIconForType(material.fileType);
  const color = getColorForType(material.fileType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="rounded-xl border border-border bg-background p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-muted/50 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[14px] font-medium text-foreground">{material.name}</h3>
            <p className="text-[12px] text-muted-foreground">{material.fileType}</p>
          </div>
        </div>
        <a
          href={material.fileUrl || "#"}
          className="p-2 hover:bg-muted/50 rounded-md transition-colors"
          download
        >
          <Download className="w-4 h-4 text-muted-foreground" />
        </a>
      </div>
      <div className="text-[11px] text-muted-foreground">
        {new Date(material.updatedAt).toLocaleDateString()}
      </div>
    </motion.div>
  );
}

export default function MaterialsPage() {
  const materials = useQuery(api.leads.getMaterials);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (materials !== undefined) {
      setIsLoading(false);
    }
  }, [materials]);

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
          Download resources to help you sell Deeptrack
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : !materials || materials.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/40 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No materials available yet</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {materials.map((material: Material, i: number) => (
              <MaterialCard key={material._id} material={material} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="p-4 bg-muted/40 rounded-xl border border-border"
          >
            <h3 className="text-[14px] font-medium text-foreground mb-2">Download Instructions</h3>
            <ul className="text-[12px] text-muted-foreground space-y-1">
              <li>• Signed URLs expire after 1 hour for security</li>
              <li>• Files are hosted on secure cloud storage</li>
              <li>• Contact partnerships@deeptrack.io for additional materials</li>
            </ul>
          </motion.div>
        </>
      )}
    </div>
  );
}
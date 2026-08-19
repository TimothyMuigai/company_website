"use client";

type AlertProps = {
  type?: "error" | "success" | "info";
  children: React.ReactNode;
};

const colorStyles = {
  error: "bg-rose-50 border-rose-200 text-rose-700",
  success: "bg-emerald-50 border-emerald-200 text-emerald-700",
  info: "bg-sky-50 border-sky-200 text-sky-700",
};

export default function Alert({ type = "info", children }: AlertProps) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-sm font-medium ${colorStyles[type]}`}
      role="alert"
    >
      {children}
    </div>
  );
}

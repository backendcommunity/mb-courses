"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

export function CurriculumModal({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[82vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close curriculum"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-[18px] font-bold text-[#0B152A] mb-1">{title}</h3>
        {subtitle && <p className="text-slate-500 text-[13px] mb-6">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

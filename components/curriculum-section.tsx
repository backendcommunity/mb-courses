"use client";

import { useState, type ReactNode } from "react";
import { CurriculumModal } from "@/components/curriculum-modal";

export function CurriculumSection({
  heading,
  meta,
  modalSubtitle,
  children,
}: {
  heading: string;
  meta: string;
  modalSubtitle?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">{heading}</h3>
        <p className="text-sm text-slate-500 mt-1">{meta}</p>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#f4f6f8] border border-[#0B152A] text-[#0B152A] font-bold px-6 py-2.5 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap"
      >
        View Full Curriculum
      </button>
      <CurriculumModal
        open={open}
        onClose={() => setOpen(false)}
        title={heading}
        subtitle={modalSubtitle}
      >
        {children}
      </CurriculumModal>
    </div>
  );
}

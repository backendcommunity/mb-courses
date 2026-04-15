"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DescriptionSectionProps {
  fullText: string;
  previewChars?: number;
}

export function DescriptionSection({
  fullText,
  previewChars = 420,
}: DescriptionSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = fullText.length > previewChars;
  const preview = fullText.slice(0, previewChars).trimEnd();

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Course Description
      </h2>

      <div className="relative">
        <article
          className="text-sm text-slate-600 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: !expanded && needsTruncation ? preview : fullText,
          }}
        />

        {/* Fade-out mask when collapsed */}
        {!expanded && needsTruncation && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#f8fafc] to-transparent pointer-events-none" />
        )}
      </div>

      {needsTruncation && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex items-center gap-1.5 text-[#13AECE] text-[13px] font-bold hover:text-[#0f8b9e] transition-colors"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

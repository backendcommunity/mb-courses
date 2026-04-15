"use client";

import { Award, Calendar } from "lucide-react";

interface CertificatePreviewProps {
  courseTitle: string;
}

/**
 * Static, non-interactive certificate preview for the landing page.
 * Mirrors the real Certificate component's visual design without any
 * download / share functionality.
 */
export function CertificatePreview({ courseTitle }: CertificatePreviewProps) {
  return (
    /*
     * Outer wrapper: we render the certificate at a fixed "design" width of
     * 640 px, then scale it down with CSS transform so it always fits the
     * container without reflowing text.
     */
    <div className="w-full aspect-[4/3] overflow-hidden rounded-xl relative">
      {/* Scale anchor — the inner div is 640 px wide; we scale it to 50% */}
      <div
        className="origin-top-left absolute inset-0"
        style={{ transform: "scale(0.5)", width: "200%", height: "200%" }}
      >
        <div
          className="w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200 rounded-xl overflow-hidden flex flex-col"
          style={{ fontFamily: "inherit" }}
        >
          {/* Top colour bar */}
          <div className="h-2 w-full bg-gradient-to-r from-[#0e2036] to-[#13AECE] shrink-0" />

          {/* Verified badge */}
          <div className="flex justify-end px-6 pt-4 shrink-0">
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 border border-green-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              <Award className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>

          {/* Main body */}
          <div className="flex-1 flex flex-col items-center justify-center px-10 text-center gap-4">
            {/* Logo + brand name */}
            <div className="flex flex-col items-center gap-1">
              <img
                src="/logo.png"
                alt="MasteringBackend"
                className="h-10 w-auto object-contain"
              />
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                Masteringbackend
              </span>
            </div>

            <p className="text-sm text-gray-500 -mt-2">
              Certificate of Completion
            </p>

            {/* Body copy */}
            <div className="space-y-2 mt-2">
              <p className="text-xs text-gray-600">This is to certify that</p>
              <p className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 inline-block px-4">
                Your Name
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-600">
                has successfully completed the course
              </p>
              <p className="text-base font-semibold text-[#13AECE] max-w-xs leading-snug">
                {courseTitle}
              </p>
            </div>

            {/* Meta row */}
            <div className="grid grid-cols-3 gap-4 w-full mt-3 pt-3 border-t border-gray-100">
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">
                  Date
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-gray-500" />
                  <span className="text-[10px] font-semibold text-gray-800">
                    Apr 2026
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">
                  Instructor
                </p>
                <span className="text-[10px] font-semibold text-gray-800">
                  MB Team
                </span>
              </div>
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">
                  Certificate ID
                </p>
                <span className="text-[10px] font-mono text-gray-600">
                  MB-{Math.random().toString(36).slice(2, 8).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 py-4 border-t border-gray-200 flex items-center justify-between shrink-0">
            <div>
              <div className="w-20 h-px bg-gray-400 mb-1" />
              <p className="text-[9px] text-gray-500">Instructor Signature</p>
              <p className="text-[10px] font-medium text-gray-800">MB Team</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-7 h-7 text-yellow-500 mb-1" />
              <p className="text-[8px] text-gray-400">Verified by Masteringbackend</p>
            </div>
            <div className="text-right">
              <div className="w-20 h-px bg-gray-400 mb-1 ml-auto" />
              <p className="text-[9px] text-gray-500">Platform Authority</p>
              <p className="text-[10px] font-medium text-gray-800">
                masteringbackend.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

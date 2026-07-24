"use client";

import { useRef } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/testimonials";

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    const firstCard = scroller?.firstElementChild as HTMLElement | undefined;
    // Measure the actual rendered card width (varies by breakpoint — full
    // width on mobile, ~half on tablet, ~third on desktop) instead of a
    // fixed pixel guess, so one click reliably advances by one card.
    const cardWidth = firstCard?.getBoundingClientRect().width ?? scroller?.clientWidth ?? 0;
    const gap = 16; // matches the track's gap-4
    scroller?.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="py-16 px-4 bg-[#F6F6F6]">
      <div className="container mx-auto max-w-[1100px]">
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2"
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] bg-white p-8 rounded-3xl border border-slate-100 flex flex-col"
              >
                <Quote className="w-6 h-6 text-slate-300 mb-4" />
                <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="font-bold text-[#0B152A] text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {testimonials.length > 3 && (
            <>
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous testimonials"
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#0B152A]" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next testimonials"
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#0B152A]" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

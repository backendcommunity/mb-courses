import React from "react";
import { testimonials } from "@/lib/testimonials";

export default function Testimonials() {
  return (
    <section className="py-12 px-4 bg-[#F6F6F6]">
      <div className="container mx-auto max-w-[1100px]">
        <div className="mb-8">
          <h2 className="text-[2.5rem] md:text-[3.25rem] tracking-tight font-bold text-[#0B152A] leading-[1.1]">
            Real Students.
            <br />
            Real Success Stories.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#0B152A] text-lg">
                    {t.name}
                  </span>
                  <span className="text-sm text-slate-500">{t.role}</span>
                </div>
              </div>
              <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

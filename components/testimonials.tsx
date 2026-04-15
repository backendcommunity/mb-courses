import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                <img
                  src="/face.png"
                  alt="Lyle Christine"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#0B152A] text-lg">
                  Lyle Christine
                </span>
                <span className="text-sm text-slate-500">
                  A Happy Student from Scotland
                </span>
              </div>
            </div>
            <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1">
              "I truly appreciate the high-quality material in this course. The
              structured lessons, hands-on projects, and clear explanations make
              learning a great experience. I look forward to future additions
              and updates! Thanks for your polite and friendly attitude."
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                <img
                  src="/daniel2.jpg"
                  alt="Daniel Tinivella"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#0B152A] text-lg">
                  Daniel Tinivella
                </span>
                <span className="text-sm text-slate-500">
                  Software Engineer, Globant
                </span>
              </div>
            </div>
            <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1">
              "The practical examples and hands-on exercises were particularly
              beneficial. They not only reinforced the theoretical concepts but
              also allowed me to apply them in real-world scenarios. The
              inclusion of best practices and common pitfalls added a practical
              dimension to the learning process."
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                <img
                  src="/eshan3.jpeg"
                  alt="Eshan Shafeeq"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#0B152A] text-lg">
                  Eshan Shafeeq
                </span>
                <span className="text-sm text-slate-500">
                  Blockchain & Web3 Engineer, Cake Defi
                </span>
              </div>
            </div>
            <p className="text-[#0B152A]/80 leading-relaxed text-[15px] flex-1">
              "The course is an excellent resource for beginners. Your
              explanations of the basics are clear, making it easy for newcomers
              to grasp. I particularly enjoyed the task management application;
              it's a practical example that helps solidify the concepts."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQ) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className="text-[17px] font-semibold text-[#0B152A] pr-8 group-hover:text-[#13AECE] transition-colors">
          {question}
        </span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-[#A855F7] flex-shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-[#A855F7] flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-slate-600 leading-relaxed text-[15px] pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="py-24 px-4 bg-[#F6F6F6]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#0B152A]">
            FAQs
          </h2>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 px-6 sm:px-10 py-2">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { isCredibleLearnerCount, formatLearnerCount } from "@/lib/social-proof";
import { HeroTestimonial } from "@/components/hero-testimonial";

export function TrustStrip({ studentCount }: { studentCount?: number | null }) {
  const credible = isCredibleLearnerCount(studentCount ?? 0);

  return (
    <section className="relative z-10 border-t border-white/5 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
          <div>
            {credible && (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-white">
                  {formatLearnerCount(studentCount!)}
                </span>
                <span className="text-slate-400 text-sm">developers already enrolled</span>
              </div>
            )}
            <p className="text-slate-400 text-sm">
              Loved by learners at thousands of companies
            </p>
          </div>
          <HeroTestimonial />
        </div>
        <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-40 grayscale">
          <div className="text-xl font-bold">Razorpay</div>
          <div className="text-xl font-bold">Salesforce</div>
          <div className="text-xl font-black tracking-widest">Amazon</div>
          <div className="text-xl font-bold">Protocloud</div>
          <div className="text-xl font-bold">SentinelOne</div>
        </div>
      </div>
    </section>
  );
}

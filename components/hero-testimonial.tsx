import { testimonials } from "@/lib/testimonials";

export function HeroTestimonial() {
  const testimonial = testimonials[0];

  return (
    <div className="flex items-start gap-3 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 max-w-lg">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 shrink-0">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="text-slate-200 text-[14px] leading-snug italic">
          "{testimonial.quote}"
        </p>
        <p className="text-slate-400 text-xs mt-2">
          <span className="font-semibold text-white">{testimonial.name}</span>
          {" — "}
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

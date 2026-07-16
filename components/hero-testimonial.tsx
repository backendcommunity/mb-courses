import { testimonials } from "@/lib/testimonials";

export function HeroTestimonial() {
  const testimonial = testimonials[0];

  return (
    <div className="flex items-start gap-3 max-w-md">
      <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-700 shrink-0">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="text-slate-300 text-[13px] leading-snug italic">
          "{testimonial.quote}"
        </p>
        <p className="text-slate-500 text-xs mt-1.5">
          <span className="font-semibold text-slate-400">
            {testimonial.name}
          </span>
          {" — "}
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

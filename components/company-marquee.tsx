export interface MarqueeCompany {
  name: string;
  /** Brand color for this name. Omit to use the default neutral slate. */
  color?: string;
}

export function CompanyMarquee({
  label,
  companies,
}: {
  label: string;
  companies: MarqueeCompany[];
}) {
  if (companies.length === 0) return null;

  const items = [...companies, ...companies];

  return (
    <div className="py-6 px-4 bg-white border-y border-slate-100">
      <div className="container mx-auto max-w-[1100px]">
      <p className="text-center text-xs font-semibold tracking-wide uppercase text-slate-500 mb-4">
        {label}
      </p>
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-12">
          {items.map((company, i) => (
            <span
              key={`${company.name}-${i}`}
              className="text-lg font-bold tracking-tight whitespace-nowrap text-slate-600"
              style={company.color ? { color: company.color } : undefined}
            >
              {company.name}
            </span>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

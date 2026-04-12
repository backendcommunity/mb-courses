interface Theme {
  from: string;
  to: string;
  accent: string;
  label: string;
  lines: string[];
}

function getTheme(title: string): Theme {
  const t = title?.toLowerCase() ?? "";

  if (t.includes("ai") || t.includes("machine") || t.includes("ml"))
    return {
      from: "#1a0533",
      to: "#2d1b69",
      accent: "#a78bfa",
      label: "AI",
      lines: ["model.fit(X_train, y_train)", "pred = model.predict(X)", "accuracy: 97.4%"],
    };

  if (t.includes("cloud"))
    return {
      from: "#0c1f3d",
      to: "#0e3a5c",
      accent: "#38bdf8",
      label: "Cloud",
      lines: ["aws ec2 run-instances", "kubectl apply -f app.yml", "auto-scaling: enabled"],
    };

  if (t.includes("devops") || t.includes("platform"))
    return {
      from: "#1a1200",
      to: "#2d1f00",
      accent: "#fb923c",
      label: "DevOps",
      lines: ["docker build -t app .", "CI/CD pipeline: passed ✓", "deploy → production"],
    };

  if (t.includes("security") || t.includes("cyber"))
    return {
      from: "#1a0010",
      to: "#2d0020",
      accent: "#f43f5e",
      label: "Security",
      lines: ["nmap -sV 192.168.1.0/24", "TLS 1.3 handshake: OK", "0 vulnerabilities found"],
    };

  if (t.includes("blockchain") || t.includes("web3"))
    return {
      from: "#0f1a00",
      to: "#1a2e00",
      accent: "#a3e635",
      label: "Blockchain",
      lines: ["contract.deploy()", "block #18,493,021", "gas: 21,000 gwei"],
    };

  if (t.includes("data"))
    return {
      from: "#001a1a",
      to: "#002d2d",
      accent: "#2dd4bf",
      label: "Data",
      lines: ["SELECT * FROM events", "pipeline.run(batch=1k)", "p99 latency: 12ms"],
    };

  if (t.includes("product") || t.includes("frontend") || t.includes("full"))
    return {
      from: "#1a0033",
      to: "#2d0052",
      accent: "#e879f9",
      label: "Product",
      lines: ["const [data] = useQuery()", "render: 18ms  FCP: 0.9s", "lighthouse: 98 ✓"],
    };

  // Default — backend
  return {
    from: "#071629",
    to: "#0e2036",
    accent: "#13AECE",
    label: "Backend",
    lines: ["GET /api/courses  200 12ms", "POST /auth/login  201  8ms", "db.query() → 42 rows"],
  };
}

interface RoadmapBannerProps {
  title: string;
  isWaiting?: boolean;
  isPremium?: boolean;
}

export function RoadmapBanner({ title, isWaiting, isPremium }: RoadmapBannerProps) {
  const theme = getTheme(title);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme.accent}22 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: 0.6,
        }}
      />

      {/* Diagonal stripe accent */}
      <div
        className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
        style={{ background: theme.accent }}
      />
      <div
        className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full opacity-[0.07]"
        style={{ background: theme.accent }}
      />

      {/* Terminal lines */}
      <div className="absolute inset-0 flex flex-col justify-center px-5 gap-1.5">
        {/* Mini terminal window */}
        <div className="rounded-lg overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm max-w-[88%]">
          {/* Window bar */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.05] border-b border-white/[0.08]">
            <span className="w-2 h-2 rounded-full bg-red-400/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
            <span className="w-2 h-2 rounded-full bg-green-400/60" />
            <span
              className="ml-2 text-[9px] font-mono"
              style={{ color: theme.accent + "99" }}
            >
              {theme.label.toLowerCase()}.sh
            </span>
          </div>
          {/* Code lines */}
          <div className="px-3 py-2 space-y-1">
            {theme.lines.map((line, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="text-[9px] font-mono shrink-0"
                  style={{ color: theme.accent }}
                >
                  {i === 0 ? "$" : " "}
                </span>
                <span className="text-[9px] font-mono text-white/70 truncate">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Large faint label watermark */}
      <div
        className="absolute bottom-2 right-3 text-[42px] font-black leading-none select-none pointer-events-none opacity-[0.06]"
        style={{ color: theme.accent }}
      >
        {theme.label}
      </div>

      {/* Badges */}
      {isPremium && (
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-md bg-[#A855F7] text-white text-[10px] font-bold tracking-wide uppercase">
            Premium
          </span>
        </div>
      )}
      {isWaiting && (
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-md bg-amber-500 text-white text-[10px] font-bold tracking-wide uppercase">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );
}

export function HeroIllustration() {
  return (
    <div className="relative w-full h-full select-none">
      {/* ── Main editor window ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0B1120] shadow-2xl flex flex-col">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1526] border-b border-white/[0.06] shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-[11px] text-slate-500 font-mono">
            server.ts — MasteringBackend
          </span>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 px-3 pt-2 bg-[#0d1526] border-b border-white/[0.06] shrink-0">
          <div className="px-3 py-1.5 rounded-t bg-[#0B1120] border border-white/[0.08] border-b-transparent text-[11px] text-slate-300 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#13AECE]" />
            server.ts
          </div>
          <div className="px-3 py-1.5 text-[11px] text-slate-600 font-mono">
            db.ts
          </div>
          <div className="px-3 py-1.5 text-[11px] text-slate-600 font-mono">
            auth.ts
          </div>
        </div>

        {/* Code body */}
        <div className="flex-1 overflow-hidden flex">
          {/* Line numbers */}
          <div className="px-3 pt-4 text-right text-slate-700 font-mono text-[11px] leading-[1.75] select-none shrink-0">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code */}
          <div className="flex-1 pt-4 pr-4 overflow-hidden font-mono text-[11px] leading-[1.75]">
            <div>
              <span className="text-[#7B9BD0]">import</span>
              <span className="text-slate-300"> {"{"} express {"}"} </span>
              <span className="text-[#7B9BD0]">from</span>
              <span className="text-[#98D4E3]"> &apos;express&apos;</span>
            </div>
            <div>
              <span className="text-[#7B9BD0]">import</span>
              <span className="text-slate-300"> {"{"} db {"}"} </span>
              <span className="text-[#7B9BD0]">from</span>
              <span className="text-[#98D4E3]"> &apos;./db&apos;</span>
            </div>
            <div className="text-transparent">.</div>
            <div>
              <span className="text-[#7B9BD0]">const</span>
              <span className="text-[#13AECE]"> app</span>
              <span className="text-slate-400"> = express()</span>
            </div>
            <div className="text-transparent">.</div>
            <div>
              <span className="text-slate-500">{"// GET /api/courses"}</span>
            </div>
            <div>
              <span className="text-[#13AECE]">app</span>
              <span className="text-slate-300">.get(</span>
              <span className="text-[#98D4E3]">&apos;/api/courses&apos;</span>
              <span className="text-slate-300">, </span>
              <span className="text-[#7B9BD0]">async</span>
              <span className="text-slate-300"> (req, res) {"=>"} {"{"}</span>
            </div>
            <div>
              <span className="text-slate-300">&nbsp;&nbsp;</span>
              <span className="text-[#7B9BD0]">const</span>
              <span className="text-slate-300"> courses </span>
              <span className="text-slate-400">=</span>
              <span className="text-[#7B9BD0]"> await</span>
              <span className="text-slate-300"> db.query(</span>
            </div>
            <div>
              <span className="text-[#98D4E3]">
                &nbsp;&nbsp;&nbsp;&nbsp;&apos;SELECT * FROM courses&apos;
              </span>
            </div>
            <div>
              <span className="text-slate-300">&nbsp;&nbsp;)</span>
            </div>
            <div>
              <span className="text-slate-300">&nbsp;&nbsp;res.json({"{"}</span>
            </div>
            <div>
              <span className="text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;status: </span>
              <span className="text-[#98D4E3]">&apos;success&apos;</span>
              <span className="text-slate-300">,</span>
            </div>
            <div>
              <span className="text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;data: courses,</span>
            </div>
            <div>
              <span className="text-slate-300">&nbsp;&nbsp;{"}"})</span>
            </div>
            <div>
              <span className="text-slate-300">{"}"})</span>
            </div>
            <div className="text-transparent">.</div>
            <div>
              <span className="text-[#13AECE]">app</span>
              <span className="text-slate-300">.listen(</span>
              <span className="text-[#98D4E3]">3000</span>
              <span className="text-slate-300">)</span>
            </div>
          </div>
        </div>

        {/* Terminal panel */}
        <div className="shrink-0 border-t border-white/[0.06] bg-[#080f1e]">
          <div className="flex items-center gap-3 px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Terminal
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
          <div className="px-4 py-2 font-mono text-[10px] space-y-0.5">
            <div>
              <span className="text-[#13AECE]">$ </span>
              <span className="text-slate-400">npm run dev</span>
            </div>
            <div className="text-green-400">✓ Server running on port 3000</div>
            <div className="text-slate-500">
              GET /api/courses{" "}
              <span className="text-green-400">200</span>{" "}
              <span className="text-slate-600">12ms</span>
            </div>
            <div className="text-slate-500">
              POST /api/enroll{" "}
              <span className="text-green-400">201</span>{" "}
              <span className="text-slate-600">8ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating badge: API response ───────────────────────────────────── */}
      <div className="absolute -right-4 top-8 bg-[#0d2240] border border-[#13AECE]/30 rounded-xl px-3 py-2 shadow-lg shadow-black/40 hidden lg:block">
        <div className="text-[9px] font-bold text-[#13AECE] uppercase tracking-widest mb-1.5">
          Response
        </div>
        <div className="font-mono text-[9px] space-y-0.5 text-slate-400">
          <div>
            <span className="text-slate-500">{`{`}</span>
          </div>
          <div>
            &nbsp;&nbsp;<span className="text-[#98D4E3]">&quot;status&quot;</span>
            <span className="text-slate-500">: </span>
            <span className="text-green-400">&quot;success&quot;</span>
            <span className="text-slate-500">,</span>
          </div>
          <div>
            &nbsp;&nbsp;<span className="text-[#98D4E3]">&quot;count&quot;</span>
            <span className="text-slate-500">: </span>
            <span className="text-orange-300">42</span>
          </div>
          <div>
            <span className="text-slate-500">{`}`}</span>
          </div>
        </div>
      </div>

      {/* ── Floating badge: stack pills ────────────────────────────────────── */}
      <div className="absolute -left-4 bottom-20 flex flex-col gap-2 hidden lg:flex">
        {[
          { label: "Node.js", color: "bg-green-500/15 text-green-400 border-green-500/20" },
          { label: "PostgreSQL", color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
          { label: "Docker", color: "bg-sky-500/15 text-sky-400 border-sky-500/20" },
        ].map(({ label, color }) => (
          <div
            key={label}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${color} shadow-lg backdrop-blur-sm`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* ── Floating badge: progress card ──────────────────────────────────── */}
      <div className="absolute -bottom-4 right-6 bg-[#0d2240] border border-white/10 rounded-xl px-4 py-3 shadow-xl shadow-black/40 hidden lg:block">
        <div className="text-[9px] text-slate-500 mb-1">Course progress</div>
        <div className="flex items-center gap-3">
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[68%] bg-[#13AECE] rounded-full" />
          </div>
          <span className="text-[11px] font-bold text-[#13AECE]">68%</span>
        </div>
        <div className="text-[9px] text-slate-500 mt-1">
          Backend Engineering Path
        </div>
      </div>
    </div>
  );
}

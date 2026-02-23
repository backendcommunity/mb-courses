"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Cloud, Layers, Brain } from "lucide-react";
import type { PortfolioSkill, SkillDomain } from "@/lib/portfolio-types";

interface PortfolioTechStackProps {
  skills: PortfolioSkill[];
}

const DOMAIN_ICONS: Record<SkillDomain, React.ReactNode> = {
  Languages: <Code2 className="h-3.5 w-3.5" />,
  Databases: <Database className="h-3.5 w-3.5" />,
  Infrastructure: <Cloud className="h-3.5 w-3.5" />,
  Patterns: <Layers className="h-3.5 w-3.5" />,
  "AI/ML": <Brain className="h-3.5 w-3.5" />,
};

const DOMAIN_ORDER: SkillDomain[] = [
  "Languages",
  "Databases",
  "Infrastructure",
  "Patterns",
  "AI/ML",
];

export function PortfolioTechStack({ skills }: PortfolioTechStackProps) {
  const grouped = useMemo(() => {
    const map: Partial<Record<SkillDomain, PortfolioSkill[]>> = {};
    for (const skill of skills) {
      if (!map[skill.domain]) map[skill.domain] = [];
      map[skill.domain]!.push(skill);
    }
    return map;
  }, [skills]);

  const totalProjects = useMemo(
    () => Math.max(...skills.map((s) => s.maxProjectCount), 1),
    [skills],
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Tech Stack</CardTitle>
          <span className="text-xs text-muted-foreground">
            Across {totalProjects} projects
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {DOMAIN_ORDER.map((domain) => {
          const domainSkills = grouped[domain];
          if (!domainSkills?.length) return null;

          return (
            <div key={domain} className="space-y-2.5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                {DOMAIN_ICONS[domain]}
                {domain}
              </h3>
              <div className="space-y-2">
                {domainSkills.map((skill) => {
                  const pct =
                    skill.maxProjectCount > 0
                      ? (skill.projectCount / skill.maxProjectCount) * 100
                      : 0;
                  return (
                    <div key={skill.name} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-28 truncate">
                        {skill.name}
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground text-right tabular-nums whitespace-nowrap">
                        {[
                          `${skill.projectCount} proj`,
                          skill.coursesCompleted
                            ? `${skill.coursesCompleted} course${skill.coursesCompleted > 1 ? "s" : ""}`
                            : null,
                          skill.quizAvgScore
                            ? `${skill.quizAvgScore}%`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

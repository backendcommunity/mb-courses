"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, ExternalLink } from "lucide-react";
import type {
  PortfolioCertificate,
  PortfolioRoadmap,
} from "@/lib/portfolio-types";

interface PortfolioCertificationsProps {
  certificates: PortfolioCertificate[];
  roadmaps: PortfolioRoadmap[];
}

export function PortfolioCertifications({
  certificates,
  roadmaps,
}: PortfolioCertificationsProps) {
  if (!certificates.length && !roadmaps.length) return null;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Certifications & Paths</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Certificates */}
        {certificates.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Certificates
            </h4>
            <div className="space-y-2.5">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">
                        {cert.courseName}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Score: {cert.finalScore}%{" "}
                        <span className="mx-1">&middot;</span>
                        {new Date(cert.date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  {cert.verifyUrl && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      asChild
                    >
                      <a
                        href={
                          cert.verifyUrl.startsWith("/")
                            ? `https://masteringbackend.com${cert.verifyUrl}`
                            : cert.verifyUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Paths */}
        {roadmaps.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Learning Paths
            </h4>
            <div className="space-y-4">
              {roadmaps.map((roadmap) => (
                <div key={roadmap.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium truncate">{roadmap.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums shrink-0 ml-2">
                      {roadmap.topicsCompleted}/{roadmap.topicsTotal}
                    </span>
                  </div>
                  <Progress value={roadmap.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

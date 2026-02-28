"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface EmptyStateCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryCTA?: {
    label: string;
    onClick: () => void;
  };
  secondaryCTA?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export function EmptyStateCard({
  icon: Icon,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  children,
}: EmptyStateCardProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold">{title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>

      {/* Custom content */}
      {children}

      {/* CTAs */}
      <div className="flex gap-2 flex-wrap justify-center">
        {primaryCTA && (
          <Button onClick={primaryCTA.onClick} size="sm">
            {primaryCTA.label}
          </Button>
        )}
        {secondaryCTA && (
          <Button 
            onClick={secondaryCTA.onClick} 
            variant="outline" 
            size="sm"
          >
            {secondaryCTA.label}
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { Zap, Target, Award } from "lucide-react";
import { OnboardingProgress } from "./onboarding-progress";

interface OnboardingWelcomeProps {
  firstName: string;
  onContinue: () => void;
  onSkip: () => void;
}

export function OnboardingWelcome({
  firstName,
  onContinue,
  onSkip,
}: OnboardingWelcomeProps) {
  return (
    <div className="text-center">
      <OnboardingProgress currentStep={0} />

      {/* Icon Badge */}
      <div
        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
        style={{ background: "rgba(19, 174, 206, 0.1)" }}
      >
        <Zap className="w-8 h-8" style={{ color: "#13AECE" }} />
      </div>

      <h1
        className="font-extrabold mb-4"
        style={{ fontSize: 28, color: "#FFFFFF" }}
      >
        Welcome to Masteringbackend, {firstName}!
      </h1>

      <p className="mb-6" style={{ fontSize: 14, color: "#9CA3AF" }}>
        Let&apos;s build your personalized learning path. This takes about 60 seconds.
      </p>

      {/* Gamification Benefits */}
      <div className="space-y-3 mb-8">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg"
          style={{ background: "rgba(19, 174, 206, 0.05)" }}
        >
          <Target className="w-5 h-5" style={{ color: "#13AECE" }} />
          <span style={{ fontSize: 13, color: "#D1D5DB" }}>
            Personalized path matching your goals
          </span>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg"
          style={{ background: "rgba(34, 197, 94, 0.05)" }}
        >
          <Award className="w-5 h-5" style={{ color: "#22c55e" }} />
          <span style={{ fontSize: 13, color: "#D1D5DB" }}>
            Earn rewards as you progress
          </span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="font-semibold rounded-lg transition-all w-full py-3"
        style={{
          background: "#13AECE",
          color: "#FFFFFF",
          fontSize: 15,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.filter = "brightness(1.1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.filter = "brightness(1)")
        }
      >
        Start Your Journey &rarr;
      </button>

      <button
        onClick={onSkip}
        className="block mx-auto mt-4 text-sm transition-colors"
        style={{ color: "#6B7280" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#9CA3AF")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
      >
        Skip for now
      </button>
    </div>
  );
}

"use client";

import { OnboardingFlow } from "@/components/pages/onboarding-flow";

export default function OnboardingPage() {
  return <OnboardingFlow />;
}

// This page does NOT use DashboardLayout.
// It renders full-screen with its own dark background.
// No sidebar, no header, no navigation.

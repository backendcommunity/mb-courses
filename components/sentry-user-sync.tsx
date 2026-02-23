"use client";

/**
 * Sentry User Sync Component
 * Automatically syncs authenticated user with Sentry for error tracking
 * Place this at the top level of your app (e.g., inside a layout or wrapper)
 */

import { useSentryUser } from "@/hooks/use-sentry-user";
import React from "react";

export function SentryUserSync({ children }: { children: React.ReactNode }) {
  // This hook automatically syncs the current user with Sentry
  // It updates whenever the user changes (login/logout)
  useSentryUser();

  return <>{children}</>;
}

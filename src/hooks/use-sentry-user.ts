/**
 * Hook to sync authenticated user with Sentry context
 * Automatically called after user login/signup
 * Clears on logout
 */

import { useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import * as Sentry from "@sentry/nextjs";

export function useSentryUser() {
  const user = useUser();

  useEffect(() => {
    if (user?.id) {
      // Set user context when authenticated
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.name,
      });

      // Add breadcrumb for user activity
      Sentry.addBreadcrumb({
        category: "auth",
        message: `User logged in: ${user.email}`,
        level: "info",
      });
    } else {
      // Clear user context on logout
      Sentry.setUser(null);
    }
  }, [user?.id, user?.email, user?.name]);
}

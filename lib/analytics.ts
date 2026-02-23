/**
 * Analytics module for Segment integration
 * Currently a stub that safely no-ops analytics calls
 * When Segment is properly configured, replace with actual implementation
 */

export const analytics = {
  /**
   * Track analytics events (stub implementation)
   * @param eventName - Name of the event to track
   * @param properties - Event properties/context
   */
  track: (eventName: string, properties?: Record<string, any>) => {
    // Safe no-op that won't error if analytics service isn't available
    try {
      // In development, you could log to console:
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] ${eventName}`, properties);
      }

      // When Segment is integrated, this should call:
      // window.analytics?.track(eventName, properties);
    } catch (error) {
      // Silently ignore any analytics errors
      console.warn(`Analytics tracking failed: ${eventName}`, error);
    }
  },

  /**
   * Identify user for analytics
   * @param userId - Unique user identifier
   * @param traits - User traits/properties
   */
  identify: (userId: string, traits?: Record<string, any>) => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Identify`, { userId, traits });
      }
      // window.analytics?.identify(userId, traits);
    } catch (error) {
      console.warn(`Analytics identify failed: ${userId}`, error);
    }
  },

  /**
   * Page tracking
   * @param name - Page name
   * @param properties - Page properties
   */
  page: (name: string, properties?: Record<string, any>) => {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Page`, { name, properties });
      }
      // window.analytics?.page(name, properties);
    } catch (error) {
      console.warn(`Analytics page tracking failed: ${name}`, error);
    }
  },
};

export default analytics;

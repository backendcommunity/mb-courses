# Page snapshot

```yaml
- generic [ref=e1]:
  - region "Notifications alt+T"
  - generic [ref=e4]:
    - 'progressbar "Step 4 of 4: Time" [ref=e5]':
      - generic "Welcome" [ref=e6]
      - generic "Experience" [ref=e7]
      - generic "Goal" [ref=e8]
      - generic "Time" [ref=e9]
    - heading "How much time can you invest each week?" [level=1] [ref=e10]
    - paragraph [ref=e11]: No pressure — we'll adjust your pace to match your schedule.
    - generic [ref=e12]:
      - button "🕐 1–3 hours Casual pace. Perfect for exploring." [ref=e13] [cursor=pointer]:
        - generic [ref=e14]: 🕐
        - generic [ref=e15]: 1–3 hours
        - generic [ref=e16]: Casual pace. Perfect for exploring.
      - button "🕐🕐 3–7 hours Steady progress. Great for building skills." [pressed] [ref=e17] [cursor=pointer]:
        - generic [ref=e18]: 🕐🕐
        - generic [ref=e19]: 3–7 hours
        - generic [ref=e20]: Steady progress. Great for building skills.
      - button "🔥 7+ hours Intensive mode. Maximum growth." [ref=e21] [cursor=pointer]:
        - generic [ref=e22]: 🔥
        - generic [ref=e23]: 7+ hours
        - generic [ref=e24]: Intensive mode. Maximum growth.
    - generic [ref=e25]:
      - button "← Back" [ref=e26] [cursor=pointer]
      - button "See My Learning Path →" [active] [ref=e27] [cursor=pointer]
    - button "Skip for now" [ref=e28] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e34] [cursor=pointer]:
    - img [ref=e35]
  - alert [ref=e39]
```
# Page snapshot

```yaml
- generic [ref=e1]:
  - region "Notifications alt+T":
    - list:
      - listitem [ref=e2]:
        - img [ref=e4]
        - generic [ref=e7]: Something went wrong. Let's try again.
  - generic [ref=e10]:
    - 'progressbar "Step 4 of 4: Time" [ref=e11]':
      - generic "Welcome" [ref=e12]
      - generic "Experience" [ref=e13]
      - generic "Goal" [ref=e14]
      - generic "Time" [ref=e15]
    - heading "How much time can you invest each week?" [level=1] [ref=e16]
    - paragraph [ref=e17]: No pressure — we'll adjust your pace to match your schedule.
    - generic [ref=e18]:
      - button "🕐 1–3 hours Casual pace. Perfect for exploring." [ref=e19] [cursor=pointer]:
        - generic [ref=e20]: 🕐
        - generic [ref=e21]: 1–3 hours
        - generic [ref=e22]: Casual pace. Perfect for exploring.
      - button "🕐🕐 3–7 hours Steady progress. Great for building skills." [pressed] [ref=e23] [cursor=pointer]:
        - generic [ref=e24]: 🕐🕐
        - generic [ref=e25]: 3–7 hours
        - generic [ref=e26]: Steady progress. Great for building skills.
      - button "🔥 7+ hours Intensive mode. Maximum growth." [ref=e27] [cursor=pointer]:
        - generic [ref=e28]: 🔥
        - generic [ref=e29]: 7+ hours
        - generic [ref=e30]: Intensive mode. Maximum growth.
    - generic [ref=e31]:
      - button "← Back" [ref=e32] [cursor=pointer]
      - button "See My Learning Path →" [active] [ref=e33] [cursor=pointer]
    - button "Skip for now" [ref=e34] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e40] [cursor=pointer]:
    - img [ref=e41]
  - alert [ref=e44]
```
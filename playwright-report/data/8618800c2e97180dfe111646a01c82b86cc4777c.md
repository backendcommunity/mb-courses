# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - region "Notifications alt+T"
  - generic [ref=e4]:
    - 'progressbar "Step 2 of 4: Experience" [ref=e5]':
      - generic "Welcome" [ref=e6]
      - generic "Experience" [ref=e7]
      - generic "Goal" [ref=e8]
      - generic "Time" [ref=e9]
    - heading "Where are you in your backend journey?" [level=1] [ref=e10]
    - paragraph [ref=e11]: This helps us recommend the right starting point.
    - generic [ref=e12]:
      - button "🌱 Just Getting Started I'm new to backend development or programming in general. I want to learn the fundamentals." [ref=e13] [cursor=pointer]:
        - generic [ref=e14]: 🌱
        - generic [ref=e15]: Just Getting Started
        - generic [ref=e16]: I'm new to backend development or programming in general. I want to learn the fundamentals.
      - button "🔧 I Know the Basics I've built simple APIs or followed tutorials. Ready to level up with real-world skills." [ref=e17] [cursor=pointer]:
        - generic [ref=e18]: 🔧
        - generic [ref=e19]: I Know the Basics
        - generic [ref=e20]: I've built simple APIs or followed tutorials. Ready to level up with real-world skills.
      - button "⚡ Experienced Developer I build production systems professionally. Looking for advanced patterns and mastery." [ref=e21] [cursor=pointer]:
        - generic [ref=e22]: ⚡
        - generic [ref=e23]: Experienced Developer
        - generic [ref=e24]: I build production systems professionally. Looking for advanced patterns and mastery.
    - generic [ref=e25]:
      - button "← Back" [ref=e26] [cursor=pointer]
      - button "Continue →" [disabled] [ref=e27]
    - button "Skip for now" [ref=e28] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e34] [cursor=pointer]:
    - img [ref=e35]
  - alert [ref=e39]
```
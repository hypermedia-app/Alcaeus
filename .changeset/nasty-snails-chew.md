---
"alcaeus": patch
---

Web: Do not capture the global fetch function

The problem is that tools which monkey-patch the `Window.fetch`, such as Sentry, would not work with alcaeus if it captures the original fetch function before patching happens

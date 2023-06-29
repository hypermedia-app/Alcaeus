---
"alcaeus": major
---

Convert to ESM-only. Other changes include:

1. `isomorphic-fetch` and `isomorhpic-form-data` are removed as dependencies. They should be loaded by consumer s if necessary
2. Removed `./web` and `./node` modules
   ```diff
   -import { Hydra } from 'alcaeus/web'
   +import { Hydra } from 'alcaeus'
   ```

---
"alcaeus": patch
---

Make factories exported by `alcaeus/node` and `alcaeus/web` generic

This alleviates a breaking change inadvertently introduced in v2.2, which was to make `DatasetCore` the default dataset type for the client. Since it provides less methods than the previous default `rdf-dataset-indexed`, users may want to provide a different factory, such as `rdf-ext`.

```typescript
import { create } from 'alcaeus/web' // or 'alcaeus/node'
import $rdf from 'rdf-ext'

// client's type will be inferred as HydraClient<DatasetExt>
const client = create({
  datasetFactory: $rdf.dataset
})
```

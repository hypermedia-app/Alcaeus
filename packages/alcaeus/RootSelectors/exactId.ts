import type { NamedNode } from '@rdfjs/types'
import { HydraEnvironment, ResponseWrapper } from 'alcaeus-core'

export function exactId(env: HydraEnvironment, response: ResponseWrapper): NamedNode {
  return env.namedNode(response.resourceUri)
}

import type { NamedNode } from '@rdfjs/types'
import { HydraEnvironment, ResponseWrapper } from 'alcaeus-core'

export function redirectTarget(env: HydraEnvironment, response: ResponseWrapper): NamedNode | undefined {
  if (response.redirectUrl != null) {
    return env.namedNode(response.redirectUrl)
  }

  return undefined
}

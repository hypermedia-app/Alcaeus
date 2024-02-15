import type { NamedNode } from '@rdfjs/types'
import { HydraEnvironment, ResponseWrapper } from 'alcaeus-core'

export function trailingSlash(env: HydraEnvironment, response: ResponseWrapper): NamedNode | undefined {
  let id: string

  if (response.requestedUri.endsWith('/')) {
    id = response.requestedUri.substr(0, response.requestedUri.length - 1)
  } else {
    id = response.requestedUri + '/'
  }

  return env.namedNode(id)
}

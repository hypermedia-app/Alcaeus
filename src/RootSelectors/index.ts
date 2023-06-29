import type { DatasetCore } from '@rdfjs/types'
import { ResourceIdentifier } from '@tpluscode/rdfine'
import type { ResponseWrapper } from '../ResponseWrapper.js'
import { exactId } from './exactId.js'
import { redirectTarget } from './redirectTarget.js'
import { trailingSlash } from './trailingSlash.js'
import { problemDetails } from './problemDetails.js'

export interface RootNodeCandidate {
  (response: ResponseWrapper, dataset: DatasetCore): ResourceIdentifier | undefined
}

export const defaultSelectors: Record<string, RootNodeCandidate> = {
  exactId,
  trailingSlash,
  redirectTarget,
  problemDetails,
}

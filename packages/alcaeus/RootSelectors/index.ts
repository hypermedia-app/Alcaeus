import { RootNodeCandidate } from 'alcaeus-core'
import { exactId } from './exactId.js'
import { redirectTarget } from './redirectTarget.js'
import { trailingSlash } from './trailingSlash.js'
import { problemDetails } from './problemDetails.js'

const defaultSelectors: Record<string, RootNodeCandidate> = {
  exactId,
  trailingSlash,
  redirectTarget,
  problemDetails,
}

export default Object.entries(defaultSelectors)

import type { NamedNode } from 'rdf-js'
import type { ResponseWrapper } from '../ResponseWrapper'
import { exactId } from './exactId'
import { redirectTarget } from './redirectTarget'
import { trailingSlash } from './trailingSlash'

export interface RootNodeCandidate {
    (response: ResponseWrapper): NamedNode | undefined
}

export const defaultSelectors: Record<string, RootNodeCandidate> = {
    exactId,
    trailingSlash,
    redirectTarget,
}

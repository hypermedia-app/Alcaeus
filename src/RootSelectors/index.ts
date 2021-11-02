import type { DatasetCore } from 'rdf-js'
import { ResourceIdentifier } from '@tpluscode/rdfine'
import type { ResponseWrapper } from '../ResponseWrapper'
import { exactId } from './exactId'
import { redirectTarget } from './redirectTarget'
import { trailingSlash } from './trailingSlash'
import { problemDetails } from './problemDetails'

export interface RootNodeCandidate {
    (response: ResponseWrapper, dataset: DatasetCore): ResourceIdentifier | undefined
}

export const defaultSelectors: Record<string, RootNodeCandidate> = {
    exactId,
    trailingSlash,
    redirectTarget,
    problemDetails,
}

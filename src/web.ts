import { parsers } from '@rdf-esm/formats-common'
import datasetIndexed from 'rdf-dataset-indexed'
import * as Alcaeus from './index'

export function create(opts?: Partial<Parameters<typeof Alcaeus['create']>[0]>) {
    return Alcaeus.create({
        fetch: (input, init) => fetch(input, init),
        Headers,
        parsers,
        datasetFactory: datasetIndexed,
        ...opts,
    })
}

export const Hydra = create()

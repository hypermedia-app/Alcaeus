import { parsers } from '@rdf-esm/formats-common'
import dataset from '@rdfjs/dataset'
import * as Alcaeus from './index'

export function create(opts?: Partial<Parameters<typeof Alcaeus['create']>[0]>) {
    return Alcaeus.create({
        fetch: (input, init) => fetch(input, init),
        Headers,
        parsers,
        datasetFactory: dataset.dataset,
        ...opts,
    })
}

export const Hydra = create()

import formats from '@rdfjs/formats-common'
import dataset from '@rdfjs/dataset'
import * as Alcaeus from './index'
import 'isomorphic-fetch'

export function create(opts?: Partial<Parameters<typeof Alcaeus['create']>[0]>) {
    return Alcaeus.create({
        fetch,
        Headers,
        parsers: formats.parsers,
        datasetFactory: dataset.dataset,
        ...opts,
    })
}

export const Hydra = create()

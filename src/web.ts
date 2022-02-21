import { parsers } from '@rdf-esm/formats-common'
import dataset from '@rdfjs/dataset'
import { DatasetCore } from '@rdfjs/types'
import * as Alcaeus from './index'

export function create<D extends DatasetCore>(opts: Partial<Omit<Alcaeus.Init<D>, 'fetch' | 'Headers'>> = {}) {
    const { datasetFactory, ...rest } = opts

    return Alcaeus.create<D>({
        fetch,
        Headers,
        parsers,
        datasetFactory: datasetFactory || dataset.dataset as any,
        ...rest,
    })
}

export const Hydra = create()

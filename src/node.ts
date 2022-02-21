import formats from '@rdfjs/formats-common'
import dataset from '@rdfjs/dataset'
import { DatasetCore } from '@rdfjs/types'
import * as Alcaeus from './index'
import 'isomorphic-fetch'

export function create<D extends DatasetCore>(opts: Partial<Omit<Alcaeus.Init<D>, 'fetch' | 'Headers'>> = {}) {
    const { datasetFactory, ...rest } = opts

    return Alcaeus.create<D>({
        fetch,
        Headers,
        parsers: formats.parsers,
        datasetFactory: datasetFactory || dataset.dataset as any,
        ...rest,
    })
}

export const Hydra = create()

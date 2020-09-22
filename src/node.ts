import { parsers } from '@rdfjs/formats-common'
import * as Alcaeus from './index'
import 'isomorphic-fetch'

export function create(opts?: Partial<Parameters<typeof Alcaeus['create']>[0]>) {
    return Alcaeus.create({
        fetch,
        Headers,
        parsers,
        ...opts,
    })
}

export const Hydra = create()

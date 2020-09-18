import { parsers } from '@rdfjs/formats-common'
import fetchPony from 'fetch-ponyfill'
import * as Alcaeus from './index'

const { fetch, Headers } = fetchPony()

export function create(opts?: Partial<Parameters<typeof Alcaeus['create']>[0]>) {
    return Alcaeus.create({
        fetch,
        Headers,
        parsers,
        ...opts,
    })
}

export const Hydra = create()

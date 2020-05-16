import fetchPony from 'fetch-ponyfill'

const fetchPonyfilled = fetchPony()

export const Headers = fetchPonyfilled.Headers
export const fetch = fetchPonyfilled.fetch

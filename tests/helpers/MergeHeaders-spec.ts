import { merge } from '../../src/helpers/MergeHeaders'

describe('merge', () => {
    it('merges same header when casing does not match', () => {
        // given
        const defaultHeaders = {
            'Content-Type': 'application/ld+json',
        }
        const overrides = {
            'CONTENT-TYPE': 'text/csv',
        }

        // when
        const headers = merge(defaultHeaders, overrides)

        // then
        expect(headers).toStrictEqual({
            'content-type': 'text/csv',
        })
    })

    it('merges array parameters', () => {
        // given
        const defaultHeaders = [
            [ 'Content-Type', 'application/ld+json' ],
        ]
        const overrides = [
            [ 'CONTENT-TYPE', 'text/csv' ],
        ]

        // when
        const headers = merge(defaultHeaders, overrides)

        // then
        expect(headers).toStrictEqual({
            'content-type': 'text/csv',
        })
    })

    it('uses the overrides when left is an empty object', () => {
        // given
        const overrides = {
            'CONTENT-TYPE': 'text/csv',
        }

        // when
        const headers = merge({}, overrides)

        // then
        expect(headers).toStrictEqual({
            'content-type': 'text/csv',
        })
    })

    it('uses the left when overrides is an empty object', () => {
        // given
        const originals = {
            'CONTENT-TYPE': 'text/csv',
        }

        // when
        const headers = merge(originals, {})

        // then
        expect(headers).toStrictEqual({
            'content-type': 'text/csv',
        })
    })
})

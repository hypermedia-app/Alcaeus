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
})

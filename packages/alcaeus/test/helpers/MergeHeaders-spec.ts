import { expect } from 'chai'
import { merge } from '../../helpers/MergeHeaders.js'

describe('merge', () => {
  it('merges same header when casing does not match', () => {
    // given
    const defaultHeaders = new Headers({
      'Content-Type': 'application/ld+json',
    })
    const overrides = new Headers({
      'CONTENT-TYPE': 'text/csv',
    })

    // when
    const headers = merge(defaultHeaders, overrides, Headers)

    // then
    expect(headers).to.deep.eq(new Headers({
      'content-type': 'text/csv',
    }))
  })

  it('uses the overrides when left is an empty object', () => {
    // given
    const overrides = new Headers({
      'CONTENT-TYPE': 'text/csv',
    })

    // when
    const headers = merge(new Headers(), overrides, Headers)

    // then
    expect(headers).to.deep.eq(new Headers({
      'content-type': 'text/csv',
    }))
  })

  it('uses the left when overrides is an empty object', () => {
    // given
    const originals = new Headers({
      'CONTENT-TYPE': 'text/csv',
    })

    // when
    const headers = merge(originals, new Headers(), Headers)

    // then
    expect(headers.get('content-type')).to.eq('text/csv')
  })
})

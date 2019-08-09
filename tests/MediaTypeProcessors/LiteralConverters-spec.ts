import converters from '../../src/MediaTypeProcessors/LiteralConverters'
import { xsd } from '../../src/Vocabs'

describe('booleanConverter', () => {
    const booleanConverter = converters[xsd.boolean]

    it('returns true when string matches exactly', () => {
        expect(booleanConverter('true', xsd.boolean)).toBe(true)
    })
})

describe('numberConverter', () => {
    const integerConverter = converters[xsd.integer]

    it('converts number to int', () => {
        expect(integerConverter('123', xsd.integer)).toBe(123)
    })

    it('converts number to float', () => {
        expect(integerConverter('1.23', xsd.float)).toBe(1.23)
    })

    it('converts number to double', () => {
        expect(integerConverter('1.23', xsd.double)).toBe(1.23)
    })
})

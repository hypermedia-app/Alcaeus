import { xsd } from '../Vocabs'

function booleanConverter (value: string) {
    return value === 'true'
}

function numberConverter (value: string, type: string) {
    if (type === xsd.double || type === xsd.float || type === xsd.decimal) {
        return Number.parseFloat(value)
    }

    return Number.parseInt(value, 10)
}

export default {
    [xsd.boolean]: booleanConverter,
    [xsd.int]: numberConverter,
    [xsd.short]: numberConverter,
    [xsd.byte]: numberConverter,
    [xsd.long]: numberConverter,
    [xsd.nonPositiveInteger]: numberConverter,
    [xsd.negativeInteger]: numberConverter,
    [xsd.nonNegativeInteger]: numberConverter,
    [xsd.unsignedInt]: numberConverter,
    [xsd.unsignedShort]: numberConverter,
    [xsd.unsignedByte]: numberConverter,
    [xsd.unsignedLong]: numberConverter,
    [xsd.positiveInteger]: numberConverter,
    [xsd.integer]: numberConverter,
    [xsd.float]: numberConverter,
    [xsd.double]: numberConverter,
    [xsd.decimal]: numberConverter,
}

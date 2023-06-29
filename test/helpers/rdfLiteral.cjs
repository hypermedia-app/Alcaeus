// Mocking rdf-literal out because it causes issues with jest
const { xsd } = require('@tpluscode/rdf-ns-builders')
const { fromLiteral } = require('@tpluscode/rdfine/lib/conversion')

module.exports = {
  fromRdf(obj) {
    switch (obj.datatype.value) {
      case xsd.boolean.value:
        return obj.value === 'true'
      case xsd.integer.value:
      case xsd.long.value:
      case xsd.byte.value:
      case xsd.short.value:
      case xsd.int.value:
      case xsd.negativeInteger.value:
      case xsd.nonNegativeInteger.value:
      case xsd.nonPositiveInteger.value:
      case xsd.positiveInteger.value:
      case xsd.unsignedByte.value:
      case xsd.unsignedInt.value:
      case xsd.unsignedLong.value:
      case xsd.unsignedShort.value:
      case xsd.double.value:
      case xsd.decimal.value:
      case xsd.float.value:
        return Number.parseFloat(obj.value)
      case xsd.date.value:
      case xsd.dateTime.value:
        return new Date(Date.parse(obj.value))
    }

    return obj.value
  }
}

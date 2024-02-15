import { inferTypesFromPropertyRanges } from './propertyTypes.js'
import { addExplicitStatementsInferredFromMemberAssertion } from './memberAssertion.js'

export default [
  inferTypesFromPropertyRanges,
  addExplicitStatementsInferredFromMemberAssertion,
]

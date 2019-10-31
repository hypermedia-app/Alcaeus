import * as graphs from './subClassOfInherit-spec-graphs'
import { inheritFromSuperclasses } from '../../../src/MediaTypeProcessors/inferences'

describe('subClassOf inference', () => {
    it('reasserts supported operations from superclasses', async () => {
        // given
        const dataset = await graphs.multiLevelSupportedOperations()

        // when
        inheritFromSuperclasses(dataset)

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('reasserts supported properties from superclasses', async () => {
        // given
        const dataset = await graphs.multiLevelSupportedProperties()

        // when
        inheritFromSuperclasses(dataset)

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })
})

import 'core-js/es6/object'
import { Core } from '../../src/Constants'
import HydraResource from '../../src/Resources/HydraResource'
import { Mixin } from '../../src/Resources/Mixins/PartialCollectionView'
import { Bodies } from '../test-objects'

let links
class PartialCollectionView extends Mixin(HydraResource(null, () => links)) {}

describe('PartialCollectionView', () => {
    beforeEach(() => { links = [] })

    it('should link to the collection', () => {
        const collection = {}

        const pcv = new PartialCollectionView(Bodies.hydraCollectionWithView['hydra:view'], null)
        links = [
            {
                predicate: Core.Vocab('view'),
                subject: collection,
                subjectId: 'http://some.id',
            },
        ]

        expect(Object.is(collection, pcv.collection)).toBe(true)
    })

    it('should contain null links to other pages if missing', () => {
        const pcv = new PartialCollectionView({}, null)

        expect(pcv.next).toBe(null)
        expect(pcv.previous).toBe(null)
        expect(pcv.first).toBe(null)
        expect(pcv.last).toBe(null)
    })

    it('should contain links to other pages', () => {
        const pcv = new PartialCollectionView(Bodies.hydraCollectionWithView['hydra:view'], null)

        expect(pcv.next.id).toBe('http://example.com/resource?page=4')
        expect(pcv.previous.id).toBe('http://example.com/resource?page=2')
        expect(pcv.first.id).toBe('http://example.com/resource?page=1')
        expect(pcv.last.id).toBe('http://example.com/resource?page=58')
    })

    it('first should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('first'))
            .toBe(false)
    })

    it('last should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('last'))
            .toBe(false)
    })

    it('next should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('next'))
            .toBe(false)
    })

    it('previous should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('previous'))
            .toBe(false)
    })

    it('collection should be nonenumerable', () => {
        expect(PartialCollectionView.prototype.propertyIsEnumerable('collection'))
            .toBe(false)
    })
})

import $rdf from 'rdf-ext'
import cf from 'clownface'
import { PartialCollectionViewMixin } from '../../src/Resources/Mixins/PartialCollectionView'
import { Resource } from '../Resources/_TestResource'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { HydraResponse } from '../../src/HydraResponse'
import { HydraResource } from '../../src/Resources'
import { ResponseWrapper } from '../../src/ResponseWrapper'
import { wrappedViewSelector } from '../../src/RootSelectors/view'

class View extends PartialCollectionViewMixin(Resource) {}

describe('RootSelector', () => {
    describe('viewSelector', () => {
        it('should return the collection if resource is its hydra:view', () => {
        // given
            const dataset = $rdf.dataset()
            const view = new View({
                dataset,
                term: $rdf.namedNode('view'),
            })
            cf({ dataset })
                .namedNode('collection').addOut(hydra.view, view._selfGraph)

            const resources = new Map<string, HydraResource>()
            resources.set('id', view)
            const response = {
                requestedUri: 'id',
            } as HydraResponse & ResponseWrapper
            const innerSelector = () => view

            // when
            const root = wrappedViewSelector(innerSelector)(resources, response)

            // then
            expect(root!.id.value).toBe('collection')
        })
    })
})

import $rdf from 'rdf-ext'
import cf from 'clownface'
import { PartialCollectionViewMixin } from '../../src/Resources/Mixins/PartialCollectionView'
import { Resource } from '../Resources/_TestResource'
import { RootSelector } from '../../src/RootSelectors'
import { hydra } from '../../src/Vocabs'
import { HydraResponse } from '../../src/HydraResponse'
import { HydraResource } from '../../src/Resources'
import { ResponseWrapper } from '../../src/ResponseWrapper'
import PartialCollectionViewSelector from '../../src/RootSelectors/PartialCollectionViewSelector'

class View extends PartialCollectionViewMixin(Resource) {}

describe('PartialCollectionViewSelector', () => {
    it('should return the collection if resource is collection view', () => {
        // given
        const dataset = $rdf.dataset()
        const view = new View({
            dataset,
            term: $rdf.namedNode('view'),
        })
        view.types.add(hydra.PartialCollectionView)
        cf({ dataset })
            .namedNode('collection').addOut(hydra.view, view._selfGraph)

        const resources = new Map<string, HydraResource>()
        resources.set('id', view as any)
        const response = {
            requestedUri: 'id',
        } as HydraResponse & ResponseWrapper
        const innerSelector = {
            selectRoot: () => view as any,
        } as RootSelector

        // when
        const root = PartialCollectionViewSelector(innerSelector)
            .selectRoot(resources, response)

        // then
        expect(root!.id.value).toBe('collection')
    })
})

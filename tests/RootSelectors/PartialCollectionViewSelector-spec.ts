import { Vocab } from '../../src'
import { IHydraResponse } from '../../src/HydraResponse'
import { IResourceGraph } from '../../src/ResourceGraph'
import { IHydraResource } from '../../src/Resources'
import { IResponseWrapper } from '../../src/ResponseWrapper'
import PartialCollectionViewSelector from '../../src/RootSelectors/PartialCollectionViewSelector'
import TypeCollection from '../../src/TypeCollection'

describe('PartialCollectionViewSelector', () => {
    it('should return the collection if resource is collection view', () => {
        // given
        const collection = {} as IHydraResource
        const view = {
            collection,
            types: TypeCollection.create(Vocab('PartialCollectionView')),
        }
        const resources = {
            id: view,
        }
        const response = {
            requestedUri: 'id',
        } as IHydraResponse & IResponseWrapper
        const innerSelector = {
            selectRoot: () => view,
        } as any

        // when
        const root = PartialCollectionViewSelector(innerSelector)
            .selectRoot(resources as any as IResourceGraph, response)

        // then
        expect(Object.is(root, collection)).toBeTruthy()
    })
})

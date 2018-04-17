import {Core} from '../../src/Constants';
import {IHydraResource, IHydraResponse, IResourceGraph} from '../../src/interfaces';
import PartialCollectionViewSelector from '../../src/RootSelectors/PartialCollectionViewSelector';
import TypeCollection from '../../src/TypeCollection';
import Vocab = Core.Vocab;

describe('PartialCollectionViewSelector', () => {
    it('should return the collection if resource is collection view', () => {
        // given
        const collection = {} as IHydraResource;
        const view = {
            collection,
            types: TypeCollection.create(Vocab('PartialCollectionView')),
        };
        const resources = {
            id: view,
        };
        const response = {
            requestedUri: 'id',
        } as IHydraResponse;

        // when
        const root = PartialCollectionViewSelector.selectRoot(resources as any as IResourceGraph, response);

        // then
        expect(Object.is(root, collection)).toBeTruthy();
    });
});

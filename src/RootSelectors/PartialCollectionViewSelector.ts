import {Core} from '../Constants';
import {IHydraResource, IHydraResponse, IPartialCollectionView, IResourceGraph} from '../interfaces';
import Vocab = Core.Vocab;

export default {
    selectRoot(resources: IResourceGraph, response: IHydraResponse): IHydraResource {
        const maybeView = resources[response.requestedUri] as IPartialCollectionView;

        if (maybeView.types.contains(Vocab('PartialCollectionView'))) {
            return maybeView.collection;
        }

        return null;
    },
};

import {Core} from '../Constants';
import {IHydraResource, IHydraResponse, IPartialCollectionView, IResourceGraph, IRootSelector} from '../interfaces';
import Vocab = Core.Vocab;
import {IResponseWrapper} from '../ResponseWrapper';

export default function(selector: IRootSelector): IRootSelector {
    return {
        selectRoot(resources: IResourceGraph, response: IResponseWrapper & IHydraResponse): IHydraResource {
            const maybeView = selector.selectRoot(resources, response) as IPartialCollectionView;

            if (maybeView.types.contains(Vocab('PartialCollectionView'))) {
                return maybeView.collection;
            }

            return null;
        },
    };
}

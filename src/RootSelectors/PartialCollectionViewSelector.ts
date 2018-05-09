import {Core} from '../Constants';
import {
    IHydraResource, IHydraResponse, IPartialCollectionView, IResourceGraph, IResponseWrapper,
    IRootSelector,
} from '../interfaces';
import Vocab = Core.Vocab;

export default function(selector: IRootSelector): IRootSelector {
    return {
        selectRoot(resources: IResourceGraph, response: IResponseWrapper & IHydraResponse) {
            const maybeView = selector.selectRoot(resources, response) as any;

            if (maybeView && maybeView.types.contains(Vocab('PartialCollectionView'))) {
                return maybeView.collection;
            }

            return maybeView;
        },
    };
}

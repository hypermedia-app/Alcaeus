import {nonenumerable} from 'core-decorators';
import {IHydraClient} from '../alcaeus';
import {IAsObject, IIncomingLink} from '../internals';
import {Maybe} from '../support/Maybe';
import ClientAccessor from './CoreMixins/ClientAccessor';
import LinkAccessor from './CoreMixins/LinkAccessor';
import {ApiDocumentation, IHydraResource} from './index';
import {Operation} from './Operation';
import Resource, {IResource} from './Resource';

const apiDocumentation = new WeakMap<IResource, ApiDocumentation>();

class HydraResource extends Resource implements IHydraResource, IResource {
    constructor(actualResource, apiDoc: ApiDocumentation) {
        super(actualResource);

        apiDocumentation.set(this, apiDoc);
    }

    @nonenumerable
    get apiDocumentation(): Maybe<ApiDocumentation> {
        const currentDoc = apiDocumentation.get(this);

        if (currentDoc) {
            return Maybe.some(currentDoc);
        } else {
            return Maybe.none();
        }
    }

    @nonenumerable
    get operations() {
        const alcaeus = (this as any)._alcaeus;
        const maybeOperations = this.apiDocumentation.map((apiDoc) => {
            const classOperations = this.types.map((type: string) => apiDoc.getOperations(type));

            const mappedLinks = (this as any as IAsObject)._links
                .map((link) => link.subject.types.map((type) => ({type, predicate: link.predicate})));
            const flattened = [].concat.apply([], mappedLinks);
            const propertyOperations = flattened.map(
                (link: any) => apiDoc.getOperations(link.type, link.predicate));

            const operations = [].concat.apply([], [...classOperations, ...propertyOperations]);
            return operations.map((supportedOperation) => {
                return new Operation(supportedOperation, alcaeus, this);
            });
        });

        return maybeOperations.getOrElse([]);
    }
}

export default function generateClass(alcaeus: IHydraClient, getIncomingLinks: () => IIncomingLink[]) {
    const clientAccessorMixin = ClientAccessor(alcaeus);
    const linkAccessorMixin = LinkAccessor(getIncomingLinks);

    return clientAccessorMixin(linkAccessorMixin(HydraResource));
}

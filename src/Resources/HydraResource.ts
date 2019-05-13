import {nonenumerable} from 'core-decorators';
import {Maybe} from 'tsmonad';
import {IHydraClient} from '../alcaeus';
import {Core} from '../Constants';
import {IAsObject, IIncomingLink} from '../internals';
import ClientAccessor from './CoreMixins/ClientAccessor';
import LinkAccessor from './CoreMixins/LinkAccessor';
import {ApiDocumentation, IHydraResource, RdfProperty, SupportedOperation, SupportedProperty} from './index';
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
        return Maybe.maybe(apiDocumentation.get(this));
    }

    @nonenumerable
    get operations() {
        const alcaeus = (this as any)._alcaeus;

        const getClassOperations = (getOperations: (c: string, p?: string) => SupportedOperation[]): Operation[] => {
            const classOperations = this.types.map((type: string) => getOperations(type));

            const mappedLinks = (this as any as IAsObject)._reverseLinks
                .map((link) => link.subject.types.map((type) => ({type, predicate: link.predicate})));
            const flattened = [].concat.apply([], mappedLinks);
            const propertyOperations = flattened.map(
                (link: any) => getOperations(link.type, link.predicate));

            const operations = [].concat.apply([], [...classOperations, ...propertyOperations]);
            return operations.map((supportedOperation) => {
                return new Operation(supportedOperation, alcaeus, this);
            });
        };

        return this.apiDocumentation
            .map((apiDoc) => apiDoc.getOperations)
            .caseOf({
                just: getClassOperations,
                nothing: () => [],
            });
    }

    @nonenumerable
    public getLinks(includeMissing: boolean = false) {
        return this.getProperties()
            .filter((prop) => prop.isLink)
            .reduce((map, property) => {
                const value = this._getArray(property.id);

                if (value.length > 0 || includeMissing) {
                    map[property.id] = value;
                }

                return map;
            }, {});
    }

    @nonenumerable
    public getProperties() {
        const getProperties = (propertiesForType: (classUri: string) => SupportedProperty[]) =>
            this.types.map(propertiesForType)
                .reduce((supportedProps, moreProps) => {
                    return [...supportedProps, ...moreProps.map((sp) => sp.property)];
                }, [] as RdfProperty[]);

        return this.apiDocumentation
            .map((apiDoc) => apiDoc.getProperties)
            .caseOf({
                just: getProperties,
                nothing: () => [],
            });
    }

    @nonenumerable
    public getCollections() {
        return this._getArray(Core.Vocab('collection'));
    }
}

export default function generateClass(alcaeus: IHydraClient, getIncomingLinks: () => IIncomingLink[]) {
    const clientAccessorMixin = ClientAccessor(alcaeus);
    const linkAccessorMixin = LinkAccessor(getIncomingLinks);

    return clientAccessorMixin(linkAccessorMixin(HydraResource));
}

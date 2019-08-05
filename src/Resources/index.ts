/* tslint:disable:interface-over-type-literal */
import { Maybe } from 'tsmonad'
import { IHydraResponse } from '../HydraResponse'
import { IResource } from './Resource'

export interface ManagesBlockPattern {
    subject?: string | IResource;
    predicate?: string | (IRdfProperty & IResource);
    object?: string | (IClass & IResource);
}

export interface IApiDocumentation {
    classes: Class[];
    getClass(classId: string): Class | null;
    getOperations(classUri: string, predicateUri?: string): SupportedOperation[];
    getProperties(classUri: string): SupportedProperty[];

    /**
     * @deprecated
     */
    getEntrypoint(): Promise<IHydraResponse>;

    loadEntrypoint(): Promise<IHydraResponse>;
}

export interface IClass {
    /**
     * Gets the operations supported by this class
     */
    supportedOperations: SupportedOperation[];

    /**
     * Gets the properties supported by this class
     */
    supportedProperties: SupportedProperty[];
}

export interface IHydraResource {
    /**
     * Gets the operations which can be performed on this resource
     */
    readonly operations: IOperation[];
    /**
     * Gets the API Documentation which was linked to this resource representation
     */
    readonly apiDocumentation: Maybe<ApiDocumentation>;

    /**
     * Gathers all properties from current resource's classes
     */
    getProperties(): { supportedProperty: SupportedProperty; objects: any[] }[];

    /**
     * Get all property/value pairs for hydra:Link properties
     *
     * @param includeMissing if true, will include properties not present in resource representation
     */
    getLinks(includeMissing?: boolean): { supportedProperty: SupportedProperty; resources: IResource[]}[];

    /**
     * Gets objects of hydra:collection property
     */
    getCollections(filter?: ManagesBlockPattern): IResource[];

    /**
     * Dereferences the resource
     */
    load(): Promise<IHydraResponse>;
}

export interface IStatusCodeDescription {
    code: number | null;
    description: string;
}

export interface IDocumentedResource {
    /**
     * Gets the value of either hydra:title or schema:title or rdfs:label property
     */
    title: string;
    /**
     * Gets the value of either hydra:description or schema:description or rdfs:comment property
     */
    description: string;
}

export interface ISupportedProperty {
    /**
     * Gets the value indicating if the property can be read from responses
     */
    readable: boolean;
    /**
     * Gets the value indicating if the property can be written by requests
     */
    writable: boolean;
    /**
     * Gets the value indicating if the property in required in request payload
     */
    required: boolean;
    /**
     * The actual RDF predicate to use in representations
     */
    property: RdfProperty;
}

export interface ISupportedOperation {
    method: string;
    expects: Class;
    returns: Class;
    requiresInput: boolean;
}

export interface IRdfProperty {
    /**
     * Gets the rdfs:range of a property
     */
    range: Class | null;
    /**
     * Gets the rdfs:domain of a property
     */
    domain: Class | null;
    /**
     * Gets the property's supported operations
     */
    supportedOperations: SupportedOperation[];
    /**
     * Gets a value indicating whether the property is a hydra:Link
     */
    isLink: boolean;
}

export interface IOperation {
    title: string;
    description: string;
    method: string;
    expects: Class;
    returns: Class;
    requiresInput: boolean;
    invoke(body: BodyInit, mediaType?: string): Promise<IHydraResponse>;
    supportedOperation: SupportedOperation;
}

export interface ICollection {
    /**
     * Gets the total number of items within the entire collection.
     * Note that this number can be larger then the number of `members` in the case of partial collections
     */
    readonly totalItems: number;
    /**
     * Gets the collection member included in the current representation.
     * In the case of partial collections they may only be a subset of all members
     */
    readonly members: HydraResource[];
    /**
     * Gets the views of a partial collection
     */
    readonly views?: View[];
    /**
     * Gets the manages block for current collection
     */
    readonly manages: IManagesBlock[];
}

export interface IView {
    /**
     * Gets the actual collection resource, of which this view is part
     */
    readonly collection: HydraResource | null;
}

export interface IPartialCollectionView {
    /**
     * Gets the first page resource of a collection
     */
    readonly first: HydraResource | null;
    /**
     * Gets the previous page resource of a collection
     */
    readonly previous: HydraResource | null;
    /**
     * Gets the next page resource of a collection
     */
    readonly next: HydraResource | null;
    /**
     * Gets the last page resource of a collection
     */
    readonly last: HydraResource | null;
}

export type VariableRepresentation = 'BasicRepresentation' | 'ExplicitRepresentation';

export interface IIriTemplate {
    template: string;
    mappings: IIriTemplateMapping[];
    variableRepresentation: VariableRepresentation;
    expand(): string;
}

export interface IIriTemplateMapping {
    property: RdfProperty;
    variable: string;
    required: boolean;
}

/**
 * Represents the "manages block"
 */
export interface IManagesBlock {
    /**
     * Gets the subject resource from the manages block
     */
    subject: IResource | null;
    /**
     * Gets the predicate from the manages block
     */
    property: RdfProperty | null;
    /**
     * Gets the object class from the manages block
     */
    object: Class | null;

    /**
     * Checks if the current manages block matches the given pattern
     * @param filter {ManagesBlockPattern}
     */
    matches(filter: ManagesBlockPattern): boolean;
}

interface ResourceIndexer {
    [ prop: string ]: unknown | unknown[];
}
type Resource = IHydraResource & IResource

export type HydraResource = Resource & ResourceIndexer;
export type DocumentedResource = IDocumentedResource & HydraResource;
export type Class = IClass & DocumentedResource;
export type SupportedOperation = ISupportedOperation & DocumentedResource;
export type SupportedProperty = ISupportedProperty & DocumentedResource;
export type Collection = ICollection & HydraResource;
export type PartialCollectionView = IPartialCollectionView & IView & HydraResource;
export type RdfProperty = IRdfProperty & DocumentedResource;
export type ApiDocumentation = IApiDocumentation & IResource;
export type View = IView & IResource;

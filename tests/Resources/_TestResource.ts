import RdfResource from '@tpluscode/rdfine'
import * as Hydra from '@rdfine/hydra'
import { Criteria, RecursiveStopConditions } from '../../src/Resources/CoreMixins/OperationFinder'
import { MemberAssertionPattern } from '../../src/Resources/Mixins/MemberAssertion'
import { RuntimeOperation } from '../../src/Resources/Operation'

export class Resource extends RdfResource implements Hydra.Resource {
    public get operations(): RuntimeOperation[] {
        return []
    }

    public findOperations(...criteria: Criteria[]): RuntimeOperation[] {
        return []
    }

    public findOperationsDeep(...stopCondition: (RecursiveStopConditions | Criteria)[]): RuntimeOperation[] {
        return []
    }

    public getCollections(filter?: MemberAssertionPattern): Resource[] {
        return []
    }

    public getLinks(includeMissing?: boolean): { supportedProperty: Hydra.SupportedProperty; resources: Resource[] }[] {
        return []
    }

    public getOperationsDeep(condition?: RecursiveStopConditions): RuntimeOperation[] {
        return []
    }

    public getProperties(): { supportedProperty: Hydra.SupportedProperty; objects: any[] }[] {
        return []
    }

    public load() {
        return {} as any
    }

    get collection(): Hydra.Resource['collection'] {
        return []
    }

    get apiDocumentation(): Hydra.ApiDocumentation | undefined {
        return undefined
    }

    get first(): Hydra.Resource | undefined {
        return undefined
    }

    get freetextQuery(): string | undefined {
        return undefined
    }

    get title(): string | undefined {
        return undefined
    }

    get description(): string | undefined {
        return undefined
    }

    get last(): Resource | undefined {
        return undefined
    }

    get next(): Resource | undefined {
        return undefined
    }

    get operation(): Array<Hydra.Operation> {
        return []
    }

    get previous(): Resource | undefined {
        return undefined
    }

    get search(): Hydra.IriTemplate | undefined {
        return undefined
    }

    get view(): Array<Hydra.Resource> {
        return []
    }

    get comment(): string | undefined {
        return undefined
    }

    get isDefinedBy(): Resource | undefined {
        return undefined
    }

    get label(): string | undefined {
        return undefined
    }

    get member(): Array<Resource> {
        return []
    }

    get seeAlso(): Array<Resource> {
        return []
    }
}

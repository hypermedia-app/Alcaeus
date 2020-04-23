import RdfResource from '@tpluscode/rdfine'
import { HydraResource, SupportedProperty } from '../../src/Resources'
import { Criteria, RecursiveStopConditions } from '../../src/Resources/CoreMixins/OperationFinder'
import { ManagesBlockPattern } from '../../src/Resources/Mixins/ManagesBlock'
import { Operation } from '../../src/Resources/Operation'

export class Resource extends RdfResource implements HydraResource {
    [prop: string]: unknown | unknown[];

    public get operations (): Operation[] {
        return []
    }

    public findOperations (...criteria: Criteria[]): Operation[] {
        return []
    }

    public findOperationsDeep (...stopCondition: (RecursiveStopConditions | Criteria)[]): Operation[] {
        return []
    }

    public getCollections (filter?: ManagesBlockPattern): HydraResource[] {
        return []
    }

    public getLinks (includeMissing?: boolean): { supportedProperty: SupportedProperty; resources: HydraResource[] }[] {
        return []
    }

    public getOperationsDeep (condition?: RecursiveStopConditions): Operation[] {
        return []
    }

    public getProperties (): { supportedProperty: SupportedProperty; objects: any[] }[] {
        return []
    }
}

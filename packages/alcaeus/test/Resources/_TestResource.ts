import RdfResource from '@tpluscode/rdfine'
import { MemberAssertionPattern } from 'alcaeus-model/Mixins/MemberAssertion.js'
import { RuntimeOperation } from 'alcaeus-model/Operation.js'
import { Criteria, RecursiveStopConditions } from 'alcaeus-model/CoreMixins/OperationFinder.js'
import { ApiDocumentation, IriTemplate, Operation, SupportedProperty, Resource as Base } from '@rdfine/hydra'

export class Resource extends RdfResource implements Base {
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

  public getLinks(includeMissing?: boolean): { supportedProperty: SupportedProperty; resources: Resource[] }[] {
    return []
  }

  public getOperationsDeep(condition?: RecursiveStopConditions): RuntimeOperation[] {
    return []
  }

  public getProperties(): { supportedProperty: SupportedProperty; objects: any[] }[] {
    return []
  }

  public load() {
    return {} as any
  }

  get collection(): Base['collection'] {
    return []
  }

  get apiDocumentation(): ApiDocumentation | undefined {
    return undefined
  }

  get first(): Resource | undefined {
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

  get operation(): Array<Operation> {
    return []
  }

  get previous(): Resource | undefined {
    return undefined
  }

  get search(): IriTemplate | undefined {
    return undefined
  }

  get view(): Array<Resource> {
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

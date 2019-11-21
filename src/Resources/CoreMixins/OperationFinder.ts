import { expand } from '@zazuko/rdf-vocabularies'
import { IOperation, IHydraResource, Class, SupportedOperation } from '../index'
import { Constructor } from '../Mixin'

type Constraint<TExactMatch, TFuncMatch = TExactMatch> = (string | TExactMatch) | ((value: TFuncMatch) => boolean)

export interface Criteria {
    /**
     * Filters operations by exactly matching the HTTP method (case-insensitive)
     */
    byMethod?: Constraint<string>;

    /**
     * Filters operations by exactly matching the hydra:expects annotation or via a custom check function.
     * The exact match can be ether a `Class` object or identifier
     */
    expecting?: Constraint<Class>;

    /**
     * Filters operations by exactly matching the hydra:returns annotation or via a custom check function.
     * The exact match can be ether a `Class` object or identifier
     */
    returning?: Constraint<Class>;

    /**
     * Filters operations by exactly matching supported operation's id or types, or by
     * executing a custom function against the supported operation
     */
    bySupportedOperation?: Constraint<string, SupportedOperation>;
}

export interface RecursiveStopConditions {
    excludedProperties: string[];
}

/**
 * Provides methods to find operations in deeply nested resource graphs
 */
export interface IOperationFinder {
    /**
     * Recursively gets operations from this resource and its children in the graph
     * @param condition allows to control which properties should be followed
     */
    getOperationsDeep (condition?: RecursiveStopConditions): IOperation[];

    /**
     * Finds operations of this resource which match the given criteria
     * @param criteria zero or more criteria objects which filter out unwanted operations
     */
    findOperations (...criteria: Criteria[]): IOperation[];

    /**
     * Finds operations of this resource and its children in graph, which match the given criteria
     * @param stopCondition (optional) allows to control which properties should be followed
     * @param moreCriteria zero or more criteria objects which filter out unwanted operations
     */
    findOperationsDeep (stopCondition: RecursiveStopConditions, ...moreCriteria: Criteria[]): IOperation[];
    findOperationsDeep (...criteria: Criteria[]): IOperation[];
}

function satisfies<T, TValue> (criteria: T | undefined, value: TValue, actualCheck: (expected: T, actual: TValue) => boolean) {
    if (!criteria || !value) {
        return true
    }

    return actualCheck(criteria, value)
}

function satisfiesMethod (criteria: Criteria, operation: IOperation) {
    return satisfies(criteria.byMethod, operation.method, (expected, actual) => {
        if (typeof expected === 'string') {
            return expected.toUpperCase() === actual.toUpperCase()
        }

        return expected(actual)
    })
}

function matchClass (expected: Constraint<Class>, actual: Class) {
    if (typeof expected === 'string') {
        return actual.id === expected
    }

    if (typeof expected === 'function') {
        return expected(actual)
    }

    return expected.id === actual.id
}

function satisfiesExpects (criteria: Criteria, operation: IOperation) {
    return satisfies(criteria.expecting, operation.expects, matchClass)
}

function satisfiesReturns (criteria: Criteria, operation: IOperation) {
    return satisfies(criteria.returning, operation.returns, matchClass)
}

function satisfiesTypeOrId (criteria: Criteria, operation: IOperation) {
    return satisfies(criteria.bySupportedOperation, operation.supportedOperation, (expected, actual) => {
        if (typeof expected === 'string') {
            return actual.id === expected || actual.types.contains(expected)
        }

        return expected(actual)
    })
}

function createMatcher (operation: IOperation) {
    return (criteria: Criteria) => {
        if (!criteria.byMethod) {
            criteria.byMethod = method => method.toUpperCase() !== 'GET'
        }

        return satisfiesReturns(criteria, operation) &&
            satisfiesExpects(criteria, operation) &&
            satisfiesMethod(criteria, operation) &&
            satisfiesTypeOrId(criteria, operation)
    }
}

const toResourceWithOperations = (stopConditions: RecursiveStopConditions) => {
    return (resources, [ prop, value ]) => {
        if (stopConditions.excludedProperties.includes(prop)) {
            return resources
        }

        let array = Array.isArray(value) ? value : [ value ]

        const moreResources = array
            .filter(resource => resource !== null &&
                typeof resource === 'object' &&
                'getOperationsDeep' in resource)

        return [...resources, ...moreResources]
    }
}

export function OperationFinder<TBase extends Constructor<IHydraResource>> (Base: TBase) {
    return class OperationFinderMixinClass extends Base implements IOperationFinder {
        public getOperationsDeep (
            stopConditions: RecursiveStopConditions = { excludedProperties: expand('hydra:member') },
            previousResources: OperationFinderMixinClass[] = []) {
            return Object.entries(this)
                .reduce(toResourceWithOperations(stopConditions), [] as OperationFinderMixinClass[])
                .reduce((operations, resource, index, resources) => {
                    if (previousResources.includes(resource)) return operations

                    const currentlyVisited = [...resources, ...previousResources, this]

                    return [
                        ...operations,
                        ...resource.getOperationsDeep(stopConditions, currentlyVisited),
                    ]
                }, this.operations)
        }

        public findOperations (...criteria: Criteria[]) {
            return this.__filterOperations(this.operations, criteria)
        }

        public findOperationsDeep (stopConditionOrCriteria?: Criteria | RecursiveStopConditions, ...moreCriteria: Criteria[]) {
            if (!stopConditionOrCriteria) {
                return this.getOperationsDeep()
            }

            if ('excludedProperties' in stopConditionOrCriteria) {
                return this.__filterOperations(this.getOperationsDeep(stopConditionOrCriteria), moreCriteria)
            }

            return this.__filterOperations(this.getOperationsDeep(), [ stopConditionOrCriteria, ...moreCriteria ])
        }

        public __filterOperations (operations: IOperation[], criteria: Criteria[]) {
            let actualCriteria = [...criteria]
            if (actualCriteria.length === 0) {
                actualCriteria.push({})
            }

            return operations.reduce((operations, operation) => {
                if (actualCriteria.find(createMatcher(operation))) {
                    operations.push(operation)
                }

                return operations
            }, [] as IOperation[])
        }
    }
}

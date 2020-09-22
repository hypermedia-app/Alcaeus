import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { NamedNode, Quad } from 'rdf-js'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'
import type { HydraResource, SupportedOperation } from '..'
import type { Operation } from '../Operation'

type Constraint<TExactMatch, TFuncMatch = TExactMatch> = (string | TExactMatch) | ((value: TFuncMatch) => boolean)

export interface Criteria {
    /**
     * Filters operations by exactly matching the HTTP method (case-insensitive)
     */
    byMethod?: Constraint<string>

    /**
     * Filters operations by exactly matching the hydra:expects annotation or via a custom check function.
     * The exact match can be ether a `Class` object or identifier
     */
    expecting?: Constraint<RdfResource | NamedNode, RdfResource>

    /**
     * Filters operations by exactly matching the hydra:returns annotation or via a custom check function.
     * The exact match can be ether a `Class` object or identifier
     */
    returning?: Constraint<RdfResource | NamedNode, RdfResource>

    /**
     * Filters operations by exactly matching supported operation's id or types, or by
     * executing a custom function against the supported operation
     */
    bySupportedOperation?: Constraint<NamedNode, SupportedOperation>
}

export interface RecursiveStopConditions {
    excludedProperties: (string | NamedNode | RdfResource)[]
}

/**
 * Provides methods to find operations in deeply nested resource graphs
 */
export interface OperationFinder {
    /**
     * Recursively gets operations from this resource and its children in the graph
     * @param condition allows to control which properties should be followed
     */
    getOperationsDeep (condition?: RecursiveStopConditions): Operation[]

    /**
     * Finds operations of this resource which match the given criteria
     * @param criteria zero or more criteria objects which filter out unwanted operations
     */
    findOperations (...criteria: Criteria[]): Operation[]

    /**
     * Finds operations of this resource and its children in graph, which match the given criteria
     * @param stopCondition (optional) allows to control which properties should be followed
     * @param moreCriteria zero or more criteria objects which filter out unwanted operations
     */
    findOperationsDeep (stopCondition: RecursiveStopConditions, ...moreCriteria: Criteria[]): Operation[]
    findOperationsDeep (...criteria: Criteria[]): Operation[]
}

function satisfies<T, TValue>(criteria: T | undefined, value: TValue, actualCheck: (expected: T, actual: TValue) => boolean) {
    if (!criteria || !value) {
        return true
    }

    return actualCheck(criteria, value)
}

function satisfiesMethod(criteria: Criteria, operation: Operation) {
    return satisfies(criteria.byMethod, operation.method, (expected, actual) => {
        if (typeof expected === 'string') {
            return expected.toUpperCase() === actual.toUpperCase()
        }

        return expected(actual)
    })
}

function matchClass(expected: Constraint<RdfResource | NamedNode, RdfResource>, actual: RdfResource) {
    if (typeof expected === 'string') {
        return actual.id.value === expected
    }

    if (typeof expected === 'function') {
        return expected(actual)
    }

    if ('id' in expected) {
        return expected.id.equals(actual.id)
    }

    return actual.id.equals(expected as NamedNode)
}

function satisfiesExpects(criteria: Criteria, operation: Operation) {
    return operation.expects.some(expects => satisfies(criteria.expecting, expects, matchClass))
}

function satisfiesReturns(criteria: Criteria, operation: Operation) {
    return satisfies(criteria.returning, operation.returns, matchClass)
}

function satisfiesTypeOrId(criteria: Criteria, operation: Operation) {
    return satisfies(criteria.bySupportedOperation, operation.supportedOperation, (expected, actual) => {
        if (typeof expected === 'string') {
            return actual.id.value === expected || actual.hasType(expected)
        }

        if ('termType' in expected) {
            return expected.equals(actual.id)
        }

        return expected(actual)
    })
}

function createMatcher(operation: Operation) {
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

const excludedProperties = (stopConditions: RecursiveStopConditions) => {
    const propertiesToExclude = stopConditions.excludedProperties.map(ex => {
        if (typeof ex === 'string') {
            return ex
        }

        if ('id' in ex) {
            return ex.id.value
        }

        return ex.value
    })

    return (quad: Quad) => {
        return !propertiesToExclude.includes(quad.predicate.value)
    }
}

function toResourceNodes <T extends RdfResource>(self: RdfResource, mixins) {
    return (nodes: T[], quad: Quad): T[] => {
        if (quad.object.termType === 'NamedNode' || quad.object.termType === 'BlankNode') {
            return [...nodes, self._create<T>(self.pointer.node(quad.object), mixins)]
        }

        return nodes
    }
}

export function OperationFinderMixin<TBase extends Constructor<HydraResource>>(Base: TBase) {
    return class OperationFinderClass extends Base implements OperationFinder {
        public getOperationsDeep(
            stopConditions: RecursiveStopConditions = { excludedProperties: [hydra.member, rdf.type] },
            previousResources: this[] = []) {
            const childResources = [...this.pointer.dataset.match(this.id, null, null, this._graphId)]
                .filter(excludedProperties(stopConditions))
                .reduce<this[]>(toResourceNodes(this, [OperationFinderMixin]), [])

            return childResources.reduce((operations, child, index, resources) => {
                if (previousResources.find(previous => previous.id.equals(child.id))) return operations

                const currentlyVisited = [...resources, ...previousResources, this]

                const childOps = child.getOperationsDeep(stopConditions, currentlyVisited)
                return [
                    ...operations,
                    ...childOps,
                ]
            }, this.operations || [])
        }

        public findOperations(...criteria: Criteria[]) {
            return this.__filterOperations(this.operations, criteria)
        }

        public findOperationsDeep(stopConditionOrCriteria?: Criteria | RecursiveStopConditions, ...moreCriteria: Criteria[]) {
            if (!stopConditionOrCriteria) {
                return this.__filterOperations(this.getOperationsDeep())
            }

            if ('excludedProperties' in stopConditionOrCriteria) {
                return this.__filterOperations(this.getOperationsDeep(stopConditionOrCriteria), moreCriteria)
            }

            return this.__filterOperations(this.getOperationsDeep(), [stopConditionOrCriteria, ...moreCriteria])
        }

        public __filterOperations(operations: Operation[], criteria: Criteria[] = []) {
            const actualCriteria = [...criteria]
            if (actualCriteria.length === 0) {
                actualCriteria.push({})
            }

            return operations.reduce((operations, operation) => {
                if (actualCriteria.find(createMatcher(operation))) {
                    operations.push(operation)
                }

                return operations
            }, [] as Operation[])
        }
    }
}

OperationFinderMixin.shouldApply = true

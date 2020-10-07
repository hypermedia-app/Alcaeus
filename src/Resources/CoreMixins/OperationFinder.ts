import type { Resource } from '@rdfine/hydra'
import type { NamespaceBuilder } from '@rdfjs/namespace'
import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { NamedNode, Quad } from 'rdf-js'
import type { Operation } from '..'
import type { RuntimeOperation } from '../Operation'

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
    bySupportedOperation?: Constraint<NamedNode, Operation>
}

export interface RecursiveStopConditions {
    excludedProperties?: (string | NamedNode | RdfResource)[]
    namespaces: (string | NamespaceBuilder)[]
}

declare module '@tpluscode/rdfine' {
    /**
     * Provides methods to find operations in deeply nested resource graphs
     */
    export interface RdfResource {
        /**
         * Recursively gets operations from this resource and its children in the graph
         * @param condition allows to control which properties should be followed
         */
        getOperationsDeep (condition?: RecursiveStopConditions): RuntimeOperation[]

        /**
         * Finds operations of this resource which match the given criteria
         * @param criteria zero or more criteria objects which filter out unwanted operations
         */
        findOperations (...criteria: Criteria[]): RuntimeOperation[]

        /**
         * Finds operations of this resource and its children in graph, which match the given criteria
         * @param stopCondition (optional) allows to control which properties should be followed
         * @param moreCriteria zero or more criteria objects which filter out unwanted operations
         */
        findOperationsDeep (stopCondition: RecursiveStopConditions, ...moreCriteria: Criteria[]): RuntimeOperation[]
    }
}

function satisfies<T, TValue>(criteria: T | undefined, value: TValue | undefined, actualCheck: (expected: T, actual: TValue) => boolean) {
    if (!criteria || !value) {
        return true
    }

    return actualCheck(criteria, value)
}

function satisfiesMethod(criteria: Criteria, operation: RuntimeOperation) {
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

function satisfiesExpects(criteria: Criteria, operation: RuntimeOperation) {
    if (operation.expects.length === 0) {
        return true
    }

    return operation.expects.some(expects => satisfies(criteria.expecting, expects, matchClass))
}

function satisfiesReturns(criteria: Criteria, operation: RuntimeOperation) {
    return satisfies(criteria.returning, operation.returns, matchClass)
}

function satisfiesTypeOrId(criteria: Criteria, operation: RuntimeOperation) {
    return satisfies(criteria.bySupportedOperation, operation.supportedOperation, (expected, actual) => {
        if (typeof expected === 'string') {
            return actual.id.value === expected || actual.hasType(expected)
        }

        if ('termType' in expected) {
            return actual.equals(expected) || actual.hasType(expected)
        }

        return expected(actual)
    })
}

function createMatcher(operation: RuntimeOperation) {
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

const onlyExplicitNamespaces = ({ namespaces = [] }: RecursiveStopConditions) => {
    const namespaceUris = namespaces.map(ns => typeof ns === 'string' ? ns : ns().value)

    return (quad: Quad) => namespaceUris.some(ns => quad.predicate.value.startsWith(ns))
}

const excludedProperties = ({ excludedProperties = [] }: RecursiveStopConditions) => {
    const propertiesToExclude = excludedProperties.map(ex => {
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

export function OperationFinderMixin<TBase extends Constructor<Resource>>(Base: TBase) {
    return class OperationFinderClass extends Base {
        public getOperationsDeep(
            stopConditions: RecursiveStopConditions = { namespaces: [] },
            previousResources: this[] = []) {
            const childResources = [...this.pointer.dataset.match(this.id, null, null, this._graphId)]
                .filter(onlyExplicitNamespaces(stopConditions))
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

        public findOperationsDeep(stopCondition: RecursiveStopConditions & Criteria, ...moreCriteria: Criteria[]) {
            return this.__filterOperations(this.getOperationsDeep(stopCondition), [stopCondition, ...moreCriteria])
        }

        public __filterOperations(operations: RuntimeOperation[], criteria: Criteria[] = []) {
            const actualCriteria = [...criteria]
            if (actualCriteria.length === 0) {
                actualCriteria.push({})
            }

            return operations.reduce((operations, operation) => {
                if (actualCriteria.find(createMatcher(operation))) {
                    operations.push(operation)
                }

                return operations
            }, [] as RuntimeOperation[])
        }
    }
}

OperationFinderMixin.shouldApply = true

import { expand } from '@zazuko/rdf-vocabularies'
import { Class, IHydraResource, IOperation } from '../../../src/Resources'
import { IOperationFinder, OperationFinder } from '../../../src/Resources/CoreMixins/OperationFinder'
import TypeCollection from '../../../src/TypeCollection'

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

class StubHydraResource implements IHydraResource {
    public constructor (operations: RecursivePartial<IOperation>[], obj: any = {}) {
        this.operations = operations as IOperation[]
        Object.assign(this, obj)
    }

    public get apiDocumentation () {
        return undefined
    }
    public readonly operations: IOperation[];

    public getCollections () {
        return []
    }

    public getLinks () {
        return []
    }

    public getProperties () {
        return []
    }

    public load () {
        return undefined
    }
}

class TestOperationFinder extends OperationFinder(StubHydraResource) {
    private static __counter = 0
    public id = ++TestOperationFinder.__counter

    // eslint-disable-next-line no-useless-constructor
    public constructor (operations: RecursivePartial<IOperation>[], obj?: any) {
        super(operations, obj)
    }
}

describe('OperationFinder', () => {
    describe('getOperationsDeep', () => {
        it('finds operations from children', () => {
            // given
            const topLevel = new TestOperationFinder([ {} ], {
                child: new TestOperationFinder([ {} ], {
                    child: new TestOperationFinder([ {} ]),
                }),
            }) as IOperationFinder

            // when
            const operations = topLevel.getOperationsDeep()

            // then
            expect(operations).toHaveLength(3)
        })

        it('handles cycled resource graphs', () => {
            // given
            const innerChild = new TestOperationFinder([ { title: 'inner operation' } ])
            const child = new TestOperationFinder([ { title: 'child operation' } ], { innerChild })
            const topLevel = new TestOperationFinder([ { title: 'root operation' } ], {
                child,
            })
            child['cycle'] = topLevel
            innerChild['cycle'] = topLevel

            // when
            const operations = topLevel.getOperationsDeep()

            // then
            expect(operations).toHaveLength(3)
        })

        it('excludes objects of hydra:member property by default', () => {
            // given
            const topLevel = new TestOperationFinder([ ], {
                [expand('hydra:member')]: new TestOperationFinder([ {} ], {
                    child: new TestOperationFinder([ {} ]),
                }),
            })

            // when
            const operations = topLevel.getOperationsDeep()

            // then
            expect(operations).toHaveLength(0)
        })

        it('excludes nothing when excludedProperties is empty', () => {
            // given
            const topLevel = new TestOperationFinder([ ], {
                [expand('hydra:member')]: new TestOperationFinder([ {} ], {
                    child: new TestOperationFinder([ {} ]),
                }),
            })

            // when
            const operations = topLevel.getOperationsDeep({
                excludedProperties: [],
            })

            // then
            expect(operations).toHaveLength(2)
        })

        it('excludes provided properties', () => {
            // given
            const topLevel = new TestOperationFinder([ ], {
                child: new TestOperationFinder([ {} ], {
                    child: new TestOperationFinder([ {} ]),
                }),
            })

            // when
            const operations = topLevel.getOperationsDeep({
                excludedProperties: ['child'],
            })

            // then
            expect(operations).toHaveLength(0)
        })
    })

    describe('findOperations', () => {
        it('returns all non-GET operations if no method criteria are given', () => {
            // given
            const deleteOperation = { method: 'DELETE' }
            const getOperation = { method: 'GET' }
            const resource = new TestOperationFinder([
                deleteOperation, getOperation,
            ])

            // when
            const operations = resource.findOperations()

            // then
            expect(operations).toHaveLength(1)
            expect(operations).toContain(deleteOperation)
        })

        it('includes by case-insensitive method name', () => {
            // given
            const deleteOperation = { method: 'DELETE' }
            const getOperation = { method: 'GET' }
            const resource = new TestOperationFinder([
                deleteOperation, getOperation,
            ])

            // when
            const operations = resource.findOperations({
                byMethod: 'delete',
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations).toContain(deleteOperation)
        })

        it('includes by OR-ing multiple criteria', () => {
            // given
            const deleteOperation = { method: 'DELETE' }
            const getOperation = { method: 'GET' }
            const postOperation = { method: 'POST' }
            const resource = new TestOperationFinder([
                deleteOperation, getOperation, postOperation,
            ])

            // when
            const operations = resource.findOperations({
                byMethod: 'delete',
            }, {
                byMethod: 'POST',
            })

            // then
            expect(operations).toHaveLength(2)
            expect(operations).toContain(postOperation)
            expect(operations).toContain(deleteOperation)
        })

        it('includes by expected class id', () => {
            // given
            const deleteOperation = { expects: { id: expand('owl:Nothing') } }
            const getOperation = { expects: { id: expand('owl:Nothing') } }
            const postOperation = { expects: { id: 'http://example.com/Person' } }
            const resource = new TestOperationFinder([
                deleteOperation, getOperation, postOperation,
            ])

            // when
            const operations = resource.findOperations({
                expecting: 'http://example.com/Person',
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations).toContain(postOperation)
        })

        it('excludes GET operations if not otherwise filtered explicitly', () => {
            // given
            const createOperation = (method): RecursivePartial<IOperation> => ({
                method,
                expects: { id: 'http://example.com/Foo' },
                returns: { id: 'http://example.com/Bar' },
                supportedOperation: {
                    id: 'http://example.com/Action',
                },
            })
            const deleteOperation = createOperation('delete')
            const getOperation = createOperation('get')
            const postOperation = createOperation('post')
            const patchOperation = createOperation('patch')
            const resource = new TestOperationFinder([
                deleteOperation, getOperation, postOperation, patchOperation,
            ])

            // when
            const operations = resource.findOperations({
                expecting: 'http://example.com/Foo',
            }, {
                returning: 'http://example.com/Bar',
            }, {
                bySupportedOperation: 'http://example.com/Action',
            })

            // then
            expect(operations).toHaveLength(3)
            expect(operations).not.toContain(getOperation)
        })

        it('includes by expected class instance', () => {
            // given
            const deleteOperation = { expects: { id: expand('owl:Nothing') } }
            const getOperation = { expects: { id: expand('owl:Nothing') } }
            const postOperation = { expects: { id: 'http://example.com/Person' } }
            const resource = new TestOperationFinder([
                deleteOperation, getOperation, postOperation,
            ])

            // when
            const operations = resource.findOperations({
                expecting: {
                    id: expand('owl:Nothing'),
                } as Class,
            })

            // then
            expect(operations).toHaveLength(2)
            expect(operations).toContain(deleteOperation)
            expect(operations).toContain(getOperation)
        })

        it('includes by custom match function', () => {
            // given
            const deleteOperation = { expects: { id: expand('owl:Nothing') } }
            const putOperation = { expects: { id: 'http://example.com/NewPerson' } }
            const postOperation = { expects: { id: 'http://example.com/Person' } }
            const resource = new TestOperationFinder([
                deleteOperation, putOperation, postOperation,
            ])

            // when
            const operations = resource.findOperations({
                expecting: (clas: Class) => {
                    return clas.id.startsWith('http://example.com/')
                },
            })

            // then
            expect(operations).toHaveLength(2)
            expect(operations).toContain(postOperation)
            expect(operations).toContain(putOperation)
        })

        it('includes by exact id of supported operation', () => {
            // given
            const createOperation = (id: string): RecursivePartial<IOperation> => ({
                supportedOperation: { id, types: TypeCollection.create() },
            })
            const deleteOperation = createOperation('http://example.com/DeleteOp')
            const putOperation = createOperation('http://example.com/PutOp')
            const postOperation = createOperation('http://example.com/PostOp')
            const resource = new TestOperationFinder([
                deleteOperation, putOperation, postOperation,
            ])

            // when
            const operations = resource.findOperations({
                bySupportedOperation: 'http://example.com/DeleteOp',
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations).toContain(deleteOperation)
        })

        it('includes by exact type of supported operation', () => {
            // given
            const deleteOperation = { supportedOperation: { types: TypeCollection.create('http://example.com/DeleteOp') } }
            const putOperation = { supportedOperation: { types: TypeCollection.create('http://example.com/PutOp') } }
            const postOperation = { supportedOperation: { types: TypeCollection.create('http://example.com/PostOp') } }
            const resource = new TestOperationFinder([
                deleteOperation, putOperation, postOperation,
            ])

            // when
            const operations = resource.findOperations({
                bySupportedOperation: 'http://example.com/DeleteOp',
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations).toContain(deleteOperation)
        })

        it('includes callback with ISupportedOperation', () => {
            // given
            const deleteOperation = { supportedOperation: { custom: 'A' } }
            const putOperation = { supportedOperation: { custom: 'B' } }
            const postOperation = { supportedOperation: { custom: 'C' } }
            const resource = new TestOperationFinder([
                deleteOperation, putOperation, postOperation,
            ])

            // when
            const operations = resource.findOperations({
                bySupportedOperation: supportedOperation => {
                    return supportedOperation.custom === 'A' ||
                     supportedOperation.custom === 'C'
                },
            })

            // then
            expect(operations).toHaveLength(2)
            expect(operations).toContain(deleteOperation)
            expect(operations).toContain(postOperation)
        })
    })

    describe('findOperationsDeep', () => {
        it('called without parameters finds operations from children', () => {
            // given
            const topLevel = new TestOperationFinder([ {} ], {
                child: new TestOperationFinder([ {} ], {
                    child: new TestOperationFinder([ {} ]),
                }),
            }) as IOperationFinder

            // when
            const operations = topLevel.findOperationsDeep()

            // then
            expect(operations).toHaveLength(3)
        })

        it('uses first parameter to stop optionally drilling down', () => {
            // given
            const topLevel = new TestOperationFinder([ { method: 'delete' }, { method: 'post' } ], {
                child: new TestOperationFinder([ { method: 'delete' }, { method: 'post' } ], {
                    child: new TestOperationFinder([ { method: 'delete' }, { method: 'post' } ]),
                }),
            })

            // when
            const operations = topLevel.findOperationsDeep({
                excludedProperties: ['child'],
            })

            // then
            expect(operations).toHaveLength(2)
        })

        it('filters operations by criteria', () => {
            // given
            const getOp = { method: 'get' }
            const postOp = { method: 'post' }
            const topLevel = new TestOperationFinder([ getOp, postOp ], {
                child: new TestOperationFinder([ getOp, postOp ], {
                    child: new TestOperationFinder([ getOp, postOp ]),
                }),
            })

            // when
            const operations = topLevel.findOperationsDeep({
                byMethod: 'get',
            })

            // then
            expect(operations).toHaveLength(3)
            expect(operations).toStrictEqual([ getOp, getOp, getOp ])
        })
    })
})

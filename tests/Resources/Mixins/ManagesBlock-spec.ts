import { Core } from '../../../src/Constants'
import { ApiDocumentation, RdfProperty } from '../../../src/Resources'
import Resource from '../../../src/Resources/HydraResource'
import { Mixin, shouldApply } from '../../../src/Resources/Mixins/ManagesBlock'
import { IResource } from '../../../src/Resources/Resource'
import TypeCollection from '../../../src/TypeCollection'
import { rdf } from '../../../src/Vocabs'

class ManagesBlock extends Mixin(Resource(null, () => [])) {}

describe('ManagesBlock', () => {
    describe('shouldApply', () => {
        it('should return true if resource is object of hydra:manages property', () => {
            // given
            const res = {
                _reverseLinks: [{
                    predicate: Core.Vocab('manages'),
                    subject: null,
                    subjectId: null,
                }],
            }

            // when
            const result = shouldApply(res)

            // then
            expect(result).toBeTruthy()
        })
    })

    describe('Mixin', () => {
        describe('object', () => {
            it('returns class from ApiDocumentation', () => {
                // given
                const clas = {}
                const apiDoc = {
                    getClass: () => clas,
                } as any as ApiDocumentation
                const resource = {
                    [Core.Vocab('object')]: {
                        id: 'http://vocab/class',
                    },
                }
                const mb = new ManagesBlock(resource, apiDoc)

                // when
                const obj = mb.object

                // then
                expect(obj).toBe(clas)
            })

            it('returns class from representation if missing in ApiDocumentation', () => {
                // given
                const clas = {
                    id: 'http://vocab/class',
                }
                const apiDoc = {
                    getClass: () => null,
                } as any as ApiDocumentation
                const resource = {
                    [Core.Vocab('object')]: clas,
                }
                const mb = new ManagesBlock(resource, apiDoc)

                // when
                const obj = mb.object

                // then
                expect(obj).toBe(clas)
            })

            it('returns null if not on object', () => {
                // given
                const apiDoc = {
                    getClass: () => null,
                } as any as ApiDocumentation
                const resource = {
                    [Core.Vocab('object')]: null,
                }
                const mb = new ManagesBlock(resource, apiDoc)

                // when
                const obj = mb.object

                // then
                expect(obj).toBeNull()
            })
        })

        describe('subject', () => {
            it('returns rdf:subject', () => {
                // given
                const value = {
                    id: 'http://example.org/term',
                } as any
                const resource = {
                    [Core.Vocab('subject')]: value,
                }
                const mb = new ManagesBlock(resource, {} as any as ApiDocumentation)

                // when
                const obj = mb.subject

                // then
                expect(obj).toBe(value)
            })
        })

        describe('predicate', () => {
            it('returns rdf:subject', () => {
                // given
                const value = {
                    id: 'http://example.org/predicate',
                } as any
                const resource = {
                    [Core.Vocab('property')]: value,
                }
                const mb = new ManagesBlock(resource, {} as any as ApiDocumentation)

                // when
                const obj = mb.property

                // then
                expect(obj).toBe(value)
            })
        })

        describe('matches', () => {
            const apiDoc = {
                getClass: (id) => ({ id }),
            } as any as ApiDocumentation

            describe('by class type', () => {
                it('returns true when object is string found of the rdf:object resource', () => {
                    // given
                    const resource = {
                        [Core.Vocab('object')]: {
                            id: 'http://example.com/vocab#class',
                        },
                        [Core.Vocab('property')]: {
                            id: rdf.type,
                        },
                    }
                    const mb = new ManagesBlock(resource, apiDoc)

                    // when
                    const isMatch = mb.matches({
                        object: 'http://example.com/vocab#class',
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns true when object is resource with id of rdf:object resource', () => {
                    // given
                    const resource = {
                        [Core.Vocab('object')]: {
                            id: 'http://example.com/vocab#class',
                        },
                        [Core.Vocab('property')]: {
                            id: rdf.type,
                        },
                    }
                    const mb = new ManagesBlock(resource, apiDoc)

                    // when
                    const isMatch = mb.matches({
                        object: {
                            id: 'http://example.com/vocab#class',
                            isAnonymous: false,
                            supportedOperations: [],
                            supportedProperties: [],
                            types: TypeCollection.create(),
                        } as any,
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns false when predicate is not rdf:type', () => {
                    // given
                    const resource = {
                        [Core.Vocab('object')]: {
                            id: 'http://example.com/vocab#class',
                        },
                        [Core.Vocab('property')]: {
                            id: rdf.type,
                        },
                    }
                    const mb = new ManagesBlock(resource, apiDoc)

                    // when
                    const isMatch = mb.matches({
                        object: {
                            id: 'http://example.com/vocab#class',
                            isAnonymous: false,
                            supportedOperations: [],
                            supportedProperties: [],
                            types: TypeCollection.create(),
                        } as any,
                        predicate: 'http://some.other/property',
                    })

                    // then
                    expect(isMatch).toBeFalsy()
                })
            })

            describe('by subject and predicate type', () => {
                it('returns true if pattern is matching string object and string property', () => {
                    // given
                    const resource = {
                        [Core.Vocab('subject')]: {
                            id: 'http://example.com/person/Tomasz',
                        },
                        [Core.Vocab('property')]: {
                            id: 'http://xmlns.com/foaf/0.1/knows',
                        },
                    }
                    const mb = new ManagesBlock(resource, apiDoc)

                    // when
                    const isMatch = mb.matches({
                        predicate: 'http://xmlns.com/foaf/0.1/knows',
                        subject: 'http://example.com/person/Tomasz',
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns true if pattern is matching string object and resource property', () => {
                    // given
                    const resource = {
                        [Core.Vocab('subject')]: {
                            id: 'http://example.com/person/Tomasz',
                        },
                        [Core.Vocab('property')]: {
                            id: 'http://xmlns.com/foaf/0.1/knows',
                        },
                    }
                    const mb = new ManagesBlock(resource, apiDoc)

                    // when
                    const isMatch = mb.matches({
                        predicate: {
                            id: 'http://xmlns.com/foaf/0.1/knows',
                        } as any as RdfProperty,
                        subject: 'http://example.com/person/Tomasz',
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns true if pattern is matching resource object and string property', () => {
                    // given
                    const resource = {
                        [Core.Vocab('subject')]: {
                            id: 'http://example.com/person/Tomasz',
                        },
                        [Core.Vocab('property')]: {
                            id: 'http://xmlns.com/foaf/0.1/knows',
                        },
                    }
                    const mb = new ManagesBlock(resource, apiDoc)

                    // when
                    const isMatch = mb.matches({
                        predicate: 'http://xmlns.com/foaf/0.1/knows',
                        subject: {
                            id: 'http://example.com/person/Tomasz',
                        } as any as IResource,
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns true if pattern is matching resource object and resource property', () => {
                    // given
                    const resource = {
                        [Core.Vocab('subject')]: {
                            id: 'http://example.com/person/Tomasz',
                        },
                        [Core.Vocab('property')]: {
                            id: 'http://xmlns.com/foaf/0.1/knows',
                        },
                    }
                    const mb = new ManagesBlock(resource, apiDoc)

                    // when
                    const isMatch = mb.matches({
                        predicate: {
                            id: 'http://xmlns.com/foaf/0.1/knows',
                        } as any as RdfProperty,
                        subject: {
                            id: 'http://example.com/person/Tomasz',
                        } as any as IResource,
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })
            })
        })
    })
})

import * as sinon from 'sinon';
import {Class} from "../src/ApiDocumentation";

describe('Class', () => {

    var hydraClass = { '@id': 'http://example.com/vocab#SomeClass' };

    it('should access ApiDocumentation to retrieve it\'s supported operations', () => {
        var getOperations = sinon.stub();
        var apiDoc = <IApiDocumentation>{
            getOperations: getOperations
        };
        var clas = new Class(hydraClass, apiDoc);

        clas.getSupportedOperations();

        expect(getOperations.calledWithExactly('http://example.com/vocab#SomeClass')).toBe(true);
    });

    it('should access ApiDocumentation to retrieve it\'s supported properties', () => {
        var getProperties = sinon.stub();
        var apiDoc = <IApiDocumentation>{
            getProperties: getProperties
        };
        var clas = new Class(hydraClass, apiDoc);

        clas.getSupportedProperties();

        expect(getProperties.calledWithExactly('http://example.com/vocab#SomeClass')).toBe(true);
    });

    describe('getting operations', () => {

        it('should get operation\'s method and description given a type', () => {

            var docs = new ApiDocumentation(heracles, Documentations.classWithOperation);

            var op = docs.getOperations('http://example.com/api#Class');
            expect(op[0].description).toBe('Gets the api#Class');
            expect(op[0].method).toBe('GET');
        });

        it('should return empty array for missing supported class', () => {
            var docs = new ApiDocumentation(heracles, Documentations.classWithOperation);

            var ops = docs.getOperations('http://example.com/api#UndomcumentedClass');
            expect(_.isArray(ops)).toBe(true);
            expect(ops.length).toBe(0);
        });

    });

    describe('getting properties', () => {

        it('should get properties for a given class type', () => {

            var docs = new ApiDocumentation(heracles, Documentations.classWithOperation);

            var props = docs.getProperties('http://example.com/api#Class');
            expect(props.length).toBe(2);
        });

        it('should return empty array for missing supported class', () => {
            var docs = new ApiDocumentation(heracles, Documentations.classWithOperation);

            var props = docs.getProperties('http://example.com/api#UndomcumentedClass');
            expect(_.isArray(props)).toBe(true);
            expect(props.length).toBe(0);
        });

    });

});
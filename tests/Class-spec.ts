import * as sinon from 'sinon';
import {Class, ApiDocumentation} from "../src/ApiDocumentation";

describe('Class', () => {

    var hydraClass = { '@id': 'http://example.com/vocab#SomeClass' };

    it('should access ApiDocumentation to retrieve it\'s supported operations', () => {

        var apiDoc = <IApiDocumentation>sinon.createStubInstance(ApiDocumentation);
        var clas = new Class(hydraClass, apiDoc);

        clas.getSupportedOperations();

        expect(apiDoc.getOperations.calledWithExactly('http://example.com/vocab#SomeClass')).toBe(true);
    });

    it('should access ApiDocumentation to retrieve it\'s supported properties', () => {

        var apiDoc = <IApiDocumentation>sinon.createStubInstance(ApiDocumentation);
        var clas = new Class(hydraClass, apiDoc);

        clas.getSupportedProperties();

        expect(apiDoc.getProperties.calledWithExactly('http://example.com/vocab#SomeClass')).toBe(true);
    });

});
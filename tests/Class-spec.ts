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

});
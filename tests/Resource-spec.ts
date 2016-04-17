/// <reference path="../typings/main.d.ts" />

import * as sinon from 'sinon';
import {Resource} from '../src/Resources';
import {Bodies} from './test-objects';

describe('Resource', () => {

    describe('getOperations', () => {

        it('should combine operations from class and property', done => {
            var apiDoc = <IApiDocumentation>{
                getOperations: sinon.stub()
            };
            apiDoc.getOperations.returns(Promise.resolve([]));
            var resource = new Resource(Bodies.someJsonLdExpanded, apiDoc, [
                ['http://example.com/vocab#Resource', 'http://example.com/vocab#other']
            ]);

            resource.getOperations()
                .then(() => {
                    expect(apiDoc.getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
                    expect(apiDoc.getOperations.calledWithExactly('http://example.com/vocab#Resource', 'http://example.com/vocab#other')).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

    });
});
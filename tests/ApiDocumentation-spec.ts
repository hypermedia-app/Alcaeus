/// <reference path="../typings/main.d.ts" />
/// <reference path="../heracles.d.ts" />

import * as sinon from 'sinon';
import {ApiDocumentation} from '../src/heracles';
import {Documentations} from './test-objects';
import {promises as jsonld} from 'jsonld';

describe('ApiDocumentation', () => {
    
    describe('getOperation', () => {
        
        it('should get operation\'s method and description given a type', done => {
            
            var docs = new ApiDocumentation(Documentations.classWithOperation);

            var op = docs.getOperations('http://example.com/api#Class')
                .then(op => {
                    expect(op[0].description).toBe('Gets the api#Class');
                    expect(op[0].method).toBe('GET');
                    done();
                })
                .catch(done.fail);
        });
        
    });
    
});
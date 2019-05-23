import {Vocab} from '../src';

describe('Vocab', () => {
    it('returns base URI if called with no params', () => {
        // when
        const iri = Vocab();

        // then
        expect(iri).toEqual('http://www.w3.org/ns/hydra/core#');
    });
});

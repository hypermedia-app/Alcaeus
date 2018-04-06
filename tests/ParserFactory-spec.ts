import {MediaTypes} from '../src/Constants';
import {ParserFactory} from '../src/ParserFactory';

describe('ParserFactory', () => {
   let parserFactory: ParserFactory;

   beforeEach(() => {
       parserFactory = new ParserFactory();
   });

   it('should be initialized with JSON-LD parser', () => {
       // when
       const parsers = parserFactory.create('http://base.uri');

       // then
       expect(parsers[MediaTypes.jsonLd]).toBeDefined();
   });
});

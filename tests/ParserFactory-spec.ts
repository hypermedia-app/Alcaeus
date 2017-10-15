import {ParserFactory} from '../src/ParserFactory';
import {MediaTypes} from '../src/Constants';

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
   })
});

import * as JsonLdParser from 'rdf-parser-jsonld';
import * as $rdf from 'rdf-ext';
import {MediaTypes} from './Constants';

interface ParserFactoryMethod {
    (baseIRI: string): any;
}

export class ParserFactory {
    private parsers: { [index: string] : ParserFactoryMethod } = {};

    constructor() {
        this.addParser(MediaTypes.jsonLd, JsonLdParser);
    }

    addParser(mediaType: string, parserClass) {
        this.parsers[mediaType] = (uri: string) => new parserClass({
            factory: $rdf,
            baseIRI: uri
        })
    }

    create(baseIRI: string) {
        const parsersInit = Object.entries(this.parsers)
                                  .reduce((result, value) => {
                                    result[value[0]] = value[1](baseIRI);
                                    return result;
                                  }, {});

        return new $rdf.Parsers(parsersInit);
    }
}

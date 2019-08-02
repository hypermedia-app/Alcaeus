import * as JsonLdParser from '@rdfjs/parser-jsonld'
import * as $rdf from 'rdf-ext'
import { MediaTypes } from './Constants'

type ParserFactoryMethod = (baseIRI?: string) => any;

export class ParserFactory {
    private parsers: { [index: string]: ParserFactoryMethod } = {};

    public constructor () {
        this.addParser(MediaTypes.jsonLd, JsonLdParser)
    }

    public addParser (mediaType: string, ParserClass) {
        this.parsers[mediaType] = (uri?: string) => new ParserClass({
            baseIRI: uri,
            factory: $rdf,
        })
    }

    public create (baseIRI?: string) {
        const parsersInit = Object.entries(this.parsers)
            .reduce((result, value) => {
                result[value[0]] = value[1](baseIRI)
                return result
            }, {})

        return new $rdf.Parsers(parsersInit)
    }
}

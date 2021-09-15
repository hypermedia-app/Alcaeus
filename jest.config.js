module.exports = {
    roots: ['<rootDir>'],
    testRegex: 'tests/.+-(test|spec)\\.tsx?$',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    moduleNameMapper: {
        '@rdf-esm/(.*)': '@rdfjs/$1',
        'es6-url-template': 'es6-url-template/url-template.cjs',
        'rdf-literal': '<rootDir>/tests/helpers/rdfLiteral.cjs',
    },
}

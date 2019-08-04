module.exports = {
    roots: ['<rootDir>'],
    testRegex: 'tests/.+-(test|spec)\\.tsx?$',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
}
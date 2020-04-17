/* eslint-disable */
const Alcaeus = require('.')
const { parsers } = require('@rdfjs/formats-common')

const client = Alcaeus.create({
    parsers,
})

module.exports = client

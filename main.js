/* eslint-disable no-global-assign,@typescript-eslint/no-var-requires */
require('isomorphic-fetch')
require('isomorphic-form-data')
require = require('esm')(module)
module.exports = require('./index')

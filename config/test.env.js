/* /config/test.env.js */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"test"',
    API_HOST: '"http://192.168.1.174:6102/"'
})
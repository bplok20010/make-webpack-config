const {
    normalizeConfig,
    getDepsFromConfig,
    createWebpackConfig
} = require('./lib');

const build = require('./scripts/build');
const server = require('./scripts/server');
const start = require('./scripts/start');
const utils = require('./scripts/utils');

module.exports = {
    normalizeConfig,
    initWebpackConfig: utils.init,
    getDepsFromConfig,
    createWebpackConfig,
    build,
    server,
    start,
}


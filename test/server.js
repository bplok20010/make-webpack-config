
const path = require('path')
const server = require('../scripts/server')

const cfg = {
    mode: "development",
    cleanDist: true,
    watch: true,
    appPath: path.resolve(process.cwd(), 'test'),
    module: {
        less: false,
        sass: true,
        vue: true,
    }
};

server(cfg);
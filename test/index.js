
const path = require('path');

const start = require('../scripts/build')

const cfg = {
    mode: "development",
    cleanDist: true,
    watch: true,
    devServer: true,
    appPath: path.resolve(process.cwd(), 'test'),
    module: {
        less: false,
        sass: true,
        vue: true,
    }
};

start(cfg);

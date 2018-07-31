const path = require('path');
const fs = require('fs');

function isProd() {
    return process.env.NODE_ENV === 'production';
}

function resolveCwd(relativePath) {
    const appRoot = fs.realpathSync(process.cwd());
    return path.resolve(appRoot, relativePath);
}

function resolveApp(relativePath) {
    const appRoot = fs.realpathSync(process.cwd());
    return path.resolve(appRoot, relativePath);
}


function getCustomFileData() {
    const appRoot = fs.realpathSync(process.cwd());
    const customFilePath = path.join(appRoot, 'nil.build.config.js');
    let customConfig;
    if (fs.existsSync(customFilePath)) {
        customConfig = require(customFilePath);
        if (typeof customConfig === 'function') {
            customConfig = customConfig(process.env.NODE_ENV, resolveApp);
        }
    }

    return customConfig || {};
}

let customConfig = null;
function getCustomConfig() {
    return customConfig || {};
}

function setCustomConfig(config) {
    customConfig = config;
    return customConfig;
}

let babelCustomConfig = null;
function getBabelCustomConfig() {
    if (babelCustomConfig) return babelCustomConfig;

    const appRoot = fs.realpathSync(process.cwd());
    const customFilePath = path.join(appRoot, '.babelrc');

    if (fs.existsSync(customFilePath)) {
        babelCustomConfig = fs.readFileSync(customFilePath);
        babelCustomConfig = JSON.parse(babelCustomConfig);
    }

    return babelCustomConfig || {};
}

function resolveCustomESlintFile() {
    const appRoot = fs.realpathSync(process.cwd());
    return path.join(appRoot, '.eslintrc.json');
}

function customESlintFileExists() {
    return fs.existsSync(resolveCustomESlintFile());
}

module.exports = {
    isProd,
    resolveApp,
    getCustomConfig,
    resolveCustomESlintFile,
    customESlintFileExists,
    getBabelCustomConfig,
    setCustomConfig,
    getCustomFileData,
    resolveCwd,
}
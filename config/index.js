const merge = require("webpack-merge");
const child_process = require('child_process');
const path = require('path');
//const webpackConfig = require('./webpack.config');
const util = require('./util');

/**
 * 检测依赖信息
 */
function checkDepsInstall(cfg) {
    const deps = new Set(cfg.dependencies.core);
    const pkg = require(path.resolve(cfg.appPath, cfg.appPackage));

    const pkgDeps = Object.assign(pkg.dependencies, pkg.devDependencies);

    Object.keys(cfg.module).filter(v => v).forEach(v => {
        if (cfg.dependencies[v]) {
            cfg.dependencies[v].forEach(dep => {
                if (!(dep in pkgDeps)) deps.add(dep)
            });
        }
    });

    return [...deps];
}

module.exports = function (cfg = {}) {
    const opts = merge({
        appPath: util.resolveCwd("."),
        appSrc: "src",
        appPackage: "package.json",
        appDist: "dist",
        publicUrl: "",
        devtool: "source-map",
        appPolyfills: require.resolve('./polyfills.js'),
        appEntryJs: "index.js",
        appEntryHtml: "index.html",
        assest: {
            css: {
                name: "[name].[contenthash: 8].css",
                output: "static/css",
            },
            js: {
                name: "[name].[chunkhash:8].js",
                chunkName: "[name].[chunkhash:8].chunk.js",
                output: "static/js"
            },
            media: {
                name: "[name].[hash:8].[ext]",
                regexp: /\.(?:png|jpe?g|gif|bmp)$/,
                output: "static/media",
                limit: 8192,
            }
        },
        clean: {
            enable: false,
        },
        IgnorePlugin: [/^\.[\\/]locale$/, /moment$/],
        //启用模块
        "module": {
            "babel": true,
            "css": true,
            "less": true,
            "sass": true,
            "eslint": false,
            "json5": true,
            "jsx": true,
            "vue": false,
        },
        //模块依赖文件
        "dependencies": {
            "core": [
                "webpack",
                "webpack-merge",
                "file-loader",
                "raw-loader",
                "url-loader",
                "extract-loader",
                "webpack-manifest-plugin",
                "html-webpack-plugin",
            ],
            "babel": [
                "babel-core",
                "babel-loader",
                "babel-runtime",
                "babel-plugin-syntax-dynamic-import",
                "babel-plugin-transform-async-generator-functions",
                "babel-plugin-transform-async-to-generator",
                "babel-plugin-transform-class-properties",
                "babel-plugin-transform-do-expressions",
                "babel-plugin-transform-export-extensions",
                "babel-plugin-transform-function-bind",
                "babel-plugin-transform-object-assign",
                "babel-plugin-transform-object-rest-spread",
                "babel-plugin-transform-proto-to-assign",
                "babel-plugin-transform-regenerator",
                "babel-plugin-transform-runtime",
                "babel-preset-env",
                "babel-preset-flow",
            ],
            "jsx": [
                "babel-preset-react",
                "babel-plugin-transform-react-jsx"
            ],
            "css": [
                "css-loader",
                "postcss-loader",
                "mini-css-extract-plugin",
                "postcss-flexbugs-fixes precss",
                "autoprefixer",
            ],
            "less": [
                "less",
                "less-loader",
            ],
            "sass": [
                "node-sass",
                "sass-loader"
            ],
            "eslint": [
                "eslint",
                "babel-eslint",
                "eslint-config-alloy",// ??
            ],
            "json5": [
                "json5-loader"
            ],
            "vue": [
                "vue-loader"
            ]
        }
    }, cfg);

    const deps = checkDepsInstall(opts)


    console.log("检测%d依赖尚未安装, 开始安装...", deps.length);

    deps.forEach(dep => {
        const cmd = 'npm install --save ' + dep;
        console.log('开始安装依赖：%s', cmd);
        child_process.execSync(cmd);
    });
    //return webpackConfig(opts);
}
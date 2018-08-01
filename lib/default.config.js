const util = require('./util');

module.exports = {
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
    manifest: {
        enableMode: 'production',
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
    }
};
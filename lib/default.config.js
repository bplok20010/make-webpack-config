const util = require('./util');

module.exports = {
    __init__: true,
    mode: 'development', // development  production
    appPath: util.resolveCwd("."),
    appSrc: "src",
    //appPackage: "package.json",
    appDist: "dist",
    publicUrl: "",
    devtool: "source-map",
    appPolyfills: require.resolve('./polyfills.js'),
    appEntryJs: "index.js",
    appEntryHtml: "index.html",
    appEntryHtmlOpts: {},
    banner: '',
    assest: {
        css: {
            name: "[name].[contenthash:8].css",
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
    cleanDist: false,
    manifest: {
        enableMode: 'production',
    },
    babelConfig: {},//扩展babel
    eslintFile: '', //自定义eslint配置文件
    IgnorePlugin: [/^\.[\\/]locale$/, /moment$/],
    DefinePlugin: {},
    BannerPlugin: null,
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
    watch: false,
    // watchOptions: {},
    devServer: {},
};
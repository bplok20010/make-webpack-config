# make-webpack-config
生成webpack配置信息

`npm install --save-dev make-webpack-config`

## 参数:
```
{
    mode: 'development', // development  production
    appPath: util.resolveCwd("."), // 项目目录
    appSrc: "src",  //项目Src目录
    appDist: "dist", // 项目输出目录
    publicUrl: "", // webpack output.publicUrl
    devtool: "source-map",
    appPolyfills: require.resolve('./polyfills.js'),
    appEntryJs: "index.js", //   src/index.js
    appEntryHtml: "index.html", // src/index.html
    appEntryHtmlOpts: {},
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
        "json5": true,
        "jsx": true,
        "eslint": false,
        "vue": false,
    },
    watch: false,
    // watchOptions: {},
    devServer: {},
}
```

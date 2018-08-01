const browsers = require('./browserslist.config');
const util = require('./util');
const merge = require('webpack-merge');

module.exports = function (cfg) {
    const useJSX = cfg.module.jsx;

    const presets = [
        [require.resolve('babel-preset-env'), {
            "targets": {
                "ie": 9,
                "browsers": browsers
            },
            useBuiltIns: false,
        }],
        useJSX ? require.resolve('babel-preset-react') : null,
        require.resolve('babel-preset-flow')
    ];

    return merge({
        "babelrc": false,
        "compact": false,
        "presets": presets.filter(v => v),
        "plugins": [
            require.resolve("babel-plugin-syntax-dynamic-import"),
            require.resolve("babel-plugin-transform-async-generator-functions"),
            require.resolve("babel-plugin-transform-async-to-generator"),
            require.resolve("babel-plugin-transform-class-properties"),
            require.resolve("babel-plugin-transform-do-expressions"),
            require.resolve("babel-plugin-transform-export-extensions"),
            require.resolve("babel-plugin-transform-function-bind"),
            require.resolve("babel-plugin-transform-object-assign"),
            require.resolve("babel-plugin-transform-object-rest-spread"),
            useJSX ? require.resolve("babel-plugin-transform-react-jsx") : null,
            require.resolve("babel-plugin-transform-regenerator"),
            //"transform-proto-to-assign",//IE10以下不支持__proto__
            [require.resolve("babel-plugin-transform-runtime"), {
                helpers: true,
                polyfill: true,
                regenerator: true,
            }]
        ].filter(v => v)
    }, util.getBabelCustomConfig())

}
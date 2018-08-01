module.exports = {
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
        "precss",
        "postcss-flexbugs-fixes",
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
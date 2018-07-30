const browsers = require('./browserslist.config');
const autoprefixer = require('autoprefixer');

module.exports = {
    ident: 'postcss',
    plugins: [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
            browsers: browsers,
            flexbox: 'no-2009',
        }),
    ]
}
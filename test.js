const createWebpackConfig = require('./config');

console.log(createWebpackConfig({
    module: {
        less: false,
        sass: false,
    }
}));
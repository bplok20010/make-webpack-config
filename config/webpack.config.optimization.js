
module.exports = {
    runtimeChunk: false,//'single' false ,
    splitChunks: {
        name: 'commons',
        chunks: 'all',
        maxAsyncRequests: 5,  
        maxInitialRequests: 5,
        minSize: 30000,
        cacheGroups: {
            vendors: {
                name: "vendors",
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
        }
    }
};
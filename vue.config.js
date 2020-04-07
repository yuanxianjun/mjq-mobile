const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    baseUrl: './',
    lintOnSave: false,
    outputDir: 'dist/mjqMobile',
    productionSourceMap: false,

    devServer: {
        open: true,
        hot: true,
        compress: true, //服务器压缩

        // before: function (app, server) {
        //     app.get('/', function (req, res) {   
        //         res.redirect('/IMapManagement.html');
        //     });        // }
        historyApiFallback: {
            rewrites: [{
                from: /^\/$/,
                to: '/index.html'
            },
            {
                from: /^\/index/,
                to: "/index.html"
            },
            ]
        },

    },
    configureWebpack: config => {
        if (isProduction) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',//压缩算法得功能
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配对应得文件
                threshold: 1024, //只处理比这个值大的资源。按字节计算。
                minRatio: 0.8 //只有压缩率比0.8大才开始压缩
            }))
        }
    },
    pages: {
        //index
        'index': {
            entry: 'src/mjqMobile/index/index.js',
            template: 'src/mjqMobile/index/index.html',
            filename: 'index.html'
        },

    }
}
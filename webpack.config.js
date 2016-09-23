var webpack = require('webpack');

var config = {
    entry: [
      'webpack/hot/only-dev-server',
      './project/app.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ],

        loaders: [
            {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader',
              exclude: /(node_modules)/
            },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    devServer: {
        port: 9000,
        // https://github.com/rackt/react-router/issues/676
        // this fixes routing in newer versions
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;

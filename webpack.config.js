const path = require('path');
const outputPath = path.join(__dirname, 'dist/')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    module: {
        rules: [
            {
                test: /\.(jpg|png)$/,
                loaders: 'url-loader'
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: 'img/',
                    to: 'img/'
                },
            ],
            { context: 'src/' }
        ),
        new CopyWebpackPlugin(
            [
                {
                    from: 'index.html',
                    to: 'index.html'
                },
            ],
            { context: 'src/' }
        )
    ],
    output: {
        filename: 'bundle.js',
        path: outputPath
    },
    devServer: {
        contentBase: outputPath
    }
};
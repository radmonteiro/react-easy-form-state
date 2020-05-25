const HtmlWebPackPlugin = require("html-webpack-plugin");





module.exports = {
    entry: './example/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ "@babel/preset-env", "@babel/preset-react" ],
                        plugins: [ "@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties" ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader'
                ],
            }

        ]
    },
    // Only to use in development
    optimization: {
        minimize: false
    },
    devServer: {
        hot: true,
        port: 8089,
        open: false,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./example/index.html",
            filename: "./index.html",
            contentBase: "./example"
        })
    ],

    devtool:"eval-source-map"

};

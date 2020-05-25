const path = require('path');
const pkg = require('./package.json');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/index.js",

    target: 'node',
    externals: [nodeExternals()],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js",
        library: pkg.name,
        libraryTarget: "commonjs2"
    },

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
                    loader: "babel-loader",
                    options: {
                        presets: [ "@babel/preset-env", "@babel/preset-react" ],
                        plugins: [ "@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties", "react-hot-loader/babel" ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ],
    }
};

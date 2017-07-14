/**
 * Configuration for Webpack.
 */

import webpack from 'webpack';

import path from 'path';

import config from './general';
import isProduction from '../helpers/build';


const sourcePath = path.resolve(config.root.dev, config.javascript.dev);
const distPath = path.resolve(config.root.dist, config.javascript.dist);


const plugins = [];


plugins.push(new webpack.NoEmitOnErrorsPlugin());

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendors.min.js'
}));


if (isProduction()) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.NoEmitOnErrorsPlugin()
    );
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}


const webpackConfig = {
    cache: true,
    context: sourcePath,
    entry: {
        app: './app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules/'),
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {
                        modules: false
                    }]]
                }
            }
        ]
    },
    output: {
        path: distPath,
        filename: 'app.min.js',
        publicPath: config.javascript.dist
    },
    resolve: {
        modules: [sourcePath, 'node_modules'],
        extensions: config.javascript.extensions
    },
    plugins: plugins
};


export default webpackConfig;

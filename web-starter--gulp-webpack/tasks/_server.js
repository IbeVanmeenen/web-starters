/**
 * Server
 */

import gulp from 'gulp';
import browserSync from 'browser-sync';
import path from 'path';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config/general';
import isProduction from './helpers/build';
import webpackConfig from './config/webpack';


const compiler = webpack(webpackConfig);
const serverConfig = {
    port: 8080,
    ui: {
        port: 8081
    },
    server: {
        baseDir: config.root.dist,
    },
    tunnel: false
};

if (!isProduction()) {
    serverConfig.middleware = [
        webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: path.join('/', webpackConfig.output.publicPath),
            stats: 'errors-only'
        }),
        webpackHotMiddleware(compiler)
    ];
}


const server = () => {
    browserSync.init(serverConfig);
};


export default server;

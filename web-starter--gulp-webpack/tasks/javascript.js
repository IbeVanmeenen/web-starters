/**
 * Javascript
 */

import gulp from 'gulp';
import webpack from 'webpack';

import config from './config/general';
import webpackConfig from './config/webpack';
import {errorLogger, infoLogger} from './helpers/logger';


const javascript = (callback) => {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            errorLogger('Webpack', err);
        }

        infoLogger('Webpack', stats.toString({
            assets: true,
            chunks: false,
            chunkModules: false,
            colors: true,
            hash: false,
            timings: true,
            version: false
        }));

        callback();
    });
};


export default javascript;

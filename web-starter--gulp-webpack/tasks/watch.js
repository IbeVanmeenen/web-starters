/**
 * WATCHER
 */

import gulp from 'gulp';
import path from 'path';

import config from './config/general';


const watch = () => {
    const tasks = ['css', 'img'];
    let sourceFiles = [];

    for (task of tasks) {
        const watchFiles = path.join(config.root.dev, config[task].dev) + config[task].extensions;
        gulp.watch(watchFiles, task);
    }
};


export default watch;

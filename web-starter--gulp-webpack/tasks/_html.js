/**
 * HTML
 */

import gulp from 'gulp';
import path from 'path';

import config from './config/general';


const sourceFiles = path.join(config.root.dev, config.html.dev) + config.html.extensions;
const distPath = path.join(config.root.dist, config.html.dist);


const html = () => {
    return gulp.src(sourceFiles)

        // Set desitination
        .pipe(gulp.dest(distPath));
};


export default html;

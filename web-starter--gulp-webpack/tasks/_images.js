/**
 * Images
 */

import gulp from 'gulp';
import size from 'gulp-size';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';

import path from 'path';

import config from './config/general';


const sourceFiles = path.join(config.root.dev, config.images.dev) + config.images.extensions;
const distPath = path.join(config.root.dist, config.images.dist);


const images = () => {
    return gulp.src(sourceFiles)
        // Stop Plumber
        .pipe(plumber())

        // Only optimize changed images
        .pipe(changed(distPath))

        // Imagemin
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))

        // Stop Plumber
        .pipe(plumber.stop())

        // Set desitination
        .pipe(gulp.dest(distPath))

        // Show total size of images
        .pipe(size({
            title: 'images'
        }));
};


export default images;

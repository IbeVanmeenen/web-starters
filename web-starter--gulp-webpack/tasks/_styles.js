/**
 * CSS
 */

import gulp from 'gulp';
import rename from 'gulp-rename';
import size from 'gulp-size';
import plumber from 'gulp-plumber';

import path from 'path';
import browserSync from 'browser-sync';

import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssMqpacker from 'css-mqpacker';
import cssnano from 'cssnano';

import config from './config/general';
import errorLogger from './helpers/logger';


const postCssProcessors = [autoprefixer, cssMqpacker, cssnano];
const sourceFiles = path.join(config.root.dev, config.styles.dev) + config.styles.extensions;
const distPath = path.join(config.root.dist, config.styles.dist);


const styles = (done) => {

    return gulp.src(sourceFiles)
        // Start Plumber
        .pipe(plumber())

        // Sass
        .pipe(sass())

        // Post CSS (prefix, combine all mediaqueries and minify)
        .pipe(postcss(postCssProcessors))

        // Rename the file to respect naming covention.
        .pipe(rename((path) => {
            path.basename += '.min';
        }))

        // Stop Plumber
        .pipe(plumber.stop())

        // Write to output
        .pipe(gulp.dest(distPath))

        // Show total size of css
        .pipe(size({
            title: 'css'
        }))

        // Reload
        .pipe(browserSync.reload({
            stream: true
        }));
};


export default styles;

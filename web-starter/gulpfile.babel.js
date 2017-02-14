'use strict';

/* ==========================================================================
   Gulpfile

   Development-tasks:
   - gulp (default)
   - gulp build
   ========================================================================== */


/* Imports
   ========================================================================== */
import fs from 'fs';
import del from 'del';
import path from 'path';

import gulp from 'gulp';
import chalk from 'chalk';
import notifier from 'node-notifier';
import runSequence from 'run-sequence';
import jshintStylish from 'jshint-stylish';
import loadPlugins from 'gulp-load-plugins';



/* Initialize plugins load
   ========================================================================== */
const plugins = loadPlugins();



/* Load config (Credits @DaanPoron)
   ========================================================================== */
// Get config
let config = fs.readFileSync(path.resolve(__dirname, 'gonfig.json'), 'UTF-8');

// Set config
const setConfig = (() => {
    // Find vars and add bower_components path
    const bowerComponentsPath = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.bowerrc'))).directory;
    const vars = Object.assign({
        'bowerComponentsPath': bowerComponentsPath
    }, JSON.parse(config).vars);

    // Replace paths in config with values from vars
    for (let [key, value] of Object.entries(vars)) {
        config = config.replace(new RegExp('\<\=\s*' + key + '\s*\>', 'ig'), value);
    }

    // Reparse config
    config = JSON.parse(config);
})();



/* Errorhandling (Credits @JensGyselinck)
   ========================================================================== */
const errorLogger = (headerMessage, errorMessage, write) => {
    let i = 0,
        boxLines = '';

    for (; i < headerMessage.length + 4; i ++) {
        boxLines += '=';
    }

    if (write) {
        plugins.util.log('\n' + chalk.red(boxLines + '\n# ') + headerMessage + chalk.red(' #\n' + boxLines) + '\n ' + chalk.blue(errorMessage) + '\n');
    }

    if (config.showErrorNotifications) {
        notifier.notify({
            'title': headerMessage,
            'message': errorMessage,
            'icon':  __dirname + '/gulp_error.jpg',
            'sound': true
        });
    }
};



/* Tasks
   ========================================================================== */
// Styles
gulp.task('styles', () => {
    const postCssProcessors = [
        require('autoprefixer'),
        require('cssnano')
    ];

    return gulp.src(config.scss)
        // Sass
        .pipe(plugins.sass())

        // Error catch
        .on('error', function(err) {
            errorLogger('Styles Error', err.message, true);
            this.emit('end');
        })

        // Combine Media Queries
        .pipe(plugins.combineMq())

        // Post CSS
        .pipe(plugins.postcss(postCssProcessors))

        // Rename the file to respect naming covention.
        .pipe(plugins.rename((path) => {
            path.basename += '.min';
        }))

        // Write to output
        .pipe(gulp.dest(config.dist.css))

        // Show total size of css
        .pipe(plugins.size({
            title: 'css'
        }))

        // Livereload
        .pipe(plugins.livereload());
});


// JS
gulp.task('js-app', () => {
    return gulp.src(config.js.app)
        // Concat
        .pipe(plugins.concat('app.min.js'))

        // Babel
        .pipe(plugins.babel())

        // Error catch
        .on('error', function(err) {
            errorLogger('Error inside task "js"', err.message, true);
            this.emit('end');
        })

        // Remove console logs (only on build)
        .pipe(plugins.if(isBuild,
            plugins.stripDebug()
        ))

        // Uglify (only on build)
        .pipe(plugins.if(isBuild,
            plugins.uglify({
                mangle: {
                    except: ['jQuery']
                }
            })
        ))

        // Error catch
        .on('error', function(err) {
            errorLogger('Error inside task "js"', err.message, true);
            this.emit('end');
        })

        // Set destination
        .pipe(gulp.dest(config.dist.js))

        // Show total size of js
        .pipe(plugins.size({
            title: 'js'
        }))

        // Livereload
        .pipe(plugins.livereload());
});

gulp.task('js-vendors', () => {
    return gulp.src(config.js.vendors)
        // Concat
        .pipe(plugins.concat('vendors.min.js'))

        // Remove console logs (only on build)
        .pipe(plugins.if(isBuild,
            plugins.stripDebug()
        ))

        // Uglify (only on build)
        .pipe(plugins.if(isBuild,
            plugins.uglify({
                mangle: {
                    except: ['jQuery']
                }
            })
        ))

        // Error catch
        .on('error', function(err) {
            errorLogger('Error inside task "js"', err.message, true);
            this.emit('end');
        })

        // Set destination
        .pipe(gulp.dest(config.dist.js))

        // Show total size of js
        .pipe(plugins.size({
            title: 'js'
        }))

        // Livereload
        .pipe(plugins.livereload());
});


// JS - Other
gulp.task('js-other', () => {
    return gulp.src(config.js.other)
        // Uglify
        .pipe(plugins.uglify({
            mangle: {
                except: ['jQuery']
            }
        }))
        .on('error', function(err) {
            errorLogger('Javascript Error', err.message);
            this.emit('end');
        })

        // Set destination
        .pipe(gulp.dest(config.dist.js))

        // Show total size of js
        .pipe(plugins.size({
            title: 'js'
        }));
});


// JS - Checks
gulp.task('js-check', () => {
    return gulp.src(config.js.app)
        // Check with jshint
        .pipe(plugins.jshint())

        // Report trough jshintStylish
        .pipe(plugins.jshint.reporter(jshintStylish))

        // Fail task
        .pipe(plugins.jshint.reporter('fail'))

        // Error catch
        .on('error', function(err) {
            errorLogger('Error inside taks "js-check"', err.message, false);
            this.emit('end');
        })
});


// Images
gulp.task('images', () => {
    return gulp.src(config.img)
        // Only optimize changed images
        .pipe(plugins.changed(config.dist.img))

        // Imagemin
        .pipe(plugins.imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))

        // Set desitination
        .pipe(gulp.dest(config.dist.img))

        // Show total size of images
        .pipe(plugins.size({
            title: 'images'
        }));
});


// Clean
gulp.task('clean', (done) => {
    return del(config.vars.distPath, {
        force: true
    });
});


// Serve
gulp.task('serve', () => {
    plugins.connect.server({
        root: __dirname,
        livereload: true
    });
});


// Watch
gulp.task('watch', () => {
    // Reload
    plugins.livereload.listen();
    gulp.watch(config.liveReloadFiles).on('change', (file) => {
        plugins.livereload.changed(file.path);
    });

    // Watch
    gulp.watch(config.scss, ['styles']);
    gulp.watch(config.js.app, ['js-check', 'js-app']);
    gulp.watch(config.img, ['images']);
});



/* Run Tasks
   ========================================================================== */
// Is build
let isBuild = false;

// Default
gulp.task('default', (done) => {
    isBuild = false;

    runSequence(
        'clean',
        ['styles', 'js-check', 'js-vendors', 'js-app', 'js-other', 'images'],
        ['serve', 'watch'],
    done);
});


// Build
gulp.task('build', (done) => {
    isBuild = true;

    runSequence(
        'clean',
        ['styles', 'js-check', 'js-vendors', 'js-app', 'js-other', 'images'],
    done);
});


// Typo fallbacks
gulp.task('biuld', (done) => {
    gulp.start('build');
});
gulp.task('buil', (done) => {
    gulp.start('build');
});
gulp.task('biuld', (done) => {
    gulp.start('build');
});
gulp.task('buil', (done) => {
    gulp.start('build');
});
gulp.task('buld', (done) => {
    gulp.start('build');
});

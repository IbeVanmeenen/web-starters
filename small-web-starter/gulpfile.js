'use strict';

/* ==========================================================================
   Gulpfile

   Development-tasks:
   - gulp (=== build + watch)
   - gulp build
   - gulp watch
   ========================================================================== */


/* Require
   ========================================================================== */
// Require Gulp
var gulp = require('gulp');

// Load Gulp plugins
var plugins = require('gulp-load-plugins')();

// File System
var fs = require('fs');

// Path
var path = require('path');

// Lodash
var _ = require('lodash')

// Load sequence
var runSequence = require('run-sequence');

// Del
var del = require('del');

// Chalk for the errorlogger
var chalk = require('chalk');

// Stylish JS-hint reporter
var jshintStylish = require('jshint-stylish');

// Load the notifier.
var notifier = require('node-notifier');

// Is build
var isBuild = false;



/* Load config (Credits @DaanPoron)
   ========================================================================== */
var bowerComponentsPath = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.bowerrc'))).directory;

var config = fs.readFileSync(path.resolve(__dirname, 'gonfig.json'), 'UTF-8'),
    vars = _.merge({
        'bowerComponentsPath': bowerComponentsPath
    }, JSON.parse(config).vars);

var resourcesPath = vars.resourcesPath;
var distPath = vars.distPath;

_.forEach(vars, function(value, key) {
    config = config.replace(new RegExp('\<\=\s*' + key + '\s*\>', 'ig'), value);
});

config = JSON.parse(config);



/* Errorhandling (Credits @JensGyselinck)
   ========================================================================== */
var errorLogger = function(headerMessage, errorMessage, write) {
    var i = 0,
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
gulp.task('styles', function() {
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

        // Prefix where needed
        .pipe(plugins.autoprefixer(config.browserSupport))

        // Minify output
        .pipe(plugins.cssnano())

        // Rename the file to respect naming covention.
        .pipe(plugins.rename(function(path) {
            path.basename += '.min';
        }))

        // Write to output
        .pipe(gulp.dest(config.dist.css))

        // Show total size of css
        .pipe(plugins.size({
            title: 'css'
        }));
});


// JS
gulp.task('js', function() {
    return gulp.src(config.js.vendors.concat(config.js.app))
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

        // Concat
        .pipe(plugins.concat('footer.min.js'))

        // Set destination
        .pipe(gulp.dest(config.dist.js))

        // Show total size of js
        .pipe(plugins.size({
            title: 'js'
        }));
});


// JS - Checks
gulp.task('js-check', function() {
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
gulp.task('images', function() {
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


// Video
gulp.task('video', function() {
    return gulp.src(config.video)
        // Set desitination
        .pipe(gulp.dest(config.dist.video))

        // Show total size of files
        .pipe(plugins.size({
            title: 'video'
        }));
});


// Clean
gulp.task('clean', function(done) {
    return del([distPath + '**']);
});


// Watch
gulp.task('watch', function() {
    // Reload
    plugins.livereload.listen();
    gulp.watch(config.liveReloadFiles).on('change', function(file) {
        plugins.livereload.changed(file.path);
        plugins.connect.reload();
    });

    // Watch
    gulp.watch(config.scss, ['styles']);
    gulp.watch(config.js.app, ['js-check', 'js']);
    gulp.watch(config.img, ['images']);
    gulp.watch(config.video, ['video']);
});


// Connect
gulp.task('connect', function() {
    plugins.connect.server({
        root: __dirname,
        livereload: true
    });
});


// Default
gulp.task('default', function(done) {
    isBuild = false;

    runSequence(
        'clean',
        ['styles', 'js-check', 'js', 'images', 'video'],
        ['connect', 'watch'],
    done);
});


// Build
gulp.task('build', function(done) {
    isBuild = true;

    runSequence(
        'clean',
        ['styles', 'js', 'images', 'video'],
    done);
});


// Typo fallbacks
gulp.task('biuld', function(done) {
    gulp.start('build');
});
gulp.task('buil', function(done) {
    gulp.start('build');
});
gulp.task('biuld', function(done) {
    gulp.start('build');
});
gulp.task('buil', function(done) {
    gulp.start('build');
});
gulp.task('buld', function(done) {
    gulp.start('build');
});

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

// Load the notifier.
var Notifier = require('node-notifier');

// Chalk for the errorlogger
var chalk = require('chalk');



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
var errorLogger = function(headerMessage, errorMessage) {
    var i = 0,
        boxLines = '';

    for (; i < headerMessage.length + 4; i ++) {
        boxLines += '=';
    }

    plugins.util.log('\n' + chalk.red(boxLines + '\n# ') + headerMessage + chalk.red(' #\n' + boxLines) + '\n ' + chalk.blue(errorMessage) + '\n');

    if (config.showErrorNotifications) {
        var notifier = new Notifier();

        notifier.notify({
            'title': headerMessage,
            'message': errorMessage,
            'contentImage':  __dirname + "/gulp_error.jpg"
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
        .on('error', function(err) {
            errorLogger('SASS Compilation Error', err.message);
        })

        // Combine Media Queries
        .pipe(plugins.combineMq())

        // Prefix where needed
        .pipe(plugins.autoprefixer(config.browserSupport))

        // Minify output
        .pipe(plugins.minifyCss())

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
gulp.task('scripts', function() {
    return gulp.src(config.js)
        // Uglify
        .pipe(plugins.uglify({
            mangle: {
                except: ['jQuery']
            }
        }))
        .on('error', function(err) {
            errorLogger('Javascript Error', err.message);
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
    del([distPath + '**'], done);
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
    gulp.watch(config.js, ['scripts']);
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
    runSequence(
        'clean',
        ['styles', 'scripts', 'images', 'video'],
        ['connect', 'watch'],
    done);
});


// Build
gulp.task('build', function(done) {
    runSequence(
        'clean',
        ['styles', 'scripts', 'images', 'video'],
    done);
});


// Typo fallbacks
gulp.task('biuld', function(done) {
    gulp.start('build');
});
gulp.task('buil', function(done) {
    gulp.start('build');
});

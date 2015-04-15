'use strict';

/* ==========================================================================
   Gulpfile

   Development-tasks:
   - gulp (build + watch)
   - gulp build
   - gulp watch
   ========================================================================== */


/* Setup Gulp
   ========================================================================== */
// Require Gulp
var gulp = require('gulp');

// Load Gulp plugins
var plugins = require('gulp-load-plugins')();

// Load sequence
var runSequence = require('run-sequence');

// Del
var del = require('del');

// Load the notifier.
var Notifier = require('node-notifier');

// Set to false if you don't want notifications when an error happens.
// (Errors will still be logged in Terminal)
var showErrorNotifications = true;

/* Config
   ========================================================================== */
var resourcesPath = 'app';
var distPath = 'dist';
var bowerComponentsPath = 'bower_components';

var app = {
    dist: {
        css: distPath + '/css',
        js: distPath + '/js',
        img: distPath + '/img',
        video: distPath + '/video'
    },

    styleguide: resourcesPath + '/styleguide',

    img: resourcesPath + '/img/**/*.{png,jpg,jpeg,gif,svg,webp}',
    video: resourcesPath + '/video/**/*.{webm,mp4}',

    scss: resourcesPath + '/scss/**/*.scss',
    scssFolder: resourcesPath + '/scss/',

    js: [
        bowerComponentsPath + '/velocity/velocity.min.js',
        resourcesPath + '/js/*.js'
    ],

    liveReloadFiles: [
        distPath + '/css/style.min.css',
        distPath + '/styleguide/css/style.min.css'
    ]
};


/* Errorhandling
   ========================================================================== */

var errorLogger = function(headerMessage,errorMessage){
    var header = headerLines(headerMessage);
        header += '\n             '+ headerMessage +'\n           ';
        header += headerLines(headerMessage);
        header += '\r\n \r\n';
    plugins.util.log(plugins.util.colors.red(header) + '             ' + errorMessage + '\r\n')

    if(showErrorNotifications){
        var notifier = new Notifier();
        notifier.notify({
            'title': headerMessage,
            'message': errorMessage,
            'contentImage':  __dirname + "/gulp_error.jpg"
        });
    }
}

var headerLines = function(message){
    var lines = '';
    for(var i = 0; i< (message.length + 4); i++){
        lines += '-';
    }
    return lines;
}

/* Tasks
   ========================================================================== */
// Styles
gulp.task('styles', function() {
    return gulp.src(app.scss)
        // Sass
        .pipe(plugins.rubySass({
            loadPath: './',
            bundleExec: true,
        }))
        .on('error', function (err) {
            errorLogger('SASS Compilation Error', err.message);
        })

        // Combine Media Queries
        .pipe(plugins.combineMq())

        // Prefix where needed
        .pipe(plugins.autoprefixer('last 2 versions'))

        // Minify output
        .pipe(plugins.minifyCss())

        // Rename the file to respect naming covention.
        .pipe(plugins.rename(function(path){
            path.basename += '.min';
        }))

        // Write to output
        .pipe(gulp.dest(app.dist.css))

        // Show total size of css
        .pipe(plugins.size({
            title: 'css'
        }));
});


// JS
gulp.task('scripts', function() {
    return gulp.src(app.js)
        // Uglify
        .pipe(plugins.uglify({
            mangle: {
                except: ['jQuery']
            }
        }))
        .on('error', function (err){
            errorLogger('Javascript Error', err.message);
        })

        // Concat
        .pipe(plugins.concat('footer.min.js'))

        // Set destination
        .pipe(gulp.dest(app.dist.js))

        // Show total size of js
        .pipe(plugins.size({
            title: 'js'
        }));
});


// Images
gulp.task('images', function () {
    return gulp.src(app.img)
        // Only optimize changed images
        .pipe(plugins.changed(app.dist.img))

        // Imagemin
        .pipe(plugins.imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))

        // Set desitination
        .pipe(gulp.dest(app.dist.img))

        // Show total size of images
        .pipe(plugins.size({
            title: 'images'
        }));
});


// Fonts
gulp.task('video', function () {
    return gulp.src(app.video)
        // Set desitination
        .pipe(gulp.dest(app.dist.video))

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
gulp.task('watch', function () {
    // Livereload
    plugins.livereload.listen();
    gulp.watch(app.liveReloadFiles).on('change', function(file) {
        plugins.livereload.changed(file.path);
        plugins.connect.reload();
    });

    // Styles
    gulp.watch(app.scss, ['styles']);

    // Styles
    gulp.watch(app.js, ['scripts']);

    // Images
    gulp.watch(app.img, ['images']);
});


// Connect
gulp.task('connect', function() {
    plugins.connect.server({
        root: __dirname,
        livereload: true
    });
});


// Build
gulp.task('build', function(done) {
    runSequence(
        'clean',
        ['styles', 'scripts', 'images', 'video'],
    done);
});


// Default
gulp.task('default', function(done) {
    runSequence(
        'clean',
        ['styles', 'scripts', 'images', 'video'],
        ['connect', 'watch'],
    done);
});

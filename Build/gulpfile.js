var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    gulpkss = require('gulp-kss'),
    del = require('del'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    runSequence = require('run-sequence'),
    extreplace = require('gulp-ext-replace'),
    autoprefixer = require('gulp-autoprefixer'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    minifyCSS = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');;

var destinationRoot = '../Boilerplate.Web';
var sourceRoot = '../Boilerplate.Static';

//Source folders.
var src = {
    sassFilesToProcess: sourceRoot + '/Styles/*.scss',
    sassFilesToWatch: sourceRoot + '/Styles/**/*.scss',
    kssDocsOverviewMarkDown: sourceRoot + '/Styles/styleguide.md',
    svgIcons: sourceRoot + '/Icons/*.svg',
    iconSassFiles: sourceRoot + '/Styles/Icons/',
    scriptFilesToProcess: sourceRoot + '/Scripts/**/*.js'
};

//Destination folders.
var dest = {
    processedStyles: destinationRoot + '/Static/Styles/',
    kssDocs: destinationRoot + '/docs/',
    processedFonts: destinationRoot + '/Static/Fonts/',
    processedScripts: destinationRoot + '/Static/Scripts/'
};

// Process styles.
gulp.task('scripts', function () {
    return gulp.src(src.scriptFilesToProcess)
           .pipe(gulp.dest(dest.processedScripts));
});

// Process styles.
gulp.task('styles', function () {
    return gulp.src(src.sassFilesToProcess)
        //.pipe(sourcemaps.init())
            .pipe(sass({
                 errLogToConsole: true
            }))
            //.pipe(minifyCSS()) 
        //.pipe(sourcemaps.write('./'))     
        .pipe(gulp.dest(dest.processedStyles))
        .pipe(concat('public/style.css'))
        .pipe(gulp.dest(dest.kssDocs));
});

// Generate kss styleguide.
gulp.task('styleguide', function() {
    return gulp.src(src.sassFilesToWatch)
        .pipe(gulpkss({
            overview: src.kssDocsOverviewMarkDown,
            templateDirectory: './kss_template'
        })).pipe(gulp.dest(dest.kssDocs));
});

// Generates an icon font based on svg icons i source folder and updates css template. 
gulp.task('icons', function () {
    return gulp.src(src.svgIcons)
        .pipe(iconfont({
            fontName: 'icons',
            appendCodepoints: true,
            normalize: true,
            fontHeight: 448,
            descent: 62
        })).on('codepoints', function (codepoints) {
            del([src.iconSassFiles + '_Icons.scss'], {
                force: true
            }, function () {
                gulp.src(src.iconSassFiles + '/Templates/*.tmpl')
                .pipe(consolidate('lodash', {
                    glyphs: codepoints
                }))
                .pipe(extreplace('.scss'))
                .pipe(gulp.dest(src.iconSassFiles));
            });
        })
        .pipe(gulp.dest(dest.processedFonts));
});

//Build task. Runs serial and parallel tasks in correct order.
gulp.task('build', function () {
    runSequence('icons', ['scripts', 'styles', 'styleguide']);
});

//Runs build tasks and start watching for changes. Run as "gulp watch".
gulp.task('watch', ['build'], function () {
    gulp.watch(src.sassFilesToWatch, ['styles']);
    gulp.watch(src.svgIcons, ['icons']);
});

//Defaults when running just "gulp".
gulp.task('default', ['build']);
const gulp = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function handleSass() {
    return gulp
        .src('style/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(gulp.dest('style/css/'))
        .pipe(browserSync.stream());
}

function handleBrowser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

function handleJavascript() {
    return gulp
        .src('js/code/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream())

}

function gulpWatch() {
    gulp.watch('style/scss/*.scss', handleSass);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/code/*.js', handleJavascript);
}

exports.handleSass = handleSass;
exports.handleBrowser = handleBrowser;
exports.handleJavascript = handleJavascript;
exports.gulpWatch = gulpWatch;

exports.default = gulp.parallel(gulpWatch, handleBrowser, handleSass, handleJavascript);
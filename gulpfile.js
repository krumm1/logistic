'use strict';

const { watch, series, parallel, src, dest } = require('gulp');
const browsersync = require('browser-sync').create();
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

function initBrowserSync() {
    browsersync.init({
        server: {
            baseDir: './src'
        }
    });
}

function watchChanges() {
    watch(['./src/**/*.html', './src/js/**/*.js', './src/sass/**/*.+(scss|sass)', './src/img/*'], series(compileStyles, reload));
}

function compileStyles() {
    return src('./src/sass/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('./src/css'))
        .pipe(browsersync.stream());
}

function buildHtml() {
    return src('./src/**/*.html')
        .pipe(dest('./dist/'))
}

function buildCss() {
    return src('./src/css/*.css')
        .pipe(dest('./dist/css/'));
}

function buildJs() {
    return src('./src/js/*.js')
        // .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        // .pipe(rename('main.min.js'))
        // .pipe(sourcemaps.write('../maps'))
        .pipe(dest('./dist/js/'));
}

function buildLibs() {
    return src('./src/libs/**')
        .pipe(dest('./dist/libs/'))
}

function buildFonts() {
    return src('./src/fonts/**')
        .pipe(dest('./dist/fonts/'));
}

function buildImages() {
    return src(['./src/img/**/*.jpg', './src/img/**/*.jpeg', './src/img/**/*.png', './src/img/**/*.gif', './src/img/**/*.svg'])
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(dest('./dist/img/'));
}

function reload(done) {
    browsersync.reload();
    done();
}


// Tasks on gulp start
exports.default = parallel(initBrowserSync, watchChanges, compileStyles);
// Tasks on gulp build
exports.build = parallel(buildHtml, buildCss, buildJs, buildLibs, buildImages, buildFonts);
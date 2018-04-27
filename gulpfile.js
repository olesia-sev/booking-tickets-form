const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const normalize = require('node-normalize-scss');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();

const path = require('path');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/scripts/**/*.*',
        dest: 'build/assets/scripts/'
    },
    fonts: {
        src: 'src/fonts/woff/*.*',
        dest: 'build/assets/fonts/'
    },
}

//pug
function templates() {
    return gulp
        .src(paths.templates.pages)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(paths.root));
}

//scss
function styles() {
    return gulp
        .src('./src/styles/main.scss')
        .pipe(sass({
            includePaths: normalize.includePaths,
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

//clean
function clean() {
    return del(paths.root);
}

//browser-sync, gulp вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

//локальный сервер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// переносим картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

//переносим шрифты
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

//scripts
function scripts() {
    return gulp.src('src/scripts/**/*.*')
        .pipe(gulp.dest(paths.scripts.dest));
}

exports.templates = templates;

exports.styles = styles;

exports.clean = clean;

exports.images = images;

exports.fonts = fonts;

exports.scripts = scripts;

exports.watch = watch;

exports.server = server;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, fonts, scripts),
    gulp.parallel(watch, server)
));
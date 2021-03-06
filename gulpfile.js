const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nunjucks = require('gulp-nunjucks');

/* Compile SCSS to CSS */
gulp.task('scss', function () {
    gulp.src('./src/styles/main.scss')
        /**
         * Функція sass() компілює SCSS в CSS.
         */
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('scss/clean', function () {
    return del('./build/css');
});

gulp.task('clean', function () {
    return runSequence(['scss/clean']);
});

/* Build the project */
gulp.task('build', ['clean'], function () {
    return runSequence(['scss']);
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    return done();
});

/* Default task */
gulp.task('default', ['build', 'serve'], function () {
    gulp.watch('./src/styles/**/*.scss', ['scss']);
});

'use strict';
var 
  gulp       = require('gulp'),
  connect    = require('gulp-connect'),
  sass       = require('gulp-sass'),
  jshint     = require('gulp-jshint'),
  stylish    = require('jshint-stylish');
 
 
/*
*   That's right, a WEBSERVER!
*/
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: 80
  });
});

/*
*   Make CSS less shitty
*/


gulp.task('sass', function () {
  gulp.src('./src/css/app/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

/*
*   Make sure all files are clean, tidy, and as error-proof as possible.
*   Obviously, turn this off if it's annoying and you know what you're doing.
*/

gulp.task('js-lint', function() {
  return gulp.src('./src/js/app/**/*.js')
    .pipe(jshint({
      browser: true, // We aren't building for server
      devel: true    // allow console, alert, etc
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail')); // Fail on error
});

/*
*   For now, just copy JS. Don't want to make any assumptions about Babel, 
*   browserify, etc
*
*   Should lint before doing executing.
*/ 

gulp.task('js-copy', ['js-lint'], function() {
  return gulp.src('./src/js/app/app.js')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('dev', ['js-copy', 'sass']);

gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.*', ['sass']);
  gulp.watch('./src/js/**/*.*', ['js-copy']);
});

gulp.task('default', ['dev', 'watch']);
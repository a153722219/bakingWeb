var gulp = require('gulp');

var vueBabel = require('./vueBabel');
console.log("gulp trans")
gulp.task('default', function () {
  gulp.src('src/*.vue')
      .pipe(vueBabel())
      .pipe(gulp.dest("output" ));
});
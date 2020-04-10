gulp = require('gulp');
browserify = require('browserify');
source = require('vinyl-source-stream');

gulp.task('default', () =>
  browserify( {
    entries: ['src/js/main.js']
  } )
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('src/'))
);

gulp.task("watch", () =>  {  
    var targets = [
      'src/js/*.js'
    ];
    gulp.watch(targets, gulp.series('default'));
  });
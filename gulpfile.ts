import * as gulp from 'gulp';
import * as browserify from 'browserify';
import * as source from 'vinyl-source-stream';
import tsify from 'tsify';
import * as watchify from 'watchify';
import * as gutil from 'gulp-util';
import * as uglify from 'gulp-uglify';
import * as sourcemaps from 'gulp-sourcemaps';
import * as buffer from 'vinyl-buffer';

const paths = {
  pages: ['src/*.html']
};

const watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: 'src/index.ts',
  cache: {},
  packageCache: {}
})
  .plugin(tsify));
const bundle = function() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
};
gulp.task('copy-html', function() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest('dist'));
});
gulp.task('default', ['copy-html'], bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);

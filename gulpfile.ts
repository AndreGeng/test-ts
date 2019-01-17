import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from 'tsify';
import watchify from 'watchify';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import DataSet from './src/lib/test';

const paths = {
  pages: ['src/*.html']
};

const watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: [
    'src/index.ts',
  ],
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
function copyHtml() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest('dist'));
}
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);

export { copyHtml };
export default gulp.series(copyHtml, bundle);

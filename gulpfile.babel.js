'use strict';

import gulp from 'gulp';
import debug from 'gulp-debug';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import rimraf from 'rimraf';
import runSequence from 'run-sequence';

const config = {
  srcFolder: `src`,
  distFolder: `dist`
};
const paths = {
  cssEntryFile: [`${config.srcFolder}/styles/index.css`],
  cssDistFolder: `${config.distFolder}/styles/`,
  scriptEntryFile: [`${config.srcFolder}/scripts/index.js`],
  scriptDistFolder: `${config.distFolder}/scripts/`,
  scriptDistFileName: `index.js`,
  cssFolder: [`${config.srcFolder}/**/*.css`],
  htmlFolder: [`${config.srcFolder}/**/*.html`],
  fontFolder: [`${config.srcFolder}/**/*.woff`],
  imagesFolder:  [`${config.srcFolder}/**/*.jpg`, `${config.srcFolder}/**/*.png`],
  scriptFolder: [`${config.srcFolder}/**/*.js`, `${config.srcFolder}/**/*.jsx`]
};


gulp.task('clean', () => {
  // Remove dist folder
  rimraf.sync('./dist');
});

gulp.task('browserify', () => {
  return browserify(paths.scriptEntryFile, {
    fullPaths: true,
    paths: ['./src/scripts/']
  })
  .transform('babelify')
  .bundle()
  .pipe(source(paths.scriptDistFileName))
  .pipe(debug({title: 'browserify:'}))
  .pipe(gulp.dest(paths.scriptDistFolder));
});

gulp.task('compress', function() {
  return gulp.src(`${paths.scriptDistFolder}/${paths.scriptDistFileName}`)
  .pipe(uglify())
  .pipe(debug({title: 'uglify:'}))
  .pipe(gulp.dest(paths.scriptDistFolder));
});

gulp.task('scripts', (cb) => {
  var nodeEnv = process.env.NODE_ENV;
  switch(nodeEnv){
  case 'development':
    runSequence(
      'browserify',
      cb
    );
    break;
  case 'production':
    runSequence(
      'browserify',
      'compress',
      cb
    );
    break;
  }
});

gulp.task('images', () => {
  return gulp.src(paths.imagesFolder)
  .pipe(debug({title: 'images:'}))
  .pipe(gulp.dest(config.distFolder));
});

gulp.task('html', () => {
  return gulp.src(paths.htmlFolder)
  .pipe(debug({title: 'html:'}))
  .pipe(gulp.dest(config.distFolder));
});

gulp.task('fonts', () => {
  return gulp.src(paths.fontFolder)
  .pipe(debug({title: 'fonts:'}))
  .pipe(gulp.dest(config.distFolder));
});

gulp.task('css', () => {
  let postcss = require('gulp-postcss');
  let sourcemaps = require('gulp-sourcemaps');
  let postCSSPlugins = [
    require('postcss-import'),
    require('postcss-hexrgba'),
    require('autoprefixer'),
    require('precss')
  ];
  return gulp.src(paths.cssEntryFile)
    .pipe(debug({title: 'css:'}))
    .pipe(sourcemaps.init())
    .pipe(postcss(postCSSPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.cssDistFolder));
});


gulp.task('watch', ['default'], () => {
  gulp.watch(paths.scriptFolder, ['scripts']);
  gulp.watch(paths.cssFolder, ['css']);
  gulp.watch(paths.htmlFolder, ['html']);
  gulp.watch(paths.imagesFolder, ['images']);
});

gulp.task('default', (cb) => {
  runSequence(
    'clean',
    'html',
    'fonts',
    'css',
    'images',
    'scripts',
    cb
  );
});

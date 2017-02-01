'use strict';

// Modules.
var
  async = require('async'),
  gulp = require('gulp'),
  breakpoints = require('drupal-breakpoints-scss'),
  plugins = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  buildTime = Math.round(Date.now()/1000);

// Paths.
var paths = {
  scripts:     'scripts/**/*.js',
  css:    'dist/styles',
  maps:    '.',
  styles:   'styles/**/*.scss',
  templates:   'templates/**/*.twig',
  images: {
    original: 'images/original/**/*.svg',
    optimized: 'images/optimized'
  }
};

gulp.task('sync', ['development'], function() {
  browserSync.init({
    notify: true,
    logPrefix: "Theme",
    logConnections: true,
    logFileChanges: false,
    logSnippet: false,
    open: false,
    reloadOnRestart: false,
    ghostMode: true
  });

  gulp.watch(paths.styles, ['development']);
});

gulp.task('development', function() {
  return gulp.src(paths.styles)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      precision: 10
    }))
    .on('error', reportError)
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(plugins.sourcemaps.write(paths.maps))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({stream: true, match: '**/*.css'}));
});

gulp.task('css', function() {
  return gulp.src(paths.styles)
    .pipe(plugins.sass({
      precision: 10
    }))
    .on('error', reportError)
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('svg', function() {
  return gulp.src('images/glyphs/**/*.svg')
    .pipe(plugins.svgmin())
    .pipe(plugins.inlineSvg())
    .pipe(gulp.dest('dist/images/glyphs'));
});

gulp.task('breakpoints', function() {
  return gulp.src('./zupaa.breakpoints.yml')
    .pipe(breakpoints.ymlToScss())
    .pipe(plugins.rename('_breakpoints.scss'))
    .pipe(gulp.dest('./dist/scss'))
});

gulp.task('font-icon', function(done) {
  var iconStream = gulp.src(['images/glyphs/*.svg'])
    .pipe(plugins.iconfont({
      fontName: 'font-icon',
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: buildTime
    }));

  async.parallel([
    function handleGlyphs (cb) {
      iconStream.on('glyphs', function(glyphs, options) {
        gulp.src('images/glyphs/font-icon.scss.template')
          .pipe(plugins.consolidate('lodash', {
            glyphs: glyphs,
            fontName: 'font-icon',
            fontPath: '../fonts/font-icon/',
            className: 'i'
          }))
          .pipe(plugins.rename('_font-icon.scss'))
          .pipe(gulp.dest('dist/scss/'))
          .on('finish', cb);
      });
    },
    function handleFonts (cb) {
      iconStream
        .pipe(gulp.dest('dist/fonts/font-icon/'))
        .on('finish', cb);
    }
  ], done);
});

var imagemin_config = {
  progressive: true,
  interlaced: true,
  svgoPlugins: [{cleanupIDs: false}]
};

// Optimize images
gulp.task('images', function() {
  gulp.src(paths.images.original)
  //   .pipe(plugins.imagemin(imagemin_config))
    .pipe(gulp.dest(paths.images.optimized))
});

// Run watch and wait for changes
gulp.task('default', ['sync']);

// Run watch and wait for changes
gulp.task('production', ['breakpoints', 'images', 'css']);

// Error reporting.
var reportError = function(error) {
  plugins.notify({
    title: error.messageOriginal,
    message: 'Line ' + error.line + ' in ' + error.relativePath,
    icon: false
  }).write(error);
  this.emit('end');
};

'use strict';

// Modules.
var
  gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create();

// Paths.
var paths = {
  scripts:     'scripts/**/*.js',
  css:    'dist/css',
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
gulp.task('production', ['images', 'css']);

// Error reporting.
var reportError = function(error) {
  plugins.notify({
    title: error.messageOriginal,
    message: 'Line ' + error.line + ' in ' + error.relativePath,
    icon: false
  }).write(error);
  // console.log(error.toString());
  this.emit('end');
};

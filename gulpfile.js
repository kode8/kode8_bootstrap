'use strict';

var gulp = require('gulp'),
		browserify = require('gulp-browserify'),
		watchify = require('gulp-watchify'),
		sourcemaps = require('gulp-sourcemaps'),
	  uglify = require('gulp-uglify'),
	  connect = require('gulp-connect-php'),
	  rename = require("gulp-rename"),
	  browserSync = require('browser-sync'),
	  sass = require('gulp-sass'),
	  modernizr = require('gulp-modernizr'),
	  concat = require('gulp-concat'),
	  notify = require("gulp-notify"),
	  watch = require("gulp-watch"),
	  jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    stripCssComments = require('gulp-strip-css-comments'),
		plumber = require('gulp-plumber'),
		gutil = require('gulp-util');

var modernizr_settings = {
    "cache" : true,
    "devFile" : false,
    "dest" : false,
    "options" : [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind"
    ],
    "tests" : [],
    "excludeTests": [],
    "crawl" : true,
    "useBuffers": false,
    "customTests" : []
};

gulp.task('default', function() {
  // place code for your default task here
});

/* Browser Sync */
gulp.task('connect-sync', function() {
  connect.server({}, function (){
    browserSync({
      proxy: 'localhost:8000'
    });
  });
});

/* Basic Browserfy JS bundle usage */
gulp.task('scripts', function() {
	/* Single entry point to browserify */
	gulp.src('./src/js/app.js')
		.pipe(browserify({
		  insertGlobals : true,
		  debug : !gulp.env.production
		}))
		.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
			// Add transformation tasks to the pipeline here.
	 	.pipe(sourcemaps.write('./')) // writes .map file
		.pipe(gulp.dest('./dist/js/build'))
});



/* Gulp watch */
gulp.task('watch', function() {

	var onError = function(err) {
      notify.onError({
        title:    "Watch File Error",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
      })(err);
      this.emit('end');
  };

	/* Watch SCSS */
	gulp.watch([
	 './src/scss/*.scss',
	], ['sass'])
	/* Watch JS and Browsify file */
	gulp.watch([
	 './src/js/*.js',
	 './src/js/libraries/*.js',
	 './src/js/libraries/**/*.js',
	 './src/js/libraries/**/**/*.js'
 ], ['uglifyfile'])

});

/* SASS compiler */
gulp.task('sass', function () {

	var onError = function(err) {
      notify.onError({
        title:    "SASS Compile Error",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
      })(err);
      this.emit('end');
  };

  /* Compile SASS */
  return gulp.src([
		'./src/scss/app.scss'])
		.pipe(plumber({errorHandler: onError}))
    .pipe(sass({includePaths: [
      './bower_components/foundation/scss',
      './node_modules/bourbon-libsass/dist']
		}))
    .pipe(sass({outputStyle: 'compressed'})) // nested, expanded, compact, compressed
    .pipe(stripCssComments({preserve: false}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
		.pipe(notify({ message: 'SASS task complete' }))
});

/* Modernizr build */
gulp.task('modernizr', function() {

		var onError = function(err) {
	      notify.onError({
	        title:    "Modernizr Compile Error",
	        subtitle: "Failure!",
	        message:  "Error: <%= error.message %>",
	        sound:    "Beep"
	      })(err);
	      this.emit('end');
	  };

    return gulp.src([
			'./dist/css/app.css',
			'./dist/js/*.min.js',
			'!./dist/js/custom-modernizr.min.js'])
		.pipe(plumber({errorHandler: onError}))
    .pipe(modernizr(modernizr_settings))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
	  .pipe(notify({ message: 'Uglify <%= file.relative %>! complete' }));
});

/* Uglify JS when changed */
gulp.task('uglifyfile', function () {

		var onError = function(err) {
				notify.onError({
					title:    "Uglify JS Errors",
					subtitle: "Failure!",
					message:  "Error: <%= error.message %>",
					sound:    "Beep"
				})(err);
				this.emit('end');
		};

    gulp.src([
			'./src/js/*.js',
			'./src/js/libraries/*.js',
			'./src/js/libraries/**/*.js'])
		.pipe(plumber({errorHandler: onError}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
	  .pipe(notify({ message: 'Uglify <%= file.relative %>! complete' }))
});

/* Uglify JS on intial Gulp load */
gulp.task('uglifyfiles', function() {

		var onError = function(err) {
				notify.onError({
					title:    "Initial Onload Uglifying JS Errors",
					subtitle: "Failure!",
					message:  "Error: <%= error.message %>",
					sound:    "Beep"
				})(err);
				this.emit('end');
		};

    gulp.src([
			  	'./src/js/*.js',
			    './src/js/libraries/*.js',
          './src/js/libraries/**/*.js',
			    './bower_components/fastclick/lib/*.js',
			    './bower_components/jquery-2/dist/jquery.js',
			    './bower_components/jquery-backstretch/jquery.backstretch.js',
          './bower_components/jquery-placeholder/jquery.placeholder.js',
          './bower_components/jquery.cookie/jquery.cookie.js',
          './bower_components/jquery.easing/js/jquery.easing.js',
          './bower_components/flickity/dist/flickity.pkgd.js',
          './bower_components/jquery.inview/jquery.inview.js',
          './bower_components/jquery.transit/jquery.transit.js',
          './bower_components/jquery-bridget/jquery.bridget.js',
          './bower_components/lazyloadxt/dist/jquery.lazyloadxt.js',
          './bower_components/lazyloadxt/dist/jquery.lazyloadxt.extra.js',
          './bower_components/scroll-reveal/scrollReveal.js',
          './bower_components/iscroll/build/iscroll.js',
          './bower_components/readmore/readmore.js',
          './bower_components/waypoints/lib/jquery.waypoints.js',
          './bower_components/foundation/js/foundation.js',
          './bower_components/foundation/js/foundation/*.js',
          './bower_components/picturefill/src/picturefill.js',
          './bower_components/jquery-address/src/jquery.address.js',
          './bower_components/velocity-animate/velocity.ui.js',
          './node_modules/velocity-animate/velocity.js',
          './node_modules/velocity-animate/velocity.ui.js',
          './node_modules/requirejs/require.js'])
		.pipe(plumber({errorHandler: onError}))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
	  .pipe(notify({ message: 'Uglify <%= file.relative %>! complete' }));
});



gulp.task('default', ['connect-sync', 'uglifyfiles','sass','modernizr','scripts','watch']);

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

'use strict';

var gulp = require('gulp'),
		browserify = require('gulp-browserify'),
		watchify = require('gulp-watchify'),
		sourcemaps = require('gulp-sourcemaps'),
	  uglify = require('gulp-uglify'),
	  connect = require('gulp-connect-php'),
	  rename = require('gulp-rename'),
	  browserSync = require('browser-sync'),
	  sass = require('gulp-sass'),
	  modernizr = require('gulp-modernizr'),
	  concat = require('gulp-concat'),
	  notify = require('gulp-notify'),
	  watch = require('gulp-watch'),
	  jshint = require('gulp-jshint'),
		plumber = require('gulp-plumber'),
		gutil = require('gulp-util'),
		imageOptim = require('gulp-imageoptim'),
		cssnano = require('gulp-cssnano');

var modernizr_settings = {
    'cache' : true,
    'devFile' : false,
    'dest' : false,
    'options' : [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind'
    ],
    'tests' : [],
    'excludeTests': [],
    'crawl' : true,
    'useBuffers': false,
    'customTests' : []
};

gulp.task('default', function() {
  // place code for your default task here
});

/* Compress images */
gulp.task('images', function() {
	gulp.src('./src/img/**/*')
				.pipe(imageOptim.optimize({
				}))
        .pipe(gulp.dest('./dist/img'));
});

/* Browser Sync */
gulp.task('connect-sync', function() {

  connect.server({}, function (){
    browserSync({
      proxy: 'localhost:8000'
    });
  });

	var onError = function(err) {
			notify.onError({
				title:    'Watch File Error',
				subtitle: 'Failure!',
				message:  'Error: <%= error.message %>',
				sound:    'Beep'
			})(err);
			this.emit('end');
	};

	/* Watch SCSS */
	gulp.watch([
	 './src/scss/*.scss',
	 './src/scss/*/*.scss'
	], ['sass']);

	/* Reload browser window on CSS updates */
	gulp.watch([
	 './dist/css/app.css',
 	]).on('change', browserSync.reload);

	/* Watch JS and Browsify file */
	gulp.watch([
	 './src/js/*.js',
	 './src/js/libraries/*.js',
	 './src/js/libraries/**/*.js',
	 './src/js/libraries/**/**/*.js'
 	], ['uglifyfile']).on('change', browserSync.reload);

	/* Reload browser window on JS updates */
	gulp.watch([
	 './dist/js/*.js'
 	]).on('change', browserSync.reload);

	/* Watch HTML and PHP  */
	gulp.watch(['./*.php','./*.html']).on('change', browserSync.reload);

	/* Watch newly added scss files */
	gulp.watch(['src/scss/**/**.scss'], function() {
    gulp.start('sass');
  });

	/* Watch Images added */
	gulp.watch('./src/img/*.jpg', ['images']);

	/* Watch newly added js files */
	gulp.watch([
		'./src/js/*.js',
		'./src/js/libraries/*.js',
		'./src/js/libraries/**/*.js',
		'./src/js/libraries/**/**/*.js'], function() {
    gulp.start('uglifyfile');
  });

});

/* SASS compiler */
gulp.task('sass', function () {

	var onError = function(err) {
      notify.onError({
        title:    'SASS Compile Error',
        subtitle: 'Failure!',
        message:  'Error: <%= error.message %>',
        sound:    'Beep'
      })(err);
      this.emit('end');
  };

  /* Compile SASS */
  return gulp.src([
		'./src/scss/app.scss'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
    .pipe(sass(
			{
				includePaths: ['./bower_components/foundation/scss',
      								 './node_modules/bourbon-libsass/dist'
				]
			}
		))
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
		.pipe(notify({ message: 'SASS task complete' }));
});

/* Modernizr build */
gulp.task('modernizr', function() {

		var onError = function(err) {
	      notify.onError({
	        title:    'Modernizr Compile Error',
	        subtitle: 'Failure!',
	        message:  'Error: <%= error.message %>',
	        sound:    'Beep'
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
    .pipe(gulp.dest('./dist/js'))
	  .pipe(notify({ message: 'Uglify <%= file.relative %>! complete' }));
});

/* Uglify JS when changed */
gulp.task('uglifyfile', function () {

		var onError = function(err) {
				notify.onError({
					title:    'Uglify JS Errors',
					subtitle: 'Failure!',
					message:  'Error: <%= error.message %>',
					sound:    'Beep'
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
	  .pipe(notify({ message: 'Uglify <%= file.relative %>! complete' }));
});

/* Uglify supporting libraries on intial Gulp load */
gulp.task('uglifyfiles', function() {

		var onError = function(err) {
				notify.onError({
					title:    'Initial Onload Uglifying JS Errors',
					subtitle: 'Failure!',
					message:  'Error: <%= error.message %>',
					sound:    'Beep'
				})(err);
				this.emit('end');
		};

    gulp.src([
			  	'./src/js/*.js',
			    './src/js/libraries/*.js',
          './src/js/libraries/**/*.js',
			    './bower_components/*.js',
			    './bower_components/jquery-2/dist/jquery.js',
          './bower_components/jquery-placeholder/jquery.placeholder.js',
          './bower_components/jquery.cookie/jquery.cookie.js',
          './bower_components/jquery.easing/js/jquery.easing.js',
          './bower_components/scroll-reveal/scrollReveal.js',
          './bower_components/waypoints/lib/jquery.waypoints.js',
          './bower_components/foundation/js/foundation.js',
          './bower_components/foundation/js/foundation/*.js',
          './bower_components/picturefill/src/picturefill.js',
          './bower_components/jquery-address/src/jquery.address.js',
          './bower_components/velocity-animate/velocity.ui.js',
          './node_modules/velocity-animate/velocity.js',
          './node_modules/velocity-animate/velocity.ui.js'])
		.pipe(plumber({errorHandler: onError}))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
	  .pipe(notify({ message: 'Uglify <%= file.relative %>! complete' }));
});

gulp.task('default', ['connect-sync','uglifyfiles','sass','modernizr','images']);

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

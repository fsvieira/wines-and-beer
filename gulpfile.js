const gulp = require('gulp');
const browserify = require('browserify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const path = require('path');
const htmlmin = require('gulp-htmlmin');
const babelify = require('babelify');

const packageJSON  = require('./package');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const htmlhint = require("gulp-htmlhint");
const csslint = require('gulp-csslint');

const es = require('event-stream');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const jshintConfig = packageJSON.jshintConfig;
jshintConfig.lookup = false;


const BUILD_DEST = './www';

gulp.task('browserify', function () {
  return browserify(['src/js/app.js'])
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(path.join(BUILD_DEST, 'js')))
  .pipe(buffer());
});

gulp.task('check:www', function() {
	const js = gulp.src([
		'src/**/*.js'
	])
		.pipe(jshint(jshintConfig))
		.pipe(jshint.reporter('checkstyle'))
		.pipe(jshint.reporter('fail'))
		.pipe(jscs(packageJSON.jscsConfig));

	const html = gulp.src(["src/**/*.html"])
		.pipe(htmlhint());
	
	const css = gulp.src(["src/**/*.css"])
		.pipe(csslint(packageJSON.cssConfig));

	return es.merge(js, html, css);
});

gulp.task('resources-css', function () {
  return gulp.src([
    'node_modules/typicons.font/src/font/*.{eot,svg,ttf,woff}'
  ])
  .pipe(gulp.dest(path.join(BUILD_DEST, 'css')));
});


gulp.task('minify-css', ['resources-css'], function() {
  return gulp.src([
		'src/css/reset.css',
		'src/css/**/*.css',
		'node_modules/typicons.font/src/font/typicons.css'
	])
    .pipe(concat('bundle.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.join(BUILD_DEST, 'css')));
});

gulp.task('minify-html', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(BUILD_DEST));
});

gulp.task('dist', ['build'], function () {
  return browserify(['src/js/app.js'])
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(path.join(BUILD_DEST, 'js')))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.join(BUILD_DEST, 'js')));
});

gulp.task('build', ['minify-html', 'minify-css', 'browserify'], function () {
  return gulp.src([
    'src/**/*',
    '!src/**/*.{css,js,html}',
    '!src/js/**/*'
  ])
  .pipe(gulp.dest(BUILD_DEST));
});

gulp.task('watch', ['check:www', 'build'], function () {
  return gulp.watch([
    'src/**/*'
  ], ['build'], function () {
    console.log('BUILD');
  });
});


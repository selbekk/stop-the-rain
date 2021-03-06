var babelify = require('babelify'),
    browserify = require('browserify'),
	buffer = require('vinyl-buffer'),
	concat = require('gulp-concat'),
	declare = require('gulp-declare'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	handlebars = require('gulp-handlebars'),
	less = {
		compile: require('gulp-less'),
		minify: require('less-plugin-clean-css'),
		prefix: require('less-plugin-autoprefix')
	},
	manifest = require('gulp-manifest'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	source = require('vinyl-source-stream'),
	uglify = require('gulp-uglify'),
	wrap = require('gulp-wrap');

gulp.task('style', function() {
	gutil.log('compiling LESS...');
	gulp.src('src/webapp/less/main.less')
		.pipe(plumber())
		.pipe(less.compile({
			plugins: [
				new less.minify({ advanced: true }),
				new less.prefix({ browsers: ["last 2 versions"] })
			]
		}))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('src/webapp/public/'))
});

gulp.task('script', function() {
	gutil.log('compiling scripts...');
	return browserify('./src/webapp/app.js')
        .transform(babelify)
		.bundle()
		.pipe(source('scripts.min.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('src/webapp/public/'));
});

gulp.task('template', function() {
	gutil.log('compiling templates...');
	gulp.src('src/webapp/templates/**/*.handlebars')
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			root: 'exports',
			noRedeclare: true // Avoid duplicate declarations
		}))
		.pipe(concat('index.js'))
		.pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
		.pipe(gulp.dest('src/webapp/templates'));
});

gulp.task('manifest', function() {
	gulp.src(['src/webapp/public/**'])
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'manifest.mf',
      exclude: 'manifest.mf'
     }))
    .pipe(gulp.dest('src/webapp/public'));
});

gulp.task('build', ['manifest', 'template', 'style', 'script']);

gulp.task('watch', function() {
	gutil.log('watching for changes...');
	gulp.watch('src/webapp/less/*.less', ['style']);
	gulp.watch('src/webapp/templates/*.handlebars', ['template', 'script']);
	gulp.watch('src/webapp/**.js', ['script']);
});

gulp.task('default', ['build', 'watch']);

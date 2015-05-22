var browserify = require('browserify'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	less = {
		compile: require('gulp-less'),
		minify: require('less-plugin-clean-css'),
		prefix: require('less-plugin-autoprefix')
	},
	notify = require("gulp-notify"),
	reactify = require('reactify'),
	source = require('vinyl-source-stream'),
	watchify = require('watchify');

var scriptsDir = './src/webapp';
var buildDir = './src/webapp/public';

var handleErrors = notify.onError({
	title: "Compile Error",
	message: "<%= error %>"
});

function buildScript(file, watch) {
	var props = {entries: [scriptsDir + '/' + file]};
	var bundler = watch ? watchify(props) : browserify(props);
	bundler.transform(reactify);
	function rebundle() {
		var stream = bundler.bundle({debug: true});
		return stream.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulp.dest(buildDir + '/'));
	}
	bundler.on('update', function() {
		rebundle();
		gutil.log('Re-bundling...');
	});
	return rebundle();
}

gulp.task('style', function() {
	gulp.src('src/webapp/less/main.less')
		.pipe(less.compile({
			plugins: [
				new less.minify({ advanced: true }),
				new less.prefix({ browsers: ["last 2 versions"] })
			]
		}))
		.pipe(gulp.dest('src/webapp/public/'))
});

gulp.task('build', ['style'], function() {
	return buildScript('main.js', false);
});

gulp.task('watch', function() {
	gutil.log('watching for changes...');
	gulp.watch('src/webapp/less/*.less', ['style']);
})

gulp.task('default', ['build'], function() {
	return buildScript('main.js', true);
});

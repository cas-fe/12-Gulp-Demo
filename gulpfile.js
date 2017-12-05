var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	postCSS = require('gulp-postcss'),
	autoprefixer = require('autoprefixer');

gulp.task('js', function() {
	return gulp.src([
			'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
			'source/*.js'
		])
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/'));
});

gulp.task('css', function() {
	return gulp.src('source/*.scss')
		.pipe(sass())
		.pipe(postCSS([
			autoprefixer({
				browsers: ['last 10 versions']
			})
		]))
		.pipe(gulp.dest('build/'));
});

gulp.task('default', function() {
	gulp.watch('source/*.js', ['js']);
	gulp.watch('source/*.scss', ['css']);
});
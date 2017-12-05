var gulp = require('gulp'),
	sass = require('gulp-sass'),
	postCSS = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	spritesmith = require('gulp.spritesmith'),
	merge = require('merge-stream'),
	runSequence = require('run-sequence');

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

gulp.task('sprite', function() {
	var streams = gulp.src('source/media/*.png')
			.pipe(spritesmith({
				imgName: 'sprite.png',
				imgPath: 'media/sprite.png',
				cssName: '_sprite.scss',
				cssTemplate: 'source/_sprite.tmpl.scss'
			}));

	// Save sprite
	streams.img.pipe(gulp.dest('build/media/'));

	// Generate SCSS file
	streams.css.pipe(gulp.dest('source/.tmp'));

	return merge(streams.img, streams.css);
});

gulp.task('default', function(cb) {
	runSequence('sprite', 'css', cb);
});
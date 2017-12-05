var gulp = require('gulp'),
	util = require('gulp-util'),
	webpack = require('webpack'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	once = require('once'),
	path = require('path');

function log(err, stats, cb) {
	if (err) {
		console.log(err);
	}

	util.log(stats.toString({
		colors: util.colors.supportsColor,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false,
		modules: false,
		children: true,
		version: true,
		cached: false,
		cachedAssets: false,
		reasons: false,
		source: false,
		errorDetails: false,
		assetsSort: 'name'
	}));

	if (cb) {
		cb();
	}
}

var compiler = webpack({
		entry: './source/main.js',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						// Insert polyfills if needed
						presets: [
							['@babel/preset-env', {
								useBuiltIns: 'usage',
								targets: {
									browsers: ['last 2 versions']
								},
								debug: true
							}]
						]
					}
				},

				// Make sure bootstrap is able to find jQuery
				{
					test: require.resolve('jquery'),
					loader: 'expose-loader?jQuery!expose-loader?$'
				}
			]
		},

		// Minifiy in prod mode
		plugins: [].concat(util.env.dev ? [] : [
			new UglifyJsPlugin()
		]),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].js'
		},
		devtool: util.env.dev ? 'inline-source-map' : false
	});

gulp.task('js', function(cb) {
	compiler.run(function(err, stats) {
		log(err, stats, cb)
	});
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
	compiler.watch({}, function(err, stats) {
		log(err, stats);
	});

	gulp.watch('source/*.scss', ['css']);
});
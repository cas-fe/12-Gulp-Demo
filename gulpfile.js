var gulp = require('gulp'),
	util = require('gulp-util'),
	webpack = require('webpack'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	once = require('once'),
	path = require('path');

function log(err, stats, cb) {
	cb = once(cb)

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

	cb()
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

gulp.task('default', function(cb) {
	compiler.watch({}, function(err, stats) {
		log(err, stats, cb)
	});
});

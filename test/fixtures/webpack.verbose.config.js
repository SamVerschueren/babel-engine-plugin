'use strict';
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabelEnginePlugin = require('../..');

module.exports = {
	entry: path.join(__dirname, '/app.js'),
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	plugins: [
		new BabelEnginePlugin({
			presets: ['@babel/preset-env']
		}, {
			verbose: false
		}),
		new UglifyJSPlugin()
	]
};

'use strict';
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const BabelEnginePlugin = require('../..');

module.exports = {
	entry: path.join(__dirname, '/app.concat.js'),
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	plugins: [
		new BabelEnginePlugin({
			presets: ['@babel/preset-env']
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new UglifyJSPlugin()
	]
};

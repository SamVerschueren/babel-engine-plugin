'use strict';
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabelEnginePlugin = require('../../');
const webpack = require('webpack')
console.log(webpack.optimize)

module.exports = {
	entry: path.join(__dirname, '/app.concat.js'),
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	plugins: [
		new BabelEnginePlugin({
			presets: ['env']
		}),
        new webpack.optimize.ModuleConcatenationPlugin(),
		new UglifyJSPlugin(),
	]
}

'use strict';
const BabelModuleTemplate = require('./lib/babel-module-template');

class BabelEnginePlugin {
	constructor(babelOptions, options) {
		this._options = {
			babel: Object.assign({}, babelOptions),
			plugin: Object.assign({verbose: true}, options)
		};
	}

	apply(compiler) {
		if (compiler.hooks) {
			compiler.hooks.compilation.tap('BabelEnginePlugin', compilation => {
				new BabelModuleTemplate(compilation, this._options).apply(compilation.moduleTemplates.javascript);
			});
		} else {
			compiler.plugin('compilation', compilation => {
				compilation.moduleTemplate.apply(new BabelModuleTemplate(compilation, this._options));
			});
		}
	}
}

module.exports = BabelEnginePlugin;

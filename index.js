'use strict';
const BabelModuleTemplate = require('./lib/babel-module-template');

class BabelEnginePlugin {

	constructor(options) {
		this._options = Object.assign({}, options);
	}

	apply(compiler) {
		compiler.plugin('compilation', compilation => {
			compilation.moduleTemplate.apply(new BabelModuleTemplate(compilation, this._options));
		});
	}
}

module.exports = BabelEnginePlugin;

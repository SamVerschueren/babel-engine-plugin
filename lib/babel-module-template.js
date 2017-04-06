'use strict';
const babel = require('babel-core');
const sources = require('webpack-sources');
const readPkgUp = require('read-pkg-up');
const semver = require('semver');

const RawSource = sources.RawSource;

class BabelModuleTemplate {

	constructor(compilation, options) {
		this._compilation = compilation;
		this._options = options;
		this._engines = new Map();
	}

	apply(moduleTemplate) {
		moduleTemplate.plugin('module', (source, module) => {
			if (module.context.indexOf('/node_modules/') === -1) {
				return source;
			}

			let range = this._engines.get(module.context);

			if (range === undefined) {
				const pkg = readPkgUp.sync({cwd: module.context, normalize: false}).pkg;
				const engines = Object.assign({}, pkg.engines);

				range = engines.node;

				if (pkg.browser) {
					range = null;
				} else if (!semver.validRange(range)) {
					this._compilation.warnings.push(new Error(`The package \`${pkg.name}\` doesn't specify the targeted Node.js version in its package.json \`engines\` field. Open an issue and ask them to do it, or even better, do a pull request.`));
					range = null;
				}

				this._engines.set(module.context, range);
			}

			if (range === null || semver.satisfies('0.10.0', range)) {
				return source;
			}

			const result = babel.transform(source.source(), this._options);

			return new RawSource(result.code);
		});
	}
}
module.exports = BabelModuleTemplate;

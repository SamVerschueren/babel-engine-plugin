'use strict';
const path = require('path');
const babel = require('babel-core');
const sources = require('webpack-sources');
const readPkgUp = require('read-pkg-up');
const semver = require('semver');

const RawSource = sources.RawSource;

const logs = new Set();

class BabelModuleTemplate {
	constructor(compilation, options) {
		this._compilation = compilation;
		this._options = options;
		this._engines = new Map();
	}

	warn(pkgName) {
		if (this._options.plugin.verbose === false && logs.has(pkgName)) {
			return;
		}

		// Keep track of all the packages we logged in case of non-verbose logging
		logs.add(pkgName);

		this._compilation.warnings.push(new Error(`The package \`${pkgName}\` doesn't specify the targeted Node.js version in its package.json \`engines\` field. Open an issue and ask them to do it, or even better, do a pull request.`));
	}

	apply(moduleTemplate) {
		moduleTemplate.plugin('module', (source, module) => {
			if (module.context !== null && module.context.indexOf(`${path.sep}node_modules${path.sep}`) === -1) {
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
					this.warn(pkg.name);
					range = null;
				}

				this._engines.set(module.context, range);
			}

			if (range === null || semver.satisfies('0.10.0', range)) {
				return source;
			}

			const result = babel.transform(source.source(), this._options.babel);

			return new RawSource(result.code);
		});
	}
}
module.exports = BabelModuleTemplate;

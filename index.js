'use strict';
const readPkgUp = require('read-pkg-up');
const semver = require('semver');
const babel = require('babel-core');

class BabelEnginePlugin {

	constructor(options) {
		this._options = Object.assign({}, options);
		this._engines = new Map();
	}

	apply(compiler) {
		compiler.plugin('compilation', compilation => {
			compilation.plugin('succeed-module', m => {
				if (m.context.indexOf('node_modules') === -1) {
					return;
				}

				let range = this._engines.get(m.context);

				if (range === undefined) {
					const pkg = readPkgUp.sync({cwd: m.context, normalize: false}).pkg;
					const engines = Object.assign({}, pkg.engines);

					range = engines.node;

					if (pkg.browser) {
						range = null;
					} else if (!semver.validRange(range)) {
						compilation.warnings.push(new Error(`The package \`${pkg.name}\` doesn't specify the targeted Node.js version in its package.json \`engines\` field. Open an issue and ask them to do it, or even better, do a pull request.`));
						range = null;
					}

					this._engines.set(m.context, range);
				}

				if (range === null || semver.satisfies('0.10.0', range)) {
					return;
				}

				const result = babel.transform(m._source._value, this._options);

				m.source = () => result.code;
			});
		});
	}
}

module.exports = BabelEnginePlugin;

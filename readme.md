# babel-engine-plugin [![Build Status](https://travis-ci.org/SamVerschueren/babel-engine-plugin.svg?branch=master)](https://travis-ci.org/SamVerschueren/babel-engine-plugin)

> Webpack plugin that transpiles dependencies targeting Node.js versions newer than Node.js 0.10


## Install

```
$ npm install --save--dev babel-engine-plugin
```


## Usage

Within your webpack configuration object, you'll need to add the `babel-engine-plugin` to the list of `plugins`.

```js
const BabelEnginePlugin = require('babel-engine-plugin');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new BabelEnginePlugin({
            presets: ['env']
        })
    ]
}
```


## Why

Module maintainers often only target Node.js and don't really care about browser support. Tools like [Webpack](https://webpack.js.org/) allow you to easily bundle these modules and run them in the browser. But since Node.js 0.12 became deprecated, module maintainers started to leverage the new ES2016 features, for example fat-arrow functions. This becomes a problem because not all of these features are supported in the browser. Tools like [UglifyJS](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) doesn't like them either as it will fail with an `Unexpected Token` error.

The most popular Webpack loader for Babel, [`babel-loader`](https://github.com/babel/babel-loader), describes that you should [exclude `node_modules`](https://github.com/babel/babel-loader#babel-loader-is-slow) because you should transpile as few files as possible. This means, you will also exclude all the modules that utilize the new ES2016 features.

This Webpack plugin only transpiles modules in `node_modules`, if you need to transpile your source files as well, use `babel-loader`. This plugin checks checks the [`engines`](https://docs.npmjs.com/files/package.json#engines) field in `package.json` and only transpiles the dependency if it does not support Node.js 0.10.

The full discussion can be found [here](https://github.com/sindresorhus/ama/issues/446).


## API

### new BabelEnginePlugin([options])

#### options

See [`babel` options](https://babeljs.io/docs/usage/api/#options).


## Related

- [babel-loader](https://github.com/babel/babel-loader) - Webpack plugin for Babel


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)

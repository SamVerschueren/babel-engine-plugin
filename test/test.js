import test from 'ava';
import webpack from 'webpack';
import pify from 'pify';
import options from './fixtures/webpack.config';
import optionsVerbose from './fixtures/webpack.verbose.config';
import optionsConcat from './fixtures/webpack.concat.config';

const pack = pify(webpack);

test('normal', async t => {
	const stats = await pack(options);

	if (stats.hasErrors()) {
		t.fail(stats.compilation.errors[0].message);
		return;
	}

	t.pass();
});

test('non-verbose logging', async t => {
	const stats = await pack(optionsVerbose);

	if (stats.hasErrors()) {
		t.fail(stats.compilation.errors[0].message);
		return;
	}

	t.pass();
});

test('with concat', async t => {
	const stats = await pack(optionsConcat);

	if (stats.hasErrors()) {
		t.fail(stats.compilation.errors[0].message);
		return;
	}

	t.pass();
});

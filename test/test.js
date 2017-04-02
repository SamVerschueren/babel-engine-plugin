import test from 'ava';
import webpack from 'webpack';
import pify from 'pify';
import options from './fixtures/webpack.config';

const pack = pify(webpack);

test(async t => {
	const stats = await pack(options);

	if (stats.hasErrors()) {
		t.fail(stats.compilation.errors[0].message);
		return;
	}

	t.pass();
});

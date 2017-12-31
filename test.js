/* eslint-env mocha */
/* eslint-disable no-multiple-lines */
'use strict';
const assert = require('assert');
const ml = require('.');

it('should support multiline comments', () => {
	const actual = ml(() => {/*
<!doctype html>
<html>
	<body>
		<h1>Hello world!</h1>
	</body>
</html>
	*/});
	const expected = '<!doctype html>\n<html>\n\t<body>\n\t\t<h1>Hello world!</h1>\n\t</body>\n</html>';
	assert.equal(actual, expected);
});

it('should match when comment starts with `/*!`', () => {
	const actual = ml(() => {/*!
foo
	*/});
	const expected = 'foo';
	assert.equal(actual, expected);
});

it('should match when comment starts with `/*@preserve`', () => {
	const actual = ml(() => {/*@preserve
foo
	*/});
	const expected = 'foo';
	assert.equal(actual, expected);
});

it('should match when comment starts with `/*!@preserve`', () => {
	const actual = ml(() => {/*!@preserve
foo
	*/});
	const expected = 'foo';
	assert.equal(actual, expected);
});

it('should preserve leading empty lines', () => {
	const actual = ml(() => {/*


foo
	*/});
	const expected = '\n\nfoo';
	assert.equal(actual, expected);
});

it('should preserve trailing empty lines', () => {
	const actual = ml(() => {/*
foo


	*/});
	const expected = 'foo\n\n';
	assert.equal(actual, expected);
});

it('should throw if it can\'t match comment contents', () => {
	assert.throws(() => {
		ml(() => {});
	});

	assert.throws(() => {
		ml(() => {/**/});
	});
});

it('should be preserved when using Uglify', () => {
	const uglify = require('uglify-js');
	const fixture = 'const str=multiline(function(){/*!@preserve\n<!doctype html>\n*/\nconsole.log});';

	const actual = uglify.minify(fixture, {
		fromString: true,
		output: {
			comments: true
		}
	}).code;

	assert.equal(actual, fixture);
});

describe('multiline.stripIndent()', () => {
	it('should strip redundant leading whitespace', () => {
		const actual = ml.stripIndent(() => {/*
			<!doctype html>
			<html>

				<body>
					<h1>Hello world!</h1>
				</body>
			</html>
		*/});
		const expected = '<!doctype html>\n<html>\n\n\t<body>\n\t\t<h1>Hello world!</h1>\n\t</body>\n</html>';
		assert.equal(actual, expected);
	});

	it('should preserve leading empty lines', () => {
		const actual = ml.stripIndent(() => {/*


			foo
		*/});
		const expected = '\n\nfoo';
		assert.equal(actual, expected);
	});

	it('should preserve trailing empty lines', () => {
		const actual = ml.stripIndent(() => {/*
			foo


		*/});
		const expected = 'foo\n\n';
		assert.equal(actual, expected);
	});
});

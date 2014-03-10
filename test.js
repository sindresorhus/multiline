'use strict';
var assert = require('assert');
var ml = require('./multiline');

it('should support multiline comments', function () {
	var actual = ml(function(){/*
<!doctype html>
<html>
	<body>
		<h1>Hello world!</h1>
	</body>
</html>
	*/});
	var expected = '<!doctype html>\n<html>\n\t<body>\n\t\t<h1>Hello world!</h1>\n\t</body>\n</html>';
	assert.equal(actual, expected);
});

it('should match when comment starts with `/*!`', function () {
	var actual = ml(function(){/*!
foo
	*/});
	var expected = 'foo';
	assert.equal(actual, expected);
});

it('should match when comment starts with `/*@preserve`', function () {
	var actual = ml(function(){/*@preserve
foo
	*/});
	var expected = 'foo';
	assert.equal(actual, expected);
});

it('should match when comment starts with `/*!@preserve`', function () {
	var actual = ml(function(){/*!@preserve
foo
	*/});
	var expected = 'foo';
	assert.equal(actual, expected);
});

it('should throw if it can\'t match comment contents', function () {
	assert.throws(function () {
		ml(function(){});
	});

	assert.throws(function () {
		ml(function(){/**/});
	});
});

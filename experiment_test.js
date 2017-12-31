/* eslint-env mocha */
'use strict';
const assert = require('assert');
const ml = require('./experiment');

it('should support multiline comment directly as argument', () => {
	const actual = ml(/*
<!doctype html>
<html>
	<body>
		<h1>Hello world!</h1>
	</body>
</html>
	*/);
	const expected = '\n<!doctype html>\n<html>\n\t<body>\n\t\t<h1>Hello world!</h1>\n\t</body>\n</html>\n\t';
	assert.equal(actual, expected);
});

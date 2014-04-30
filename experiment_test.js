'use strict';
var assert = require('assert');
var ml = require('./experiment');

it('should support multiline comment directly as argument', function () {
	var actual = ml(/*
<!doctype html>
<html>
	<body>
		<h1>Hello world!</h1>
	</body>
</html>
	*/);
	var expected = '\n<!doctype html>\n<html>\n\t<body>\n\t\t<h1>Hello world!</h1>\n\t</body>\n</html>\n\t'
	assert.equal(actual, expected);
});

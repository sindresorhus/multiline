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

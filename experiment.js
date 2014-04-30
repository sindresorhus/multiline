'use strict';
var EOL = require('os').EOL;
var stack = require('callsites');
var reCommentContents = /\/\*([\s\S]*?)\*\//;
// Node wraps modules in a function so we can't use the native .isToplevel() method
var reTopLevel = /function \(exports, require/;

module.exports = function () {
	var frame = stack()[1];
	var fnString = frame.getFunction().toString();

	if (reTopLevel.test(fnString)) {
		// when it's top level we need to remove everything
		// before the function so we don't match the wrong comment
		fnString = fnString.split(EOL)
			.slice(frame.getLineNumber() - 1).join(EOL)
			.slice(frame.getColumnNumber() - 1);
	}

	return fnString.match(reCommentContents)[1];
}

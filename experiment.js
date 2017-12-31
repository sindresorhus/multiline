'use strict';
const EOL = require('os').EOL;
const stack = require('callsites');

const reCommentContents = /\/\*([\s\S]*?)\*\//;
// Node wraps modules in a function so we can't use the native .isToplevel() method
const reTopLevel = /function \(exports, require/;

module.exports = () => {
	const frame = stack()[1];
	let fnString = frame.getFunction().toString();

	if (reTopLevel.test(fnString)) {
		// When it's top level we need to remove everything
		// before the function so we don't match the wrong comment
		fnString = fnString.split(EOL)
			.slice(frame.getLineNumber() - 1).join(EOL)
			.slice(frame.getColumnNumber() - 1);
	}

	return fnString.match(reCommentContents)[1];
};

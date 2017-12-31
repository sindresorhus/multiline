'use strict';
const stripIndent = require('strip-indent');

// Start matching after: comment start block => ! or @preserve => optional whitespace => newline
// stop matching before: last newline => optional whitespace => comment end block
const reCommentContents = /\/\*!?(?:@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//;

const multiline = fn => {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	const match = reCommentContents.exec(fn.toString());

	if (!match) {
		throw new TypeError('Multiline comment missing.');
	}

	return match[1];
};

multiline.stripIndent = fn => stripIndent(multiline(fn));

module.exports = multiline;

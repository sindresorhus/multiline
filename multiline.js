/*!
	multiline
	Multiline strings in JavaScript
	https://github.com/sindresorhus/multiline
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	// start matching after: comment start block => optional whitespace => newline
	// stop matching before: last newline => optional whitespace => comment end block
	var reCommentContents = /\/\*\s*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;

	var multiline = function (fn) {
		if (typeof fn !== 'function') {
			throw new TypeError('Expected a function.');
		}

		return reCommentContents.exec(fn.toString())[1];
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = multiline;
	} else {
		window.multiline = multiline;
	}
})();

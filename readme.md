# multiline [![Build Status](https://travis-ci.org/sindresorhus/multiline.svg?branch=master)](https://travis-ci.org/sindresorhus/multiline)

> Multiline strings in JavaScript

No more string concatenation or array join!

*Use ES2015 [template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings) instead whenever possible.*

#### Before

```js
const str = '' +
'<!doctype html>' +
'<html>' +
'	<body>' +
'		<h1>❤ unicorns</h1>' +
'	</body>' +
'</html>' +
'';
```

#### After

```js
const str = multiline(()=>{/*
<!doctype html>
<html>
	<body>
		<h1>❤ unicorns</h1>
	</body>
</html>
*/});
```


## How

It works by wrapping the text in a block comment, anonymous function, and a function call. The anonymous function is passed into the function call and the contents of the comment extracted.

Even though it's [slower than string concat](http://jsperf.com/multiline), that shouldn't realistically matter as you can still do 2 million of those a second. Convenience over micro performance always.


## Install

```
$ npm install multiline
```


## Usage

Everything after the first newline and before the last will be returned as seen below:

```js
const str = multiline(()=>{/*
<!doctype html>
<html>
	<body>
		<h1>❤ unicorns</h1>
	</body>
</html>
*/});
```

Which outputs:

```
<!doctype html>
<html>
	<body>
		<h1>❤ unicorns</h1>
	</body>
</html>
```

### Strip indent

You can use `multiline.stripIndent()` to be able to indent your multiline string without preserving the redundant leading whitespace.

```js
	const str = multiline.stripIndent(()=>{/*
			<!doctype html>
			<html>
				<body>
					<h1>❤ unicorns</h1>
				</body>
			</html>
	*/});
```

Which outputs:

```
<!doctype html>
<html>
	<body>
		<h1>❤ unicorns</h1>
	</body>
</html>
```


### String substitution

`console.log()` supports [string substitution](http://nodejs.org/docs/latest/api/console.html#console_console_log_data):

```js
const str = 'unicorns';

console.log(multiline(()=>{/*
  I love %s
*/}), str);

//=> 'I love unicorns'
```


## Use cases

- [CLI help output](https://github.com/sindresorhus/pageres/blob/cb85922dec2b962c7b45484023c9ba43a9abf6bd/cli.js#L14-L33)
- [Test fixtures](https://twitter.com/TooTallNate/status/465392558000984064)
- [Queries](https://github.com/freethejazz/twitter-to-neo4j/blob/a41b6c2e8480d4b9943640a8aa4b6976f07083bf/cypher/queries.js#L15-L22) - *here an example in Cypher, the query language for Neo4j*
- [CLI welcome message](https://github.com/yeoman/generator-jquery/blob/4b532843663e4b5ce7d433d351e0a78dcf2b1e20/app/index.js#L28-L40) - *here in a Yeoman generator*

Have one? [Let me know.](https://github.com/sindresorhus/multiline/issues/new)


## Experiment

I've also done an [experiment](experiment.js) where you don't need the anonymous function. It's too fragile and slow to be practical though.

It generates a callstack and extracts the contents of the comment in the function call.

```js
const str = multiline(/*
<!doctype html>
<html>
	<body>
		<h1>❤ unicorns</h1>
	</body>
</html>
*/);
```


## FAQ

### But JS already has multiline strings with `\`?

```js
const str = 'foo\
bar';
```

This is not a multiline string. It's line-continuation. It doesn't preserve newlines, which is the main reason for wanting multiline strings.

You would need to do the following:

```js
const str = 'foo\n\
bar';
```

But then you could just as well concatenate:

```js
const str = 'foo\n' +
'bar';
```


## Browser

While it does work fine in the browser, it's mainly intended for use in Node.js. Use at your own risk.

```
$ npm install multiline
```

With Webpack, Browserify, or something similar.


### Compatibility

- Latest Chrome
- Firefox >=17
- Safari >=4
- Opera >=9
- Internet Explorer >=6

### Minification

Even though minifiers strip comments by default there are ways to preserve them:

- Uglify: Use `/*@preserve` instead of `/*` and enable the `comments` option
- Closure Compiler: Use `/*@preserve` instead of `/*`
- YUI Compressor: Use `/*!` instead of `/*`

You also need to add `console.log` after the comment so it's not removed as dead-code.

The final result would be:

```js
const str = multiline(function(){/*!@preserve
<!doctype html>
<html>
	<body>
		<h1>❤ unicorns</h1>
	</body>
</html>
*/console.log});
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)

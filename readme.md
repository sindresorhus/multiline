# multiline [![Build Status](https://travis-ci.org/sindresorhus/multiline.svg?branch=master)](https://travis-ci.org/sindresorhus/multiline)

> Multiline strings in JavaScript

No more string concatenation or array join!

*Note that ES6 will have [template string](http://www.2ality.com/2011/09/quasi-literals.html) which can be multiline, but time...*

#### Before

```js
var str = '' +
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
var str = multiline(function(){/*
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

```bash
$ npm install --save multiline
```


## Usage

Everything after the first newline and before the last will be returned as seen below:

```js
var str = multiline(function(){/*
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
	var str = multiline.stripIndent(function(){/*
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

## Use cases

A real-world [use case](https://github.com/sindresorhus/pageres/blob/cb85922dec2b962c7b45484023c9ba43a9abf6bd/cli.js#L14-L33) from my `pageres` module.

Another use case is for query strings.  Here's [an example in Cypher](https://github.com/freethejazz/twitter-to-neo4j/blob/master/cypher/queries.js), the query language for Neo4j.

Have one? Let me know.


## Experiment

I've also done an [experiment](experiment.js) where you don't need the anonymous function. It's too fragile and slow to be practical though.

It generates a callstack and extracts the contents of the comment in the function call.

```js
var str = multiline(/*
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
var str = 'foo\
bar';
```

This is not a multiline string. It's line-continuation. It doesn't preserve newlines, which is the main reason for wanting multiline strings.

You would need to do the following:

```js
var str = 'foo\n\
bar';
```

But then you could just as well concatenate:

```js
var str = 'foo\n' +
'bar';
```

*Note that ES6 will have real [multiline strings](https://github.com/lukehoban/es6features#template-strings).*


## Browser

While it does work fine in the browser, it's mainly intended for use in Node.js.

### Install

Download [manually](https://github.com/sindresorhus/multiline/releases) or with a package-manager.

```bash
$ bower install --save multiline
```

```bash
$ component install sindresorhus/multiline
```

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

You also need to add `0` after the comment so it's not removed as dead-code.

The final result would be:

```js
var str = multiline(function(){/*!@preserve
<!doctype html>
<html>
	<body>
		<h1>❤ unicorns</h1>
	</body>
</html>
*/0});
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)

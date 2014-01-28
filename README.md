# CSSTree

CSS AST Builder

[![Build Status](https://travis-ci.org/codenothing/CSSTree.png?branch=master)](https://travis-ci.org/codenothing/CSSTree)
[![Code Climate](https://codeclimate.com/github/codenothing/CSSTree.png)](https://codeclimate.com/github/codenothing/CSSTree)

### Installation

```bash
$ npm install csstree
```

CSSTree may also be run in a browser enviornment.

```html
<script type='text/javascript' src='CSSTree.js'></script>
```


### Usage

```js
var instance = new CSSTree( css );

// CSS Tree
console.log( instance.branches );
```


### Example

```js
var instance = new CSSTree( "html body { background: red; margin: 10px 5px; }" );

console.log( instance.branches );
```

Will give an object format of the following:

```js
{
	selector: 'html body',
	parts: [
		'html',
		'body'
	],
	rules: [
		{
			property: 'background',
			value: 'red',
			parts: [
				'red'
			]
		},
		{
			property: 'margin',
			value: '10px 5px',
			parts: [
				'10px',
				'5px'
			]
		}
	]
}
```



### Position Objects

Every selector, rule, atrule and comment includes a 'Position' object which contains useful
information about that fragments section of the stylesheet. Comes in the following form:

```js
{
	property: 'background',
	value: 'red',
	parts: [
		'red'
	],
	position: {
		range: {
			start: 40,
			end: 60,
			length: 20
		},
		start: {
			line: 2,
			character: 2
		},
		end: {
			line: 2,
			character: 22
		},
		chunks: [
			{
				start: 40,
				end: 60,
				length: 20
			}
		]
	}
}
```

* **range**: Contains the start and end indexes of the fragment within the stylesheet
* **start**: Contains the starting line/character info of the fragment based on line breaks (\r\n|\r|\n)
* **end**: Contains the ending line/character info of the fragment based on line breaks (\r\n|\r|\n)
* **chunks**: When a comment exists between the start & end indexes, chunks represents only the sections that belong to this position.


### License

```
The MIT License

Copyright (c) 2013 Corey Hart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

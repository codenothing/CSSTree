all: lint
	@node build/build.js

lint:
	@node build/lint.js

test: lint
	@node build/test.js

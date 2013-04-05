.PHONY: all test

all: build

clean:
	@./build/clean.sh

lint:
	@node build/lint.js

build: clean lint
	@node build/build.js

test: build
	@node build/test.js

test-full:
	@./build/full.sh

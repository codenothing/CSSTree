#!/bin/bash
cd `dirname $0`
cd ../

# Clean out test results
if [ -d build/results/ ]; then
	rm -rf build/results/
fi

# Build result
if [ -d dist/ ]; then
	rm -rf dist/
fi

# Demo result
if [ -f demo/CSSTree.js ]; then
	rm demo/CSSTree.js
fi

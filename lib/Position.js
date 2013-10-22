function Position( start, _parent ) {
	var self = this;

	if ( ! ( self instanceof Position ) ) {
		return new Position( start, _parent );
	}

	if ( _parent && _parent instanceof Position ) {
		self._parent = _parent;
	}

	if ( start === undefined ) {
		start = 0;
	}

	self.range = { start: start, end: start, length: 0 };
	self.start = { line: 0, character: 0 };
	self.end = { line: 0, character: 0 };
	self.chunks = [];
	self.markChunkStart( start, false );
}

Position.prototype = {

	markChunkStart: function( pos, propagate ) {
		var self = this;

		self._chunk = { start: pos, end: pos, length: 0 };
		self.chunks.push( self._chunk );

		if ( self._parent && propagate !== false ) {
			self._parent.markChunkStart( pos, propagate );
		}
	},

	markChunkEnd: function( pos, propagate ) {
		var self = this;

		if ( self._chunk ) {
			self._chunk.end = pos;
			self._chunk.length = pos - self._chunk.start + 1;
			delete self._chunk;
		}

		if ( self._parent && propagate !== false ) {
			self._parent.markChunkEnd( pos, propagate );
		}

		return self;
	},

	markEnd: function( pos, propagate ) {
		var self = this;

		self.markChunkEnd( pos, propagate );
		self.range.end = pos;
		self.range.length = pos - self.range.start + 1;

		if ( self._parent ) {
			delete self._parent;
		}

		return self;
	}

};

global.CSSTree.Position = Position;

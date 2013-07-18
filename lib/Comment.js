function Comment( comment, nested, position ) {
	var self = this;

	if ( ! ( self instanceof Comment ) ) {
		return new Comment( comment, nested, position );
	}

	self.comment = ( comment || '' ).trim();
	self.nested = !!nested;
	self.position = position;
}

global.CSSTree.Comment = Comment;

"use strict";

import controller from "../core/controller";

module.exports = class main extends controller{
   	constructor(req, res) {
		super();
	}

	index() {
		this.res.end("hello, the world");
	}
}
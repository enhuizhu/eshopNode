"use strict";
import auth from "../middlewares/auth.js";
import {paths} from "../config/pathConfig.js";

export default class route {
	constructor(app) {
		this.controllers = {};
		this.app = app;
		this.setRoute();
	}

	response(obj, req, res, params = []) {
		if( typeof this.controllers[ obj.controller ] == 'undefined' ) {
			var controller = require("../controllers/" + obj.controller);	
			this.controllers[ obj.controller ] = new controller();
		}

		this.controllers[obj.controller].setReqRes(req, res);
		this.controllers[obj.controller][obj.action](...params);
	}

	setRoute() {
		let that = this;
		let multer  = require('multer')
		/**
		* need absolute path, otherwise when move to other plateform
		* the path will be different
		**/
		let upload = multer({ dest: paths.VIDEO_UPLOAD_PATH});
		
		this.app.get("/",  (req, res) => {
			that.response({
				controller: "main",
				action: "index"
			}, req, res);
		});
	}
}
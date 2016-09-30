"use strict";

import database from "../libs/database";
import {dbConfig} from "../config/dbConfig";

export default class model {
	constructor() {
		switch(dbConfig.default) {
			case "mongodb":
				this.db = require("../modules/mongodbClient").db;
				break;
			case "mysql":
				this.db = new database(dbConfig.mysql.HOST, dbConfig.mysql.USER, dbConfig.mysql.PASSWORD, dbConfig.mysql.DATABASE);
				break;		
			default:
				throw "unsupport database!"
				break;
		}
	}

	getObjectId(id) {
		var notification = require("../services/notification");
		var ObjectId = require('mongodb').ObjectID;
		
		try{
			return new ObjectId(id);
		}catch(e) {
			notification.pub("error", {success: false, msg:e.message});
			throw "error on creating ObjectId";		
		}
	}
}



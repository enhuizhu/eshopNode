import {apiConfig} from "../config/apiConfig";

let jwt = require('jwt-simple'),
	moment = require("moment"),
	q = require("q");

var tokenService = {
	getToken: (username) => {
		var token = jwt.encode({
			id: username,
			exp: + moment().add(7, 'days')._d
		}, apiConfig.tokenSecrect);

		return token;
	},

	validateToken: (token) => {
		var deferred = q.defer();

		try{
			var decoded = jwt.decode(token, apiConfig.tokenSecrect),
				username = decoded.id,
				expireTime = decoded.exp,
				result = {},
				usersModel = require("../models/users"),
				users = new usersModel();
			/**
			* should check if username already exist
			**/
			users.isUserExist(username, (response) => {
			    if (!response || response.length === 0) {
			    	result = {
			    		success: false,
			    		msg: "invalid token"
			    	}
			    }else if(expireTime < + (new Date())){
			    	result = {
			    		success: false,
			    		msg: "token expired"
			    	}
			    }else{
			    	result = {
			    		success: true,
			    		msg: "ok"
			    	}
			    }

			    deferred.resolve(result);
			})

		}catch(e) {
			result = {
				success: false,
				msg: "invalid token"
			}

			deferred.resolve(result);
		}

		return deferred.promise;
	}	
}

export default tokenService;

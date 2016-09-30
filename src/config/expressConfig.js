"use strict";

import session from "client-sessions";
import bodyParser from  "body-parser";

export default function expressSetting(app, express) {
	app.use(session({
	    cookieName: 'session',
	    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
	    duration: 30 * 60 * 1000,
	    activeDuration: 5 * 60 * 1000,
	    httpOnly: true,
	    ephemeral: true
	}));

	app.use(bodyParser.json());

	app.use(function(req, res, next) {
	    var contentType = req.headers['content-type'] || '', 
	        mime = contentType.split(';')[0];

	    if (mime != 'text/plain') {
	        return next();
	    }

	    var data = '';
	    req.setEncoding('utf8');
	    
	    req.on('data', function(chunk) {
	        data += chunk;
	    });
	    
	    req.on('end', function() {
	        req.rawBody = data;
	        next();
	    });
	});

	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	}))

	app.use(bodyParser.raw());
}
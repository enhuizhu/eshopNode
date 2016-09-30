"use strict";

var controller = process.argv[2];

if (!controller) {
	throw "please specify the controller name";
}

var	fs = require("fs"),
	content = '"use strict";\n\n'+
		'import controller from "../core/controller";\n\n'+
		'module.exports = class ' + controller + ' extends controller{\n'+   	
		'\tconstructor(req, res) {\n'+		
		'\t\tsuper();\n'+
		'\t}\n\n'+

		'\tindex() {\n'+
		'\t\tthis.res.end("hello, the world");\n'+
		'\t}\n'+
		'}';

fs.writeFile("./src/controllers/" + controller + ".js", content, function(err) {
	if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

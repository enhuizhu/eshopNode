import express from "express";
import expressSetting from "./config/expressConfig.js";
import route from "./routes/route.js";
import {dbConfig} from "./config/dbConfig";
/**
* should check the default database
**/

if(dbConfig.default === "mongodb") {
	require("./modules/mongodbClient");
}

let app = express();

expressSetting(app, express);

app.use(express.static(__dirname + '/public'));

new route(app);

app.listen(8080);

console.log("server running at http://127.0.0.1:3000");

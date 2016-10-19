import express from "express";
import http from "http";
import socketIo from "socket.io";
import expressSetting from "./config/expressConfig.js";
import route from "./routes/route.js";
import {dbConfig} from "./config/dbConfig";
import liveOrderService from "./services/liveOrderService.js";

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

let httpApp = http.Server(app);
httpApp.listen(8080);

let io = socketIo(httpApp);

new liveOrderService(io);

console.log("server running at http://127.0.0.1:8080");

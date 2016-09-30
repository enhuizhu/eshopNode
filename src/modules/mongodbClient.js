"use strict";

import {dbConfig} from "../config/dbConfig";
// Retrieve
var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/" + dbConfig.mongodb.DATABASE, {native_parser:true}, function(err, db) {  
    if(!err){
    	console.log("db connect successfully!");
    	MongoClient.db = db;
    	
    	db.collection("users").find({username:"admin"}).toArray(function(err, items) {
            if (!err && items.length === 0) {
    			db.collection("users").insert({
    				username: "admin",
    				password: "admin"
    			}, {w:1}, function(err, records) {
    				console.info("insert admin");
    				console.info(err, records);
    			});
    		}
    	});

    }else{
        console.log("connect to db fail, the error message is:",err);
    } 
});

module.exports = MongoClient;
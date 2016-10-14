"use strict";

const dbConfig = {
    "default": "mysql",

    "mongodb": {
    	DATABASE: "media"
    },

	"mysql": {
		HOST: "172.28.128.3",
		USER: "root",
		PASSWORD: "rootpw",
		DATABASE: "eshop"
	}
}

export {dbConfig};

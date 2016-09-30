"use strict";

const dbConfig = {
    "default": "mongodb",

    "mongodb": {
    	DATABASE: "media"
    },

	"mysql": {
		HOST: "172.28.128.3",
		USER: "root",
		PASSWORD: "roowpw",
		DATABASE: "eshop"
	}
}

export {dbConfig};

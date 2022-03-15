const { NONAME } = require("dns");
const path = require("path");

module.exports = {
	//if mode is development, it will stop WP from minifying - for debugging
	mode: "development",
	devtool: false,
	entry: "./src/index.js",
	output: {
		//filename will become hello.js instead of main.js. reverted
		filename: "main.js",
		//build dir will be /andi/xx/ANDI_BUILD instead of xx/dist. reverted
		path: path.resolve(__dirname, "dist"),
	},
};

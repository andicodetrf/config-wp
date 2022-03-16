const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

// module.exports = {
// 	//if mode is development, it will stop WP from minifying - for debugging
// 	mode: "development",
// 	devtool: false,
// 	entry: "./src/index.js",
// 	//leave it as main.js in dev while prod is one with hash
// 	output: {
// 		filename: "main.js",
// 		path: path.resolve(__dirname, "dist"),
// 	},
// };

//merge common + dev
module.exports = merge(common, {
	mode: "development",
	devtool: false,
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
});

const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

//some items can be removed coz it'll fallback to using those in webpack.common.js
//in order to use some functionalities from webpack.common file, need to use webpack merge
// module.exports = {
// 	mode: "production",
// 	output: {
// 		filename: "main.[contenthash].js",
// 		path: path.resolve(__dirname, "dist"),
// 	},
// };

//merge common & prod configs
module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "main.[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		//svg filename & dirname in dist
		assetModuleFilename: "images/[name].[hash][ext]",
		//cleans dist dir
		clean: true,
	},
});

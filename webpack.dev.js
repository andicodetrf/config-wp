const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
	devtool: "source-map", //shows your app dir + code in browser devtool
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				//to use sass, add sass-loader (requires node-sass as well)
				//sequence:
				//turn sass into css, turn css into commonjs, then inject js into DOM
				//to extract css into its own file for prod, extract this into wp.dev instead.
				test: /\.s?css$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		template: "./src/template.html",
	// 	}),
	// ],
});

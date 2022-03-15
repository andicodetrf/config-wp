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
	module: {
		rules: [
			{
				test: /\.css$/,
				//css-loader -> now you can just load it (main.css) in your JS file
				//style-loader -> injects that css-turn-js code into DOM
				//there is a strict order to using these 2 loaders based on above seq.
				//hence order must be css-loader, then style-loader
				//however, orders are reversed (right - to - left) in WP.
				//tho it looks like SL load first, its actually CL that load first.
				use: ["style-loader", "css-loader"],
			},
		],
	},
};

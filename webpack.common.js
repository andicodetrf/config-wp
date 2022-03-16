const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	//if mode is development, it will stop WP from minifying - for debugging
	// mode: "development",
	// devtool: false,
	// entry: "./src/index.js",
	//to split into multiple bundles
	entry: {
		main: "./src/index.js",
		vendor: "./src/vendor.js",
	},
	// output: {
	// 	//filename will become hello.js instead of main.js. reverted
	// 	//prob with filename: "main.js" is that it will always be the same name so you cant purge browser cache even if you main.js is updated with new code.
	// 	//the only way the browser will self-purge is if the filenames are different. a common way of doing this is hashing filename when content changes
	// 	filename: "main.[contenthash].js",
	// 	//build dir will be /andi/xx/ANDI_BUILD instead of xx/dist. reverted
	// 	path: path.resolve(__dirname, "dist"),
	// },
	module: {
		rules: [
			// {
			// 	test: /\.css$/,
			// 	//css-loader -> now you can just load it (main.css) in your JS file
			// 	//style-loader -> injects that css-turn-js code into DOM
			// 	//there is a strict order to using these 2 loaders based on above seq.
			// 	//hence order must be css-loader, then style-loader
			// 	//however, orders are reversed (right - to - left) in WP.
			// 	//tho it looks like SL load first, its actually CL that load first.
			// 	use: ["style-loader", "css-loader"],
			// },
			{
				//to use sass, add sass-loader (requires node-sass as well)
				//sequence:
				//turn sass into css, turn css into commonjs, then inject js into DOM
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				//to resolve asset filetypes
				//the htmlwppluggin is gonna ask WP to use template.html, then this html-loader is gonna takeover the html
				//as it encounters img src attr, its gonna require the file.
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				//since WP5, file-loader is deprecated
				//asset/resource emits a separate file and exports the URL. Previously achievable by using file-loader
				//outputPath (asset's dir can be configed in output property (see wp.prod))
				test: /\.(svg|png|jpg|gif)$/i,
				type: "asset/resource",
			},
			// {
			// 	//since WP5, file-loader is deprecated but can still be used
			// 	test: /\.(svg|png|jpg|gif)$/,
			// 	use: {
			// 		loader: "file-loader",
			// 		options: {
			// 			name: "[name].[hash].[ext]",
			// 			outputPath: "imgs",
			// 		},
			// 	},
			// },
		],
	},
	//HtmlWebpackPlugin() will generate a html file for us to handle our script tag dynamic build filename
	//to specify which template file to use for adding the dynamic script tag, add the template property as an arg.
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
		}),
	],
};

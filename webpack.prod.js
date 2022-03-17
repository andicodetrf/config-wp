const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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
		// filename: "main.[contenthash].js",
		//dynamic filename for bundle-splitting
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
		//svg filename & dirname in dist
		assetModuleFilename: "images/[name].[hash][ext]",
		//cleans dist dir
		clean: true,
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
		// new HtmlWebpackPlugin({
		// 	template: "./src/template.html",
		// }),
	],
	//extracted css file seems to be minimized by default even without cssMinimizerPlugin possibly coz:
	//1. the imported bootstrap css file is already minimized
	//2. sass-loader / WP4 onwards auto-minimize css file
	// NOTE: if you only have cssMinimizerPlugin() in the array, it will override the minification of JS files (eg. main.js etc)
	// JS files are minified by default in prod mode by WP via terser plugin (came along with WP). default -> whitespace & comments are removed. other options - drop_console -> drop logs
	// to add terser plugin etc if minimizer[] to be used for other minifications (< WP5)
	// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
	optimization: {
		minimizer: [
			// `...`,
			new CssMinimizerPlugin(),
			//remove those console types from dist
			new TerserPlugin({
				terserOptions: {
					compress: {
						pure_funcs: [
							"console.info",
							"console.debug",
							"console.warn",
							"console.log",
						],
					},
				},
			}),
			// new HtmlWebpackPlugin({
			// 	template: "./src/template.html",
			// 	// minify: {
			// 	// 	removeAttributeQuotes: true,
			// 	// 	collapseWhiteSpace: true,
			// 	// 	removeComments: true,
			// 	// },
			// }),
		],
	},
	module: {
		rules: [
			{
				//sequence:
				//turn sass into css(SL), turn css into commonjs(CL),
				//instead of style-loader, use MiniCssExtLoader to extract css into files
				test: /\.s?css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			// {
			//config for un-minimizing css file
			// 	test: /\.s?css$/,
			// 	loader: "sass-loader",
			// 	options: {
			// 		sassOptions: {
			// 			outputStyle: "expanded",
			// 		},
			// 	},
			// },
		],
	},
});

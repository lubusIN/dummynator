const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const inProduction = "production" === process.env.NODE_ENV;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackRTLPlugin = require("webpack-rtl-plugin");

const externals = {
  react: "React"
};
const wpDependencies = [
  "components",
  "element",
  "blocks",
  "utils",
  "date",
  "data",
  "i18n",
  "editPost",
  "plugins"
];
wpDependencies.forEach(wpDependency => {
  externals["@wordpress/" + wpDependency] = {
    this: ["wp", wpDependency]
  };
});

// Webpack config.
const config = {
  entry: {
    script: ["./src/index.js"]
  },
  externals,
  // Tell webpack where to output.
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
  },
  resolve: {
    modules: [__dirname, "node_modules"]
  },
  devtool: "source-map",
  module: {
    rules: [
      // Use Babel to compile JS.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      // SASS to CSS.
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: "raw-loader" },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: () => [require("autoprefixer")]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                outputStyle: inProduction ? "compressed" : "nested"
              }
            }
          ]
        })
      }
    ]
  },

  // Plugins.
  plugins: [
    // Removes the "build" folder before building.
    new CleanWebpackPlugin(["build"]),
    new ExtractTextPlugin("style.css"),

    // Create RTL css.
    new WebpackRTLPlugin()
  ]
};

// inProd?
if (inProduction) {
  // Uglify JS.
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));

  // Minify CSS.
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
}

module.exports = config;

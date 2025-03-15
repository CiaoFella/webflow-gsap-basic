const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");

// Get all JS files from src directory
const srcDir = path.resolve(__dirname, "src");
const entries = {};

// Function to recursively find all JS files in src directory
function findJsFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isDirectory()) {
      findJsFiles(path.join(dir, file.name));
    } else if (file.name.endsWith(".js")) {
      const relativePath = path.relative(srcDir, path.join(dir, file.name));
      const entryName = relativePath.replace(/\.js$/, "");
      entries[entryName] = path.join(dir, file.name);
    }
  });
}

// Create src directory if it doesn't exist
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// Find all JS files in src directory
findJsFiles(srcDir);

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: entries,
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      library: "[name]",
      libraryTarget: "umd",
      globalObject: "this",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: isProduction,
            },
          },
          extractComments: false,
        }),
      ],
    },
    plugins: [new CleanWebpackPlugin()],
    devtool: false,
    mode: isProduction ? "production" : "development",
  };
};

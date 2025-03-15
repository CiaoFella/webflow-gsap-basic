const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");

// Get all JS and SCSS files from src directory
const srcDir = path.resolve(__dirname, "src");
const entries = {};

// Function to recursively find all JS and SCSS files in src directory
function findFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isDirectory()) {
      findFiles(path.join(dir, file.name));
    } else if (file.name.endsWith(".js")) {
      const relativePath = path.relative(srcDir, path.join(dir, file.name));
      const entryName = relativePath.replace(/\.js$/, "");
      entries[entryName] = path.join(dir, file.name);
    } else if (file.name.endsWith(".scss")) {
      const relativePath = path.relative(srcDir, path.join(dir, file.name));
      const entryName = relativePath.replace(/\.scss$/, "");

      // Only add SCSS as entry if there's no JS file with the same name
      if (!entries[entryName]) {
        entries[entryName] = path.join(dir, file.name);
      } else {
        // If there's already a JS entry, add the SCSS file to it
        const existingEntry = entries[entryName];
        entries[entryName] = [existingEntry, path.join(dir, file.name)];
      }
    }
  });
}

// Create src directory if it doesn't exist
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// Find all JS and SCSS files in src directory
findFiles(srcDir);

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
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["autoprefixer"]],
                },
              },
            },
            "sass-loader",
          ],
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
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 3456, // Changed port to 3456 as requested
      hot: true,
    },
    devtool: false,
    mode: isProduction ? "production" : "development",
  };
};

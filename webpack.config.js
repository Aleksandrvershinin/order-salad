const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'main.[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
})

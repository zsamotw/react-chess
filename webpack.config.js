const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    publicPath: "/",
    contentBase: "./public",
    hot: true
},
  module: {
    rules: [
      {
      test: /\.css?$/,  
      use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          getCustomTransformers: path.join(
            __dirname,
            './webpack.ts-transformers.js'
          )
        }
      }
    ]
  },
  "plugins": [new HtmlWebPackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    })]
}

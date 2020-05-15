const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({  // Generates default index.html
      template:'src/index.html'
    }),
    // new HtmlWebpackPlugin({  // Also generate a this.html
    //   filename: 'this.html',
    //   template: 'src/this.html'
    // }),
    // new HtmlWebpackPlugin({  // Also generate a chain.html
    //   filename: 'chain.html',
    //   template: 'src/chain.html'
    // })
  ]
})

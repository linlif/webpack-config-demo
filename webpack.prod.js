const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin'); // js代码压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css代码压缩插件

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all', // 可选值： function (chunk) | initial | async | all  指定需要做代码分割的chunks，all表示所有模块，async表示异步引入的模块
      minSize: 30000, // 单位是Byte,30000Byte = 30kb，表示大小超过这个值的模块，才进行代码分割
      maxSize: 0, // 单个模块大小超过这个值（且大于minSize）时，将进行代码分割，优先级 minSize > maxSize > (maxInitialRequests/maxAsyncRequests)，0表示不尝试对超大体积的模块进行分割，如果设定一个值（例如50000），那么当单个模块超出这个值时，就会尝试对这个模块分割，且忽略maxInitialRequests/maxAsyncRequests这个两个参数的限制。
      minChunks: 1, // 引用次数超过这个值时，才进行代码分割
      maxAsyncRequests: 5, // 最大同步请求数，这个参数限制代码分割的数量，因为浏览器单次可同时可以发出的请求是有限制的（chrome是6个请求），这个参数使用默认的就好，不建议更改
      maxInitialRequests: 3, // 入口文件最多同时发出的请求数，这个限制入口页的请求数，3表示页面刚刚进来时，只请求3个js文件，即入口页面的代码分割不会超过3个（即使单个文件可能很大）
      automaticNameDelimiter: '~', // chunk名（vender）和原始名之间的连接符，例如：vender~index.js、vender~index2.js 中间的~号，就是通过这个参数来配置的
      name: true, // 可选值： boolean: true | function (module, chunks, cacheGroupKey) | string ，用户指定分割模块的名字，设置为true表示根据chunks和cacheGroup key自动生成
      cacheGroups: { // 缓存组，做代码分割时，会把一个模块在所有地方的引入情况做统计，最后形成一个引用图，这样才可以做到代码分割的优化（知道引用次数，知道是否被引用过，避免重复打包），这个组中，自动继承且可以覆盖 splitChunks.* 的配置，它还有自己的配置（test, priority，reuseExistingChunk，default）
        // venders: {
        //   default: false, // 表示忽略默认缓存组中的配置
        //   priority: 0, // 一个模块可以属于多个缓存组，该属性指定了缓存组的优先级，默认为0，允许使用复数来指定优先级，例如：-10的优先级比-20的高
        //   reuseExistingChunk: true, // 二次利用已经存在的chunk，如果这个缓存组中的chunk已经在入口模块（main module）中存在了，就不会引入，这就是cacheGroups缓存组存在的意义之一
        //   test: /[\\/]node_module[\\/]]/, // 可选值：function (module, chunk) | RegExp | string 指定些模块属于venders这个缓存组，省略test表示所有模块
        //   filename: '[name].bundle.js', // 当模块是初始块时（initial chunk），允许覆盖原有模块的名称，支持output.filename中的所有占位符
        //   enforce: true, // 设置为true表示忽略splitChunks.minSize/splitChunks.minChunks/splitChunks.maxAsyncRequests/splitChunks.maxInitialRequests配置，为当前缓存组生成chunks
        // },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true, // 忽略其他配置（splitChunks.minChunks、splitChunks.maxAsyncRequests等），为每个匹配的缓存组（cache group）生成独立的chunks，这里的意思是把每个css文件单独放到styles目录下
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
  }
})
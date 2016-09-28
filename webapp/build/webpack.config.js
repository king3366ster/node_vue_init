const cwd = process.cwd()
const path = require('path')
const globby = require('globby')
const postcss = require('postcss')
const webpack = require('webpack')
const webappPath = path.join(__dirname, '../')
const excludeJS = /(node_modules)/

function generateEntry (path) {
  let globbyPaths = webappPath + path
  let paths = globby.sync(globbyPaths)
  let basePath = globbyPaths.replace(/[\*].*?$/, '').replace(/\\/g, '/')

  let result = {}
  paths.forEach(item => {
    item = item.replace(/\\/g, '/')
    result[item.replace(basePath, '').replace(/\.(js|css)$/, '')] = item.replace(/\.(js|css)$/,'')
  })
  return result
}

module.exports = {
  context: webappPath,
  //页面入口文件配置
  entry: generateEntry('src/js/**/*.*'),
  //入口文件输出配置
  output: {
    path: path.join(webappPath, 'dist/js'),
    filename: '[name].js'
  },
  babel: {
    presets: [
      ['stage-0'],
      ['es2015', {'loose': true, 'modules': 'commonjs'}]
    ],
    cacheDirectory: true,
    plugins: [
      'add-module-exports'
      // 'transform-es3-property-literals',
      // 'transform-es3-member-expression-literals'
    ]
  },
  module: {
    //加载器配置
    loaders: [
      { test: /\.html$/, loader: 'raw'},
      { test: /\.css$/, loader: 'style!css!postcss!autoprefixer' },
      { test: /\.js$/, exclude: excludeJS, loader: 'babel'},
      { test: /\.vue$/, loader: 'vue'},
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url',
        query: {
          // limit for base64 inlining in bytes
          limit: 4096,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  //其它解决方案配置
  resolve: {
    root: [
      path.join(webappPath, 'src/js'),
    ],
    extensions: ['', '.js', '.json', '.css', '.vue'],
    alias: {
      'components': path.resolve(webappPath, './src/components'),
      'modules': path.resolve(webappPath, './src/modules')
    }
  },
  resolveLoader: {
    root: [
      path.resolve(webappPath, '../node_modules')
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    // new webpack.optimize.CommonsChunkPlugin('common.js')
  ]
}

const cwd = process.cwd()
const path = require('path')
const webpack = require('webpack')
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const webappPath = path.join(__dirname, '../')

module.exports = {
  //插件项
  plugins: [commonsPlugin],
  context: webappPath,
  //页面入口文件配置
  entry: [
    path.join(webappPath, 'src/js/test')
  ],
  //入口文件输出配置
  output: {
    path: path.join(webappPath, 'dist/js'),
    filename: '[name].js'
  },
  module: {
    //加载器配置
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // { test: /\.js$/, loader: 'jsx-loader?harmony' },
      // { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  //其它解决方案配置
  resolve: {
    root: [
      path.join(webappPath, 'src')
    ], //绝对路径
    extensions: ['', '.js', '.json', '.css'],
    alias: {
    }
  }
};
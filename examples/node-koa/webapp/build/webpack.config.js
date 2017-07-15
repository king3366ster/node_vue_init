const path = require('path')
const globby = require('globby')
const postcss = require('postcss')
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname, '../')

function generateEntry (filepath) {
  let globbyPaths = path.join(projectRoot, filepath)
  let paths = globby.sync(`${globbyPaths}/**/*.js`)
  let basePath = globbyPaths.replace(/[\*].*?$/, '').replace(/\\/g, '/')
  let result = {}
  paths.forEach(item => {
    item = item.replace(/\\/g, '/')
    result[item.replace(basePath, '').replace(/\.(js|css)$/, '')] = item.replace(/\.(js|css)$/,'')
  })
  return result
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {

  context: projectRoot,
  //页面入口文件配置
  entry: generateEntry('src/js/entry'),
  //入口文件输出配置
  output: {
    filename: '[name].js',
    path: path.join(projectRoot, 'dist/js'),
    // Code Splitting 用于页面按需懒加载
    publicPath: 'dist/js/',
    pathinfo: true
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss!postcss-cssnext',
        include: [resolve('src/css')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src/js')],
        query: {
          presets: [
            ["env", {
              "targets": {
                "browsers": "> 5%"
              },
              "useBuiltIns": true,
            }],
            ['stage-0'],
            ['es2015', {'loose': true, 'modules': 'commonjs'}]
          ],
          cacheDirectory: true,
          plugins: [
            'add-module-exports',
            ['transform-runtime', {polyfill: false}]
            // 'transform-es3-property-literals',
            // 'transform-es3-member-expression-literals'
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          autoprefixer: false,
          postcss: [
            require('precss')(),
            require('postcss-cssnext')({
              browsers: ['Android >= 4', 'iOS >= 7', 'Chrome >= 10', 'Firefox >= 10', 'IE >= 10']
            })
          ]
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          // limit for base64 inlining in bytes
          limit: 4096,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    // 全局挂载插件
    new webpack.ProvidePlugin({})
  ]
}

// 生成环境要压缩
if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(
    // 压缩JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  )
} else {
  webpackConfig.devtool = 'source-map'
  // webpackConfig.devtool = 'cheap-source-map',
}


module.exports = webpackConfig

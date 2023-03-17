const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');
var webpack=require('webpack');
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
	pages: {
		index: {
			// page 的入口文件
			entry: 'src/main.js',
			// 模板文件
			template: 'public/index.html',
			// 在 dist/index.html 的输出文件
			filename: 'index.html',

		}
	},
  chainWebpack: config => {
    config.module
    .rule('js')
    .include.add(path.resolve(__dirname,'packages')).end()
    .use('babel')
    .loader('babel-loader')
    .tap(options=>{
       return options;
    })
  },
  lintOnSave:false,
  devServer: {
      overlay: { // 让浏览器 overlay 同时显示警告和错误
       warnings: false,
       errors: false
      },
      host: "localhost",
      port: 3000, // 端口号
      https: false, // https:{type:Boolean}
      open: false, //配置自动启动浏览器
      hotOnly: true, // 热更新
      // proxy: 'http://localhost:8080'  // 配置跨域处理,只有一个代理
    //   proxy: { //配置多个跨域
    //     '/api': {
				// 	
				// }
    //   }
    },
    configureWebpack: {
      output: {
          sourcePrefix: ' '
      },
      amd: {
          toUrlUndefined: true
      },
      resolve: {
          alias: {
              '@': path.resolve('src'),
              'cesium': path.resolve(__dirname, cesiumSource)
          }
      },
      plugins: [
          new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers'}]),
          new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets'}]),
          new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets'}]),
          new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers'}]),
          new webpack.DefinePlugin({
            CESIUM_BASE_URL: JSON.stringify("./"),
          }),
      ],
      module: {
        unknownContextCritical: /^.\/.*$/,
        unknownContextCritical: false,
      },
  }
}
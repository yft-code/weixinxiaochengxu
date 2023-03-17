const path = require('path');
// const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
var webpack=require('webpack');
module.exports = {
	publicPath: "./", // 公共路径
  indexPath: 'index.html' , // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'controlplatform', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
	//文件名哈希
	filenameHashing: true,
	//用于多页配置，默认是 undefined
	pages: {
		index: {
			// page 的入口文件
			entry: 'src/main.js',
			// 模板文件
			template: 'public/index.html',
			// 在 dist/index.html 的输出文件
			filename: 'index.html',
			// 当使用页面 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'Index Page',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index'],
		}
	},
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复热更新失效
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
      .set('@static', resolve('src/../public/static'));
    // 压缩图片
    // 需要 npm i -D image-webpack-loader
    // config.module
    //   .rule("images")
    //   .use("image-webpack-loader")
    //   .loader("image-webpack-loader")
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: [0.65, 0.9], speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    //   });
  },
  configureWebpack: config => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (IS_PROD) {
      // plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: "[path].gz[query]",
      //     algorithm: "gzip",
      //     test: productionGzipExtensions,
      //     threshold: 10240,
      //     minRatio: 0.8
      //   })
      // );
    }
		// plugins = [
		// 	new webpack.ProvidePlugin({
		// 		$: "jquery",
		// 		jQuery: "jquery",
		// 		"windows.jQuery": "jquery"
		// 	})
		// ];
    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    extract: IS_PROD,
    // requireModuleExtension: false,// 去掉文件名中的 .module
    loaderOptions: {
// 			postcss: {
//         plugins: [
//           require('postcss-plugin-px2rem')({
//             rootValue: 192, // 新版本的是这个值
// 						exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
//             mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
//             minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
//           }),
//         ]
//       },
			sass: {
				// prependData: `@import "@/assets/common/variable.scss";` ,//引入全局变量   
			}
    }
  },
  devServer: {
      overlay: { // 让浏览器 overlay 同时显示警告和错误
       warnings: true,
       errors: true
      },
      host: "localhost",
      port: 8080, // 端口号
      https: false, // https:{type:Boolean}
      open: false, //配置自动启动浏览器
      hotOnly: true, // 热更新
      // proxy: 'http://localhost:8080'  // 配置跨域处理,只有一个代理
    //   proxy: { //配置多个跨域
    //     '/api': {
				// 	
				// }
    //   }
    }
}
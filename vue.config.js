const webpack = require("webpack")
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        "window.jQuery": "jquery"
      })
    ],
    externals: {
      // "richform": "richform",
      // "short-uuid": "short-uuid",
      // "echarts": "echarts",
      // "hotkeys-js": "hotkeys-js",
      // "ramda": "ramda",
      // "vue": "vue",
      // "vue-router": "vue-router",
      // "vue-draggable-resizable-gorkys": "vue-draggable-resizable-gorkys",
    }
  },
}

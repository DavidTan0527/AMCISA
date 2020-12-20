const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'AMCISA',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      skipWaiting: true,
      clientsClaim: true,
      // ...other Workbox options...
    },
  },
  configureWebpack: {
    // optimization: {
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     chunks: 'all',
    //     maxInitialRequests: Infinity,
    //     minSize: 0,
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name(module) {
    //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //           return `npm.${packageName.replace('@', '')}`;
    //         },
    //       },
    //     },
    //   },
    // },
    plugins: [
      new WorkboxPlugin.GenerateSW({
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],
        runtimeCaching: [{
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        }],
      })
    ],
  },
};

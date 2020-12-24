const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // ...other vue-cli plugin options...
  chainWebpack(config) {
    config.plugins.delete('prefetch');
  },
  pwa: {
    name: 'AMCISA',
    themeColor: '#204278',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',

    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // skipWaiting: true,
      // clientsClaim: true,
      maximumFileSizeToCacheInBytes: 5000000,
    },
  },
  configureWebpack: {
    plugins: [
      new WorkboxPlugin.GenerateSW({
        exclude: [/\.(?:png|jpg|jpeg|svg|ttf|otf)$/],
        runtimeCaching: [{
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        },
        {
          urlPattern: /\.(?:ttf|otf)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts',
            expiration: {
              maxEntries: 100,
            },
          },
        }],
      })
    ],
  },
};

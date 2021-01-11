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
      }),
    ],
  },

  // pluginOptions: {
  //   prerenderSpa: {
  //     registry: undefined,
  //     renderRoutes: [
  //       '/',
  //       '/nus/events',
  //       '/nus/faq',
  //       '/nus/foc',
  //       '/ntu/events',
  //       '/ntu/faq',
  //       '/ntu/foc',
  //     ],
  //     useRenderEvent: true,
  //     headless: true,
  //     onlyProduction: true,
  //     postProcess: (route) => {
  //       let html = route.html;
  //       // Defer scripts and tell Vue it's been server rendered to trigger hydration
  //       html = html
  //         .replace(/<script (.*?)>/g, '<script $1 defer>')
  //         .replace('id="app"', 'id="app" data-server-rendered="true"');
  //       // Double google analytics
  //       html = html.replace(/<script [^>]*?http:\/\/www.googletagmanager.*?<\/script>/, '')
  //       // Stripe tracking iframe
  //       html = html.replace(/<iframe [^>]*Stripe[^>].*?><\/iframe>/, '')
  //       // eslint-disable-next-line
  //       route.html = html;
  //       return route;
  //     },
  //   },
  // },
};

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/assets/_variables.scss";
        `
      }
    }
  }
};
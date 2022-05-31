// DEV 和 FAT公用即可
module.exports = {
  DEV: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '/api': '/' },
    },
    '/translation-api': {
      target: 'http://translation-api.rico.org.cn',
      changeOrigin: true,
      pathRewrite: { '/translation-api': '/' },
    },
  },
  FAT: {
    '/api': {
      target: 'http://qingkong-v3.rico.org.cn',
      changeOrigin: true,
      pathRewrite: { '/api': '/' },
    },
    '/translation-api': {
      target: 'http://translation-api.rico.org.cn',
      changeOrigin: true,
      pathRewrite: { '/translation-api': '/' },
    },
  },
  PROD: {
    '/api': {
      target: 'http://translation-api.rico.org.cn',
      changeOrigin: true,
      pathRewrite: { '/api': '/' },
    },
  },
}

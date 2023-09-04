const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/pages", {
      target: "https://api.notion.com/v1",
      secure: false,
      changeOrigin: true
    })
  );
};
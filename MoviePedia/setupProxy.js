// // src/setupProxy.js
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/flutter-json', // The path you want to proxy
//     createProxyMiddleware({
//       target: 'https://showdigital.in', // The URL of the server you want to proxy to
//       changeOrigin: true,
//       pathRewrite: {
//         '^/flutter-json': '/flutter-json', // Optional: Rewrite the path if needed
//       },
//     })
//   );
// };


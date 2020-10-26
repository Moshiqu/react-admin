const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware([process.env.REACT_APP_API], {
        target: process.env.REACT_APP_BASE_URL,//配置请求的服务器地址
        // target: "http://www.web-jshtml.cn/api/react"
        changeOrigin: true,
        pathRewrite: {
            [`${process.env.REACT_APP_API}`]: "",
            // "^/devApi": "",
        }
    }))

    /**
     * 1. 匹配到 devApi, 开始做代理 http://www.web-jshtml.cn/api/react
     * 2. 本来应该是 http://www.web-jshtml.cn/api/react/devApi/login 
     * 3. 可是pathRewrite 重写路径 http://www.web-jshtml.cn/api/react/login 
     */

    // app.use(proxy("/manage/api", {
    //     target: "http://admintest.happymmall.com",
    //     changeOrigin: true,
    // }))

};
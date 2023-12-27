const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const apiUrl = ['/api']
    app.use(
        apiUrl,
        createProxyMiddleware({
            target: 'http://localhost:8080', // 내부서버에 백엔드와 프론트엔드 모두 존재하므로 변할일 없음.
            changeOrigin: true,
            // router: {
            //     '/api': 'http://localhost:8080',
            //   },
        })
        // 다른 백엔드 서버로 보낼일이 있는 경우 추가로 사용할수 있음.
    )
}
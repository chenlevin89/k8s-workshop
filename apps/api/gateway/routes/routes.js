const ROUTES = [
    {
        url: '/auth',
        auth: false,
        proxy: {
            target: process.env.AUTH_SERVICE,
            changeOrigin: false,
        }
    },
    {
        url: '/tasks',
        auth: true,
        proxy: {
            target: process.env.TASKS_SERVICE,
            changeOrigin: false,
            // pathRewrite: {
            //     [`^/premium`]: '',
            // },
        }
    }
]

module.exports = ROUTES;
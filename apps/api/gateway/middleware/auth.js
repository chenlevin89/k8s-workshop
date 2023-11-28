const setupProxies = (app, routes) => {
    routes.forEach(route => {
        if(route.auth){
            app.use(route.url, (req,res,next) => {
                const token = req.headers['Authorization'];
                console.log('Validate Token', token);
                next();
            });
        }
    })
}

module.exports = setupProxies
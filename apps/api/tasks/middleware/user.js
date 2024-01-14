const httpClient = require('../utils/httpClient');

const USER_API = `${process.env.USER_API}/user`;

const userMiddleware= async (req,res,next)=> {
        const response = await httpClient.get(USER_API);
        const user = response.data;
        req.user = user;
        next();
}

module.exports = userMiddleware
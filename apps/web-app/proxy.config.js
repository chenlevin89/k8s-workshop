const PROXY_PATH = process.env.PROXY_PATH || 'localhost:3111';

const PROXY_CONFIG = {
  "/api/*": {
    "target": `http://${PROXY_PATH}`,
    "secure": false,
    "pathRewrite": {'^/api': ''},
    "logLevel": "debug"
  }
};

module.exports = PROXY_CONFIG;

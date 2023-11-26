const express = require('express');
const path = require('path');
const {createProxyMiddleware} = require('http-proxy-middleware');
const compress = require('compression');

const _app_folder = process.env.APP_FOLDER || 'dist/';

const PROXY_PATH = process.env.PROXY_PATH;

const app = express();

app.use(compress());

app.use(express.static(_app_folder));

app.get('/healthcheck', function (req, res) {
  res.json({status: true});
})

app.use(['/api'], createProxyMiddleware({
  target: PROXY_PATH,
  changeOrigin: true,
  pathRewrite: {'^/api': ''}
}));

app.get('*', function (req, res) {
  res.status(200).sendFile(path.resolve(`${_app_folder}/index.html`));
});

const port = process.env.PORT || 4200;
const server = app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
server.on('error', console.error);

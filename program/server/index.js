const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const fs = require('fs');
const app = new Koa();

app.use(static(path.normalize(path.join(__dirname, '..', 'frontend', 'dist'))));

app.listen(3000);
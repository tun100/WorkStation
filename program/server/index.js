const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const fs = require('fs');
const app = new Koa();
const dbutils = require('./db.js');
var router = require('./router.js');

async function entryFunc() {
	// init db
	await dbutils.run(`
        CREATE TABLE IF NOT EXISTS wst_user (
        id integer PRIMARY KEY autoincrement,
        user text,
        password text,
        createtime TIMESTAMP default (datetime('now', 'localtime')) 
        )
    `);
	await dbutils.run(`
        CREATE TABLE IF NOT EXISTS wst_log (
        id integer PRIMARY KEY autoincrement,
        atitle text,
        acontent text,
        adetail text,
        ajson text,
        createtime TIMESTAMP default (datetime('now', 'localtime')) 
        )
    `);
	// init server
	app.use(static(path.normalize(path.join(__dirname, '..', 'frontend', 'build'))));

	app.use(router.routes()).use(router.allowedMethods());
	app.listen(3000);
}

entryFunc();

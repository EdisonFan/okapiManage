#!/usr/bin/env node
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const serve = require('koa-static');
const proxy=require('./proxy-okapi');
const path = require('path');
const proxyokapi = async (ctx, next) => {
    let pathArray = ctx.path.split('/');
    if (pathArray[1] === 'proxy') {
       ctx=await proxy(ctx);
    } else {
        await next()
    }
}

console.log("__dirname=",__dirname);

app.use(bodyParser());
app.use(proxyokapi);
app.use(serve(path.join(__dirname, './build')));
app.listen(3001,()=>{
    console.log('running on 3001');
});
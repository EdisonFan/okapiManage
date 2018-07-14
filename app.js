#!/usr/bin/env node
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const serve = require('koa-static');
const proxy=require('./proxy-okapi');
const path = require('path');
let program = require('commander');
const proxyokapi = async (ctx, next) => {
    let pathArray = ctx.path.split('/');
    if (pathArray[1] === 'proxy') {
       ctx=await proxy(ctx);
    } else {
        await next()
    }
}
program
  .version('0.0.1')
  .option('-p, --port <n>', 'running on port', parseInt)
  .parse(process.argv);
app.use(bodyParser());
app.use(proxyokapi);
app.use(serve(path.join(__dirname, './build')));
const port=program.port||3000;
app.listen(port,()=>{
    console.log('running on %j',port);
});
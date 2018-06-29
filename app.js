const Koa = require('koa');
const route = require('koa-route');
var index = require('./routes/index');
const app = new Koa();
const fs = require('fs.promised');
const serve = require('koa-static');
const path = require('path');

const logger = async(ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    await next();
}

const other = async function (ctx, next) {
    ctx.response.type = 'html';
    let r=await fs.readFile('./views/index.html', 'utf8');
    ctx.response.body =r;
   
};
const static = serve(path.join(__dirname,'views')); //静态资源处理  views是静态资源文件夹
app.use(logger);
app.use(static);
//app.use(other);

app.listen(3001);
const Koa = require('koa');
const route = require('koa-route');
var index = require('./routes/index');
const app = new Koa();
const fs = require('fs.promised');

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next()
}

const other = async function (ctx, next) {
    ctx.response.type = 'html';
    let r=await fs.readFile('./views/index.html', 'utf8');
    ctx.response.body =r;
    next()
};
app.use(logger);
app.use(other);

app.listen(3001);
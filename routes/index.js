const route = require('koa-route');
const index = ctx => {
    ctx.response.body = 'Hello World';
};

module.exports = index;

const axios = require('axios');
const proxy = async (ctx) => {
    try {
        var instance = axios.create();
        let headers = ctx.headers;
        let okapiHost=headers.okapihost;
        delete headers.origin;
        delete headers.referer;
        let r = await instance({
            method: ctx.method,
            url: `${okapiHost}${ctx.originalUrl.replace('/proxy','')}`,
            validateStatus: function (status) {
                return status < 600;
            },
            headers: headers,
            data: ctx.request.rawBody
        });
        ctx.response.set({ ...r.headers });
        ctx.response.status = r.status;
        ctx.response.body = r.data;
        instance = null;
        
    }
    catch (error) {
        ctx.response.status = 404;
        ctx.response.body = error.toString();
    }
    return ctx

};

module.exports=proxy
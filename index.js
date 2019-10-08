var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

var app = new Koa();
app.use(bodyParser());
var router = new Router();

router
    .get('/', (ctx, next) => {
        console.log(ctx)
        ctx.body = 'Hello World';
    })
    .post('/users', async (ctx, next) => {
        let arr = [];
        ctx.body = ctx.request.body;
    })
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3001);

process.once('SIGINT', function () {
    console.log('SIGINT received...');
    process.exit();
});
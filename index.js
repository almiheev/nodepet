const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const lib =  require('./module');

const app = new Koa();
app.use(bodyParser());
const router = new Router();

app.use(async (ctx, next) => {
    ctx.status = 200
    console.log(ctx.request.method +"-" + ctx.request.url);
    next();
})

router
    .get('/', (ctx, next) => {
        ctx.body = 'Hello World';
    })
    .post('/users', async (ctx, next) => {
        ctx.body = lib.greetings(ctx.request.body.name);
    })
app
    .use(router.routes())
    .use(router.allowedMethods());



app.listen(3001);

process.once('SIGINT', function () {
    console.log('SIGINT received...');
    process.exit();
});
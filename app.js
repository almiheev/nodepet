const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const initRoutes = require('./src/routes');

const DB = require('./src/initializers/db');

const app = new Koa();
const router = new Router();

initRoutes(router);

const db = new DB();

db.getItems()
    .then(items => {
      //  console.log(items);
        return db.createItem({ price: 100, name: 'edckmelcknmeo' });
    })
    .then(id => {
      //  console.log(id);
        return db.getItems();
    })
    .then(items => {
       // console.log(items);
    });

//db.getItem('25a4623e-7daa-43a5-a241-137281cc78dd').then(
  //  item => {console.log(item)}
//);

db.deleteItem('25a4623e-7daa-43a5-a241-137281cc78dd')
    .then(() => {
        return db.getItem('25a4623e-7daa-43a5-a241-137281cc78dd')
    }
);

app
    .use(bodyparser())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app.listen(3000, () => {
    console.log('Server started');
});
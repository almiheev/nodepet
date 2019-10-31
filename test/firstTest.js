const request = require('supertest');
const app =  require('../app.js');
const chai = require('chai');
const expect = chai.expect;

describe('GET /items', async () => {
    it('Should return list of items', async () => {

       const resp = await request (app)
           .get('/items')
           .expect(200);
       const {body} = resp;

       expect(body).to.be.an('array');
    })


});


const chai = require("chai");
const mocha = require("mocha");
const chaiHttp = require("chai-http");
const { json } = require("express");
const { base } = require("../src/models/book.models");
const describe = mocha.describe
const expect = chai.expect
const baseUrl = "http://localhost:3000/api"

chai.use(chaiHttp);
describe("Bookstore API Unit Test", function() {
    var book ;
    //get an specific book
    //get '/:id'
    it('request a book with id: 5fb059f3eeeaa22c4c093dc6 ', function(done) {
        chai.request(baseUrl)
        .get('/5fb059f3eeeaa22c4c093dc6')
        .end(function(err, res) {
                console.log(res.body)
                expect(res.body).to.have.property('id').to.be.equal('5fb059f3eeeaa22c4c093dc6');
                expect(res).to.have.status(200);
                done();        
        });
    });
    //post a book
    //post '/'
    it('add a new book', function(done) {
        chai.request(baseUrl)
        .post('/')
        .send({name:"¿Cómo pensar como Sherlock Holmes", autor:"María Konnikova", imagen:"", state:"leyendo"})
        .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
        });
    });

    //get all books
    //get '/'
    it('get all books', function(done) {
        chai.request(baseUrl)
        .get('/')
        .end(function (err, res) {
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
        });        
    });

    //update a book
    //update '/:id'
    it('update a book', function(done) {
            chai.request(baseUrl)
            .put('/5fb4aa93ce25ef4614d1d7e5')
            .end(function(err, res) {
                    console.log(res.body)
                    expect(res.body).to.have.property('id').to.be.equal('5fb4aa93ce25ef4614d1d7e5');
                    expect(res).to.have.status(200);
                    done();
            });
    });
    //delete a book
    //delete '/:id'
//     it('delete a book with id: 5fb4aa93ce25ef4614d1d7e5', function(done) {
//         chai.request(baseUrl)
//         .get('/')
//         .end(function(err, res) {
//                 console.log(res.body)
//                 expect(res.body).to.have.lengthOf(2);
//                 expect(res).to.have.status(200);
//                 chai.request(baseUrl)
//                 .del('/5fb4aa93ce25ef4614d1d7e5')
//                 .end(function(err, res) {
//                         console.log(res.body)
//                         expect(res).to.have.status(200);
//                         chai.request(baseUrl)
//                         .get('/')
//                         .end(function(err, res) {
//                                 console.log(res.body)
//                                 expect(res.body).to.have.lengthOf(1);
//                                 expect(res.body[0]).to.have.property('id').to.be.equal(0);
//                                 expect(res).to.have.status(200);
//                                 done();
//                         })
//                 });
//         });
//     });
})
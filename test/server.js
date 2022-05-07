'use strict';

const http = require('http'); // node native

const chai = require('chai'); // npm pkg
const ws = require('ws');

const lib = require('../lib'); // local

const expect = chai.expect;

describe('server', function () {

  before(function () {
    lib.server.listen(8000);
  });

  it('should return 200', function (done) {
    http.get('http://localhost:8000', function (res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('A', function (done) {
    http.get('http://localhost:8000/A', function (res) {
      res.setEncoding('utf8');

      let rawData = '';
      res.on('data', function (chunk) {
        rawData += chunk;
      });

      res.on('end', function () {
        const parsedData = JSON.parse(rawData);
        expect(parsedData).to.be.an('object');
        expect(parsedData).to.deep.eq({msg: 'AA'});
        done();
      });
    });
  });

  it('B', function (done) {
    http.get('http://localhost:8000/B', function (res) {
      res.setEncoding('utf8');

      let rawData = '';
      res.on('data', function (chunk) {
        rawData += chunk;
      });

      res.on('end', function () {
        const parsedData = JSON.parse(rawData);
        expect(parsedData).to.be.an('object');
        expect(parsedData).to.deep.eq({msg: 'BB'});
        done();
      });
    });
  });

  it('C', function (done) {
    http.get('http://localhost:8000/C', function (res) {
      res.setEncoding('utf8');

      let rawData = '';
      res.on('data', function (chunk) {
        rawData += chunk;
      });

      res.on('end', function () {
        const parsedData = JSON.parse(rawData);
        expect(parsedData).to.be.an('object');
        expect(parsedData).to.deep.eq({msg: '/C'});
        done();
      });
    });
  });

  it('WS', function(done) {
    const client = new ws.WebSocket('ws://localhost:8000/');

    client.on('open', () => {
      console.log('c: opened');
      client.send('hello');
      client.close();
      done();
    });
    // client.on('ping', () => {});
    // client.on('close', () => {});
    // function clear() {
    // //   clearTimeout(this.pingTimeout);
    // // });
  });

  after(function () {
    lib.server.close();
  });
});

/* eslint-env mocha */

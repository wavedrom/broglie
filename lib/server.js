'use strict';

const http = require('http');
const ws = require('ws');

// TODO: https version?
// TODO: upgrade http to ws

const server = http.createServer();

server.on('request', function (req, res) {
  // console.log(req);

  // TODO: filter Requests
  // TODO: form Response
  const resMsg = {msg: req.url};
  if (req.url === '/A') {
    resMsg.msg = 'AA';
  } else
  if (req.url === '/B') {
    resMsg.msg = 'BB';
  }

  // Send Response
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(resMsg));
});

const wss = new ws.WebSocketServer({ noServer: true });

wss.on('connection', function connection(ws) {
  console.log('s: connection');

  ws.on('message', function (event) {
    console.log('s: message', event.toString());
  });

});


server.on('upgrade', function upgrade(request, socket, head) {
  console.log('s: upgrade');
  wss.handleUpgrade(request, socket, head, function done(ws) {
    console.log('s: handle upgrade');
    wss.emit('connection', ws, request);
  });
});


module.exports = server;

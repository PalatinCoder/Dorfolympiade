const functions = require('firebase-functions');
const prpl = require('prpl-server');
const express = require('express');

const server = express();

server.use('/*', prpl.makeHandler('./build', require('./build/polymer.json')));

exports.prplServer = functions.https.onRequest(server);

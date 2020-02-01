#!/usr/bin/env node

var brain = require('brain.js');
var retro = require('brain.retro.js');
var net = new brain.NeuralNetwork();

const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');


var url = 'mongodb://localhost/brainiac';
var client = new MongoClient(url);
var run = process.argv[process.argv.length - 1]

client.connect((err, conn) => {
  
  console.log("Connected to server");
  assert.equal(null, err);
  db = conn.db('brainiac');
  var results = db.collection('results');

  var records = [];
  var resultStream = results.find({run: {$eq: run}}).stream();
  resultStream.on('error', function (err) {
    console.error(err);
  });

  resultStream.on('data', function (result) {
    console.log('result', result);
    console.log('result.i', result.i)

    var select = (_in, fields) => {
      var _out = {};
      fields.forEach(f => _out[f] = _in[f]);
      return _out;
    };

    var record = {
      input: select(result.settings, ['attraction', 'repulsion', 'epsilon', 'time_dilation', 'inner_distance', 'friction', 'dampening', 'theta']),
      output: select(result, ['edge_length', 'running_time', 'stopped', 'i'])
    };

    console.log(record);

    records.push(record);
  })

  resultStream.on('end', function(){
    net.train(records);

    console.log(retro({edge_length: 10, stopped: false}, net));
  });
});
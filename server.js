#!/usr/bin/env node
var express = require('express'),
    fs = require('fs'),
    md = require("node-markdown").Markdown;

var maxEntityCount = 3;
var errorRate = 0.15;

var app = express();

// Show a readme file
app.get('/', function(req, res) {
  fs.readFile('README.md', 'utf-8', function (error, markdown) {
    res.send(md(markdown));
  });
});

// Extract the entities from the request body
app.post('/', function(req, res) {
  var text = '';
  req.setEncoding('utf-8');
  req.on('data', function (data) { text += data; });
  req.on('end', function () {
    res.setHeader('Content-Type', 'application/json');
    if (Math.random() > errorRate)
      res.status(200).send(JSON.stringify({ entities: extractEntities(text) }));
    else
      res.status(500).send(JSON.stringify({
        message: 'Random error ' + Math.floor(100 * Math.random())
      }));
  });
});

  // Extract the `maxEntityCount` longest words
function extractEntities(text) {
  return text.split(/[ \t\n\r\.\?!,;]+/)
             .sort(function (a, b) { return b.length - a.length; })
             .slice(0, maxEntityCount);
}

app.listen(process.argv[2] || 3000);

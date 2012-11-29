#!/usr/bin/env node
var express = require('express'),
    fs = require('fs'),
    md = require("node-markdown").Markdown;
var app = express();

app.get('/', function(req, res) {
  fs.readFile('README.md', 'utf-8', function (error, markdown) {
    res.send(md(markdown));
  });
});

app.listen(process.argv[2] || 3000);

'use strict'

var lunr = require('lunr');
var fs = require('fs');
var path = require('path');

var outputFilePathParameter = process.argv && process.argv.slice(2)[0];

var inputFilePath = path.resolve(__dirname, '../public/data-to-index.json');
var outputFilePath =  outputFilePathParameter || path.resolve(__dirname, '../public/search-index.json');
console.log('Reading ' + inputFilePath);
var documentsToIndex = require(inputFilePath);
var store = {};

console.log('Indexing ' + inputFilePath);
var searchIndex = lunr(function () {
  this.ref('ref')
  this.field('title', {boost:10}),
  this.field('tags', {boost:5}),
  this.field('content')

  documentsToIndex.forEach(function (doc) {
    store[doc.ref] = {
        'title': doc.title,
        'summary': doc.summary,
        'dateiso': doc.dateiso,
        'dateformatted': doc.dateformatted
    };

    this.add(doc)
  }, this)
})

console.log('Saving index at ' + outputFilePath);

var dataToSave = JSON.stringify({
    index: searchIndex.toJSON(),
    store: store
});

fs.unlink(outputFilePath, function(err){

    if (err && err.code !== 'ENOENT')
        throw err;

    var options = { flag : 'w' };
    fs.writeFile(outputFilePath, dataToSave, options, function(err) {
        if (err) 
            console.error(err);
        else
            console.log('Saved index at ' + outputFilePath);
    });
});
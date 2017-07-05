'use strict'

var fs = require('fs');
var path = require('path');

var outputFilePath = path.resolve(__dirname, 'timestamp.txt');
var timestamp = Date.now();

var saveFile = function(dataToSave, filePath, message, callback) {
    fs.unlink(filePath, function(err){

        if (err && err.code !== 'ENOENT')
            throw err;

        var options = { flag : 'w' };
        fs.writeFile(filePath, dataToSave, options, function(err) {
            if (err) 
                console.error(err);
            else {
                console.log(message);
                callback && callback();
            }
        });
    });
};

var replaceIndexFileName = function() {
    var searchJsFilePath = path.resolve(__dirname, '../public/site.js');
    var indexFilepath = '/search-index.json';
    var newIndexFilePath = `/search-index-${timestamp}.json`;
    var message = `Saved updated ${searchJsFilePath} with updated timestamp`;

    fs.readFile(searchJsFilePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var replacedFileContent = data.replace(indexFilepath, newIndexFilePath);
        saveFile(replacedFileContent, searchJsFilePath, message);
    });
};

var copyIndexFile = function() {
    var filePathOriginal = path.resolve(__dirname, '../public/search-index.json');
    var filePathWithTimestamp = path.resolve(__dirname, `../public/search-index-${timestamp}.json`);
    var message = `Search index saved as ${filePathWithTimestamp}`;

    fs.readFile(filePathOriginal, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        saveFile(data, filePathWithTimestamp, message);
    });
};

var saveTimeStamp = function() {
    var message = `Saved build timestamp (${timestamp}) in ${outputFilePath}`;
    saveFile(timestamp, outputFilePath, message, replaceIndexFileName);
};

saveTimeStamp();
copyIndexFile();
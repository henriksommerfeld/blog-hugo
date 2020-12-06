'use strict'

const lunr = require('lunr')
const fs = require('fs')
const path = require('path')

const outputFilePathParameter = process.argv && process.argv.slice(2)[0]

const inputFilePath = path.resolve(__dirname, '../public/data-to-index.json')
const outputFilePath = outputFilePathParameter || path.resolve(__dirname, '../public/search-index.json')
console.log('Reading ' + inputFilePath)
const documentsToIndex = require(inputFilePath)
const store = {}

console.log('Indexing ' + inputFilePath)
const searchIndex = lunr(function () {
  this.ref('ref')
  this.field('title', { boost: 10 }), this.field('tags', { boost: 5 }), this.field('content')

  documentsToIndex.forEach(function (doc) {
    store[doc.ref] = {
      title: doc.title,
      summary: doc.summary,
      dateiso: doc.dateiso,
      dateformatted: doc.dateformatted,
    }

    this.add(doc)
  }, this)
})

console.log('Saving index at ' + outputFilePath)

const dataToSave = JSON.stringify({
  index: searchIndex,
  store: store,
})

fs.unlink(outputFilePath, function (err) {
  if (err && err.code !== 'ENOENT') throw err

  const options = { flag: 'w' }
  fs.writeFile(outputFilePath, dataToSave, options, function (err) {
    if (err) console.error(err)
    else console.log('Saved index at ' + outputFilePath)
  })
})

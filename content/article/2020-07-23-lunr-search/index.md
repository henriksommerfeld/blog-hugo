---
title: Search for Static Website Without External Service
url: /search-static-website-without-external-service
date: 2020-07-23
description: I describe how I’ve set up search on my static website without an external service.
summary: When you have a static website, there are a few things that you usually don’t have out-of-the-box. One such thing is search. You can argue that you don’t need it, but if you want it and your site isn’t that large, I’ll describe how I’ve set it up without an external service.
tags: [Lunr, Hugo, NodeJS, JavaScript]
categories: [Coding]
ogimage: marten-newhall-uAFjFsMS3YY-unsplash.jpg
draft: false  
---

{{<post-image image="marten-newhall-uAFjFsMS3YY-unsplash.jpg" alt="person using magnifying glass enlarging the appearance of his nose and sunglasses">}}
Photo by <a href="https://unsplash.com/@laughayette?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
Marten Newhall</a>.
{{</post-image>}}

When you have a static website, there are a few things that you usually don't have out-of-the-box. One such thing is _search_. You can argue that you don't need it, but if you want it and your site isn't that large, I'll describe how I've set it up without an external service. 

This post is part 5 of my [Hugo Pipeline Series][1], so I'll use Hugo as the example here, but I've done a similar setup with [this Gatsby plugin][2] as well.

The steps I use are the following:
1. Create a json file with everything I want in my search index (Hugo)
2. Create a search index from the json file (NodeJS)
3. Download and load the index (Web Browser)
4. Perform search and present results (Web Browser)

## 1. Create file to index

I have a Hugo layout for the indexable content where I output all pages of the types I want. The type **article** is what all blog posts use and **shortcuts-windows7** is a special layout I want to include in search ([see it here](/kortkommandon-windows7/), if you're curious). [My About page](/about) is not included, since I figure you can find that anyway if you can find the search feature 🤪

Title, relative permalink, tags, the full content as plain text, the summary (excerpt) and the date (formatted and raw), are the fields I picked as searchable + available for search result presentation.

I also exclude the list page named _Articles_ (that I don't know how to get rid of, please [create a PR](https://github.com/henriksommerfeld/blog-hugo) if you know _how_ and want to help). 

[`layouts/search-index/single.html`](https://github.com/henriksommerfeld/blog-hugo/blob/master/layouts/search-index/single.html)

{{<code go-html-template>}}
{{- $.Scratch.Add "index" slice -}}
{{- range where .Site.Pages "Type" "in" (slice "article" "shortcuts-windows7") -}}
    {{- if ne .Title "Articles" -}}
        {{- $.Scratch.Add "index" (dict "title" .Title "ref" .RelPermalink "tags" .Params.tags "content" .Plain "summary" (partial "summary.html" .) "dateformatted" (dateFormat "2, January 2006" .Date) "dateiso" (time .Date)) -}}
    {{- end -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
{{</code>}}

This layout needs to be referenced and for that I have [`search-index.md`](https://github.com/henriksommerfeld/blog-hugo/blob/master/content/search-index.md) which is empty, except for the frontmatter.
``` toml
---
date: "2017-06-21
title: "search index"
type: "search-index"
url: "data-to-index.json"
---
```

## 2. Create index

Now that we have something to index, it's time to switch to NodeJS land and install [Lunr][3], `yarn add lunr`. I have a script that reads the file created in the previous step ([`data-to-index.json`][6]) and creates a new file, [`search-index.json`][7] in the output directory (`public`). This is also the place to configure Lunr with _boosting_ and such. I'm not good att tweaking search, so these settings are pretty basic. This was written before I got more heavily into NodeJS development, but it has worked without problems for a few years now.

{{<code javascript>}}
'use strict'

const lunr = require('lunr');
const fs = require('fs');
const path = require('path');

const outputFilePathParameter = process.argv && process.argv.slice(2)[0];
const inputFilePath = path.resolve(__dirname, '../public/data-to-index.json');
const outputFilePath =  outputFilePathParameter || path.resolve(__dirname, '../public/search-index.json');
console.log('Reading ' + inputFilePath);
const documentsToIndex = require(inputFilePath);
const store = {};

console.log('Indexing ' + inputFilePath);
const searchIndex = lunr(function () {
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

const dataToSave = JSON.stringify({
    index: searchIndex,
    store: store
});

fs.unlink(outputFilePath, function(err){

    if (err && err.code !== 'ENOENT')
        throw err;

    const options = { flag : 'w' };
    fs.writeFile(outputFilePath, dataToSave, options, function(err) {
        if (err) 
            console.error(err);
        else
            console.log('Saved index at ' + outputFilePath);
    });
});
{{</code>}}

This is run with an npm script _after_ Hugo has produced its output.

``` sh
> node build/index-search.js public/search-index.json

Reading /Users/henrik/Code/blog-hugo/public/data-to-index.json
Indexing /Users/henrik/Code/blog-hugo/public/data-to-index.json
Saving index at public/search-index.json
Saved index at public/search-index.json
✨ Done in 0.52s.
```

To have the search index available during development, I run the Hugo command twice. This isn't perfect, but since `hugo server` (like most dev servers) doesn't save the files on disk, this is necessary and not really a problem. The npm script looks like this: `hugo && npm run index && npm run hugo:watch` (see [full package.json here][4]).

## 3. Loading index

Most of my visitors come straight to a post from a Google search, so I'm probably the biggest user of the site search myself (maybe the only one 😳). Therefor I don't want the search index to be downloaded before the user has shown an intention to use the search feature. The index is currently a download of 134 kB (compressed), which I think is fine considering that people are watching video on web pages and that the alternative of using an external service has several other drawbacks (complexity, cost, etc). Still, the index size is worth keeping an eye on and this setup requires error handling (if the download fails or the user has started to type before the download is complete).

The index are downloaded through a regular `fetch` call when the search dialog is opened (the `open` function). 

{{<code javascript>}}
const search = {
  isOpen: false,
  textInSearchBox: '',
  index: null,
  store: null,
  indexLoadFailed: false,
  indexLoading: false,
  hits: [],
  open: function () {
    blog.isModalOpen = true;
    this.isOpen = true;
    this.textInSearchBox = '';
    this.indexLoadFailed = false;
    this.downloadIndex();
  },
  downloadIndex: function () {
    if (this.index) return;

    this.indexLoading = true;
    this.fetchIndex().then(({ index, store }) => {
      this.index = window.lunr.Index.load(index);
      this.store = store;
      this.indexLoading = false;
      this.searchBoxChanged(this.textInSearchBox);
      console.log("🔍 Search index downloaded")
    });
  },
  fetchIndex: function () {
    return fetch('/search-index.json')
      .then(this.handleFetchResponse)
      .catch(this.handleFetchResponse);
  },
  handleFetchResponse: function (response) {
    this.indexLoadFailed = !response.ok;
    return response.ok && response.json ? response.json() : this.index;
  },
  ...
}
{{</code>}}

## 4. Searching and presenting results

I have touched on this in my previous [post about Alpine.js][5], so go there for more code, but this is simply about calling the `search` function on the Lunr index. Since everything is in memory, I call the search function on every keypress in the searchbox. 

{{<post-image image="search-react.png" />}}

Good luck in implementing your own site search!


[1]: /hugo-pipeline-series-intro/
[2]: https://www.gatsbyjs.org/packages/@gatsby-contrib/gatsby-plugin-elasticlunr-search/?=lunr
[3]: https://lunrjs.com/
[4]: https://github.com/henriksommerfeld/blog-hugo/blob/master/package.json
[5]: /alpinejs-benefits-and-limitations/#an-example-with-search-results
[6]: /data-to-index.json
[7]: /search-index.json

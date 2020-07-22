---
title: Search for Static Website Without External Service
url: /search-static-website-without-external-service
date: 2020-07-18T06:21:00+02:00
description: 
summary: 
tags: [Lunr, Hugo]
categories: [Coding]
ogimage: marten-newhall-uAFjFsMS3YY-unsplash.jpg
draft: false  
---

{{<post-image image="marten-newhall-uAFjFsMS3YY-unsplash.jpg" alt="person using magnifying glass enlarging the appearance of his nose and sunglasses">}}
Photo by <a href="https://unsplash.com/@laughayette?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
Marten Newhall</a>.
{{</post-image>}}

When you have a static website, there are a few things that you usually don't have out-of-the-box. One such thing is _search_. You can argue that you don't need it, but if you want it and your site isn't that large, I'll describe how I've set it up without an external service. 

This post is part 5 of my [Hugo Pipeline Series][1], so I'll use Hugo as the example here, but I've done a similar setup with [Gatsby][2] as well.

The steps I use are the following:
1. Create a json file with everything I want in my search index (Hugo)
2. Create a search index from the contents file (NodeJS)
3. Download and load the index (Web Browser)
4. Perform search and present results (Web Browser)

## 1. Create file to index

I have a Hugo layout for the indexable content where I output all pages of the types I want. The type **article** is what all blog posts use and **shortcuts-windows7** is a special layout I want to include in search ([see it here](/kortkommandon-windows7/), if you're curious). [My About page](/about) is not included, since I figure you can find that anyway if you can find the search feature.

Title, relative permalink, tags, the summary (excerpt) as plain text and the date (formatted and raw), are the fields I picked as searchable + available for search result presentation.

I also exclude the list page named _Articles_ (that I don't know how to get rid of, please [create a PR](https://github.com/henriksommerfeld/blog-hugo) if you know _how_ and want to help). 

`layouts/search-index/single.html`

{{<code go-html-template>}}
{{- $.Scratch.Add "index" slice -}}
{{- range where .Site.Pages "Type" "in" (slice "article" "shortcuts-windows7") -}}
    {{- if ne .Title "Articles" -}}
        {{- $.Scratch.Add "index" (dict "title" .Title "ref" .RelPermalink "tags" .Params.tags "content" .Plain "summary" (partial "summary.html" .) "dateformatted" (dateFormat "2, January 2006" .Date) "dateiso" (time .Date)) -}}
    {{- end -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
{{</code>}}

This layout needs to be referenced and for that I have `search-index.md`, empty except for the frontmatter.
``` toml
---
date: "2017-06-21T06:51:27+02:00"
title: "search index"
type: "search-index"
url: "data-to-index.json"
---
```

## 2. Create index

npm scripts for dev and Prod

``` sh
> node build/index-search.js public/search-index.json

Reading /Users/henrik/Code/blog-hugo/public/data-to-index.json
Indexing /Users/henrik/Code/blog-hugo/public/data-to-index.json
Saving index at public/search-index.json
Saved index at public/search-index.json
```

## 3. Loading index

## 4. Searching and presenting results

[1]: /hugo-pipeline-series-intro/
[2]: https://www.gatsbyjs.org/
[3]: https://lunrjs.com/
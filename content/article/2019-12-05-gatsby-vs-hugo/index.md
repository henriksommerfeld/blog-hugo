---
title: "Gatsby vs Hugo for Personal Blog"
date: 2019-12-03T18:20:34+01:00
summary: ""
description: "Having built two personal websites/blogs that are fairly similar, one using Gatsby and one using Hugo, I'll take a moment to compare my experiences."
tags: [Hugo, GatsbyJS]
categories: [Coding]
ogimage: 
draft: false
---

Having built two personal websites/blogs that are fairly similar, one using [Gatsby][1] and one using [Hugo][2], I'll take a moment to compare my experiences.

## Common

Both these sites are essentially blogs with a few extra pages. **They don't have a lot of content**, 40 and 50 blog posts respectively. **All CSS is written from scratch** for both sites, no framework. They both have **_categories_ and _tags_** that you can use to find related posts. **No server-side API** is used, so once the build is done, everything is static.

Both sites are **lazy loading images** that are generated in different sizes during build. There is also **in-browser search** provided with [Lunr][3]. A search index file is created during build and shipped to the web browser, where the actual searching is performed. 



[1]: https://www.gatsbyjs.org/
[2]: https://gohugo.io/
[3]: https://lunrjs.com/

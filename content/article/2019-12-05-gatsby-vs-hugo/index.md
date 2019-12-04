---
title: "Gatsby vs Hugo for a Personal Blog"
date: 2019-12-03T18:20:34+01:00
url: gatsby-vs-hugo-for-personal-blog
summary: ""
description: "Having built two personal websites/blogs that are fairly similar, one using Gatsby and one using Hugo, I'll take a moment to compare my experiences."
tags: [Hugo, GatsbyJS]
categories: [Coding]
ogimage: 
draft: false
---

Having built two personal websites/blogs that are fairly similar, one using [Gatsby][1] and one using [Hugo][2], I'll take a moment to compare my experiences.

## Common

Both these sites are essentially blogs with a few extra pages. **They don't have a lot of content**, 40 and 50 blog posts respectively. They're also **single-language**, one in English and one in Swedish. **All CSS is written from scratch** for both sites, no framework. They both have **_categories_ and _tags_** that you can use to find related posts. **No server-side API** is used, so once the build is done, everything is static. Well, I use _Google Analytics_ and _Disqus_ on both sites, but those are third-party API's that I don't have to manage. Both are also hosted at Netlify.

Both sites are **lazy loading images** that are generated in different sizes during build. There is also **in-browser search** provided with [Lunr][3]. A search index file is created during build and shipped to the web browser, where the actual searching is performed. 

[Länkar till sajterna med logga bredvid]

## Differences

While the sites I've built are pretty much the same, Gatsby and Hugo are two different animals, despite being static site generators.

### Hugo

> "The world’s fastest framework for building websites"

Hugo is a single binary you download. It parses your templates, compiles Sass to CSS, concatenates bundles and does all sorts of image processing. What it does _not_ do is anything related to JavaScript. Go templates, HTML and CSS is the kind of development you do that concerns Hugo. Any JavaScript you need will be DOM manipulation. I started with jQuery and recently migrated to VanillaJS.

The most odd part for most web developers is probably the Go templates you use to write your logic. If you have previous experience with Go, this is of course familiar territory. I haven't, but have managed to get things working through trial and error. 

When Hugo brags about performance, it claims to be _"The world’s fastest framework for building websites"_, it's all about build time. Build times are really fantastic, but anything that happens in the browser is beyond Hugo's interest. 

I like the simplicity of Hugo. I can control every character of the generated HTML and there are no plugins to install. Especially compared to Gatsby, Hugo feels really simple. If you start to add a lot of JavaScript (I have JS based search), you're on your own, but of course npm has much to offer apart from the big frameworks.

The documentation is okay, but sometimes I miss the context needed to understand where a piece of code is supposed to go in my project.

### Gatsby

> "Fast in every way that matters"

Compared to Hugo, Gatsby is more of a dev environment. If you're used to React and the NPM ecosystem, Gatsby will feel familiar. [Gatsby's official blog starter][5] has _2182_ dependencies (according to `npm ls --parseable | wc -l`), that's 2181 more than Hugo's _single_ binary. But that also comes with some advantages: there's a plugin for almost anything you want to do and all the optimisations for pre-loading content for other routes, only loading things [_above the scroll_][6] and much more, is taken care of.

Gatsby is sort of the opposite to Hugo when talking about performance. It states _"Fast in every way that matters"_, which refers to everything _but_ build time. Build time is probably the biggest weakness apart from its complexity.  

## Summary




[1]: https://www.gatsbyjs.org/
[2]: https://gohugo.io/
[3]: https://lunrjs.com/
[4]: https://gohugo.io/documentation/
[5]: https://github.com/gatsbyjs/gatsby-starter-blog
[6]: https://www.urbandictionary.com/define.php?term=above%20the%20scroll
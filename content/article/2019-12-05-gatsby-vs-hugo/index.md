---
title: "Gatsby vs Hugo for a Personal Blog"
date: 2019-12-05
url: gatsby-vs-hugo-for-personal-blog
summary: "Having built two personal websites/blogs that are fairly similar, one using Gatsby and one using Hugo, I’ll take a moment to compare my experiences. All CSS is written from scratch for both sites, no framework. They both have categories and tags that you can use to find related posts. No server-side API is used, so once the build is done, everything is static. Well, I use Google Analytics and Disqus on both sites, but those are third-party API's that I don't have to manage."
description: "Having built two personal websites/blogs that are fairly similar, one using Gatsby and one using Hugo, I'll take a moment to compare my experiences."
tags: [Hugo, GatsbyJS, JavaScript, ReactJS]
categories: [Coding]
ogimage: hero-16x9.jpg
draft: false
---

{{<post-image image="hero-16x9.jpg" alt="Looking down on feet and two arrows painted on the ground, one left and one right.">}}
<p>Original photo by <a href="https://unsplash.com/@jontyson">Jon Tyson</a></p>
{{</post-image>}}

Having built two personal websites/blogs that are fairly similar, one using [Gatsby][1] and one using [Hugo][2], I'll take a moment to compare my experiences.

## Common

Both these sites are essentially blogs with a few extra pages. **They don't have a lot of content**, 40 and 50 blog posts respectively. They're also **single-language**, one in English and one in Swedish. **All CSS is written from scratch** for both sites, no framework. They both have **_categories_ and/or _tags_** that you can use to find related posts. **No server-side API** is used, so once the build is done, everything is static. Well, _Google Analytics_ and _Disqus_ are used on both sites, but those are third-party API's that I don't have to manage. Both are also hosted at Netlify.

Both sites are **lazy loading images** that are generated in different sizes during build. There is also **in-browser search** provided with [Lunr][3]. A search index file is created during build and shipped to the browser, where the actual searching is performed. 

In case you wonder, these are the sites I'm talking about:

* [www.isabelsommerfeld.com](https://www.isabelsommerfeld.com/) (Gatsby)
* [www.henriksommerfeld.se](https://www.henriksommerfeld.se/) (Hugo)

## Differences

While the sites I've built are pretty much the same, Gatsby and Hugo are two different animals, despite both being static site generators.

### Hugo

> "The world’s fastest framework for building websites"

Hugo is a single binary you download. It parses your templates, compiles Sass to CSS, concatenates bundles and does all sorts of image processing. What it does _not_ do is anything related to JavaScript. Go templates, HTML and CSS is the kind of development you do that concerns Hugo. Any JavaScript you need will be DOM manipulation. I started with jQuery and recently migrated to [VanillaJS][9].

The most odd part for most web developers is probably the Go templates you use to write your logic. If you have previous experience with [Go][7], this is of course familiar territory. I haven't, but have managed to get things working through trial and error. 

When Hugo brags about performance, it claims to be _"The world’s fastest framework for building websites"_, it's all about build time. The build times are really fantastic, but anything that happens in the browser is beyond Hugo's interest. 

I like the simplicity of Hugo. I can control every character of the generated HTML and there are no plugins to install. Especially compared to Gatsby, Hugo feels really simple. If you start to add a lot of JavaScript (like the JS based search I have), you're on your own, but of course NPM has much to offer even if there are no packages made specifically for Hugo sites.

The documentation is okay, but sometimes I miss the context needed to understand where a piece of code is supposed to go in my project.

### Gatsby

> "Fast in every way that matters"

Compared to Hugo, Gatsby is more of a dev environment. If you're used to [React][8] and the NPM ecosystem, Gatsby will feel familiar. [Gatsby's official blog starter][5] has _2182_ dependencies (according to `npm ls --parseable | wc -l`), that's 2181 more than Hugo's _single_ binary. But that also comes with some advantages: there's a plugin for almost anything you want to do and all the optimisations for pre-loading content for other routes, only loading things [_above the scroll_][6] and much more, is taken care of.

The documentation is outstanding, which really helps in taking advantage of the ecosystem around Gatsby. Many plugins have both a deployed demo site and the code for it easily accessible so that you can see how to use it in context of a real site, or clone it locally and run it.

Gatsby is sort of the opposite to Hugo when talking about performance. It states _"Fast in every way that matters"_, which refers to everything _but_ build time. Build time is probably the biggest weakness apart from its complexity. 

## Conclusion

I will use Hugo in the future when I know I won't have to do much with JavaScript - that will be simpler to maintain.

I will use Gatsby when I know I will use a fair amount of JavaScript on the site or that I might need to later on. With Gatsby I can grow and continue to add functionality with plugins. In those cases I can also live with the extra maintenance cost of keeping the NPM packages up-to-date.


[1]: https://www.gatsbyjs.org/
[2]: https://gohugo.io/
[3]: https://lunrjs.com/
[4]: https://gohugo.io/documentation/
[5]: https://github.com/gatsbyjs/gatsby-starter-blog
[6]: https://www.urbandictionary.com/define.php?term=above%20the%20scroll
[7]: https://golang.org/
[8]: https://reactjs.org/
[9]: https://stackoverflow.com/questions/20435653/what-is-vanillajs

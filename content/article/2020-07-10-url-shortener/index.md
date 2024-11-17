---
title: Simple Short URL Service
url: 
date: 2020-07-10
description: My personal URL shortener implementation – super simple.
summary: I happened to buy a domain name that could be used for short URL's and thought – why not, let's give it a try!
tags: [Short URL's]
categories: [Tools]
ogimage: henriks-link.png
draft: false  
---

{{<post-image image="henriks-link.png" width="500" />}}

I happened to buy a domain name that could be used for short URL's and thought: why not, let's give it a try!

A search for [_"URL shortener"_ on dev.to][1], quickly directed me down a rabbit hole, like how to build a URL shortener service at [FAANG][2] scale (for billions of users). I don't need that, just something for myself. And thinking one step further, I don't even need a URL _shortener_. Creating the links is something I can do manually to start with, the core is to have the redirects working in a fairly performant way on the public Internet without breaking the bank. Since my goal was to have _personal_ short links, I don't have to support trillions of links.

Then I found [Gijo Varghese's excellent _Netlify URL Shortener_][3]. I copied the concept and created a new repo on GitHub with the following content:

```
_redirects
404.html
index.html
```

I deployed the thing with Netlify and...done ✅ 

[Using a _redirects file with Netlify][4] means that they take care of the hard parts. The only thing I have to do is to add a new line to the __redirects_ file in my repo. It's also case-sensitive, so I could automate this with an [Alfred Workflow][5] that generates a [Base 62 hash][6] and updates the __redirects_ file in the repository, but I'll save that for some future rainy day.

Here is a link to this post: https://henriks.link/t4Xz

[1]: https://dev.to/search?q=url%20shortener
[2]: https://www.investopedia.com/terms/f/faang-stocks.asp
[3]: https://github.com/gijo-varghese/netlify-url-shortener
[4]: https://docs.netlify.com/routing/redirects/
[5]: https://www.alfredapp.com/workflows/
[6]: https://www.kerstner.at/2012/07/shortening-strings-using-base-62-encoding/

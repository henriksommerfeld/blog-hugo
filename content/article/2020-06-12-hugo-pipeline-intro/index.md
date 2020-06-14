---
title: Hugo Pipeline Series – Intro
url: /hugo-pipeline-series-intro
date: 2020-06-14T22:11:00+02:00
description: In this post(s) I'll describe how I created my personal blog with a fair amout of work to achieve simplicity. 
summary: In this post(s) I'll describe how I created my personal blog with a fair amout of work to achieve simplicity. 
tags: [Hugo]
categories: [Coding]
ogimage: quinten-de-graaf-L4gN0aeaPY4-unsplash.jpg
draft: false  
---

{{<post-image image="quinten-de-graaf-L4gN0aeaPY4-unsplash.jpg" alt="metal pipe between trees at daytime">}}
Photo by <a href="https://unsplash.com/@quinten149">
Quinten de Graaf</a>.
{{</post-image>}}

## Who is this for?

This is the first part in a series of posts where I'll describe how I created my personal blog with a fair amout of work to achieve simplicity. The intendend audience is:
* Myself (as documentation)
* Someone with their own [Hugo](gohugo.io/) blog, looking to improve automation
* Someone interesting in learning _one_ way of working with a Hugo blog

This will be an overview of the different pieces I use, it won't be a detailed description or tutorial, but I'll try to link to libraries and concepts.


## TL;DR
* [Repo is here](https://github.com/henriksommerfeld/blog-hugo). README shows how to run it locally
* A build & deploy log is here: https://app.netlify.com/sites/henriksommerfeld/deploys/5edd46691261090008d5a8b5


## Site characteristics

The site I'll be describing has the following characteristics:
* Annual running cost of **nothing**, except for the domain name
* Static site (built with [Hugo](gohugo.io/))
* 400+ images
* < 2 minutes combined build & deploy time
* Custom domain with HTTPS
* [Lazy loading of images][2] (with blurry preview when JS is available)
* Search with [Lunr](https://lunrjs.com/)
* [Lightbox][1] for images and code
* Dark/light mode
* [Alpine.js](https://github.com/alpinejs/alpine) for custom JavaScript code
* [Cypress](cypress.io/) tests that run automatically on [pull requests][7]
* [Lighthouse](https://developers.google.com/web/tools/lighthouse) audit results automatically run after deploy 
* All code is in a [public repo on GitHub](https://github.com/henriksommerfeld/blog-hugo)
* Runs locally without Internet access

What it doesn't have:
* Dynamic data loading (except for comments and analytics)
* [SPA][3] characteristics (it has full page reloads)
* Offline availability (it's not a [PWA][4])
* A proper [CMS][5]
* Configurable UI, like themes intended for re-use tend to have

A fashion blogger (or other non-technical friend) might view this setup as horribly complicated, but that's because the complexity is hidden to the user in a typical blogging platform. 

Admittedly, I've spent some time on this over the years, with small adjustment every now and then, to achieve this level of sophistication and simplicity. It might sound arrogant with "sophistication" and "simplicity" but storing the content as text files instead of in a database and having a static site that can run from a [CDN][6] is _simple_. 

It's _sophisticated_ in that the pipeline is automated and has tests in the same way as our professional applications we develop at work. I'll create a new branch, do code or design change and make a pull request (PR) to myself. If the tests that run automatically when a PR is created are green, I merge without hesitation. More details coming in future posts… ([here is part 2](/hugo-pipeline-series-editing-and-deploying/))

[1]: https://en.wikipedia.org/wiki/Lightbox_(JavaScript)
[2]: /lazy-loading-images-in-hugo
[3]: https://en.wikipedia.org/wiki/Single-page_application
[4]: https://web.dev/what-are-pwas/
[5]: https://en.wikipedia.org/wiki/Content_management_system
[6]: https://en.wikipedia.org/wiki/Content_delivery_network
[7]: https://opensource.stackexchange.com/questions/352/what-exactly-is-a-pull-request#answer-380


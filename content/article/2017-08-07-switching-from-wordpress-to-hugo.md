---
title: "Switching from WordPress to Hugo"
url: "switching-from-wordpress-to-hugo"
date: 2017-08-07T21:25:57+02:00
categories: ["Coding"]
tags: ["Hugo","WordPress"]
draft: false
---

I have recently migrated my blog from [WordPress][1] to [Hugo][2]. That is, switching from a database-based web content management system with loads of themes, plugins and a large user base to a statically generated site with no server-side logic and a small feature set where I must build most things myself. 

The switch was by no means necessary, I had cheap hosting at a web hotel I will still use for other sites after the migration, speed was good with WP Super Cache and so on. But there are still some great benefits I see now about a month after the switch.

## Benefits

**Simpler development environment**. I no longer need to have WordPress installed on my local machines and sync content between environments. Since I have my own desktop PC, a laptop from my employer and a laptop from my customer that i switch between depending on where I am, it's a hassle to have to install the WAMP stack on them and have the content databases somewhat synced. Docker or traditional virtual machines makes this a bit easier, but it's still something don't have to deal with anymore. Hugo is just a single binary. If you want your own theme and adjustments you will of course need tools for that, but that's equal between WordPress and Hugo in my case.

> _Hugo is just a single binary_

**Content are just Markdown files**. A related benefit to not having a database is that my content is now just a bunch of Markdown files checked into a Git repository. I expect migrating from Hugo to another tool in the future would not be too heavy work.


**More "professional" deployment pipeline**. With a static site generator that doesn't have special tooling for content editing, there is no difference between changing a CSS rule and adding a new blog post. For any change you do, you have to rebuild your entire site. This makes an automated deployment pipeline more important since you need it not only to deploy new code, but also to add new content. This might be a problem if you're not used to these tools, but as a developer I only experience the increased control I get. Most traditional and cheap hosting services (that hosts WordPress) I found does not provide tools for automated deployments. 

> _The full build, including Hugo page creation, Sass compilation, Javascript transpilation and creating a complete search index takes about 14 seconds_

I now use Netlify for hosting, which also offers building and deploying my site, all for free. Hugo creates all my pages, currently 255 in total, in 487 ms. The full build, including Hugo page creation, Sass compilation, Javascript transpilation and creating a complete search index takes about 14 seconds. Everything except Hugo itself is using Node. Of course, not all of this have to be done when working with the site locally and using live reload, but this is what Netlify does for the build part. So my deploy flow is as follows.

{{<figure src="/images/hugo-deploy-pipeline.png" link="/images/hugo-deploy-pipeline.png" class="image-border" alt="Deploy pipeline with VS Code, GitHub and Netlify">}}

**Utilising CDN and SSL** is also a benefit of using any of the services that will host your static content. With my old hosting company I would either have to pay a premium fee to get SSL with my custom domain name, or do a lot of manual work on a regular basis with certs from Let's Encrypt. With Netlify it's just a checkbox. If you have visitors from different parts of the world, a CDN is gold and with static content you can have your entire site served from a CDN.

## Challenges

**Search is not as easy without server-side logic**. With WordPress I had an out-of-the-box search feature that was completely sufficient for a simple blog, but with a static site you have nothing built in. There are however a few [alternatives for providing search with Hugo][5]. The Hugo community forum as an example, is using the hosted service [Algolia][6]. I chose to use [Lunr][7], which basically means that I'm creating a search index as part of my build process and that the entire index is downloaded by the web browser and search is performed locally in the browser. This works fine for a small blog, but for a larger site it will probably work better with a hosted service. My index is currently 493 KB (62.9 KB compressed download), but it only gets downloaded once you click Search in the menu. 

**Comments also requires work**. Same as with search, comments is also something that WordPress has built-in that you will have to solve yourself. I added Disqus since it's easy to get going with, easy to migrate old comments into and widely spread. Seeing how the number of web requests increased after adding Disqus was however not as pleasant. But in practice I think all of those requests is more of a privacy issue than a performance issue.

## Summary
	
In summary I find this setup more enjoyable and more appropriate for my needs with its vastly reduced technical complexity. No more updates to WordPress or its plugins. For more alternatives to how you can build your personal site, check out the comments to the post [What tool/framework/cms/etc do you use to build your own personal website?][3] I will probably follow up this post with a more in-depth description of the build process I use (what I had to write myself), but if you're familiar with Go, [How I Build My Static Assets for Hugo][8], might be interesting.

[1]: https://wordpress.org/
[2]: https://gohugo.io/
[3]: https://dev.to/nayeonkim/what-toolframeworkcmsetc-do-you-use-to-build-your-own-personal-website
[4]: https://blog.carlmjohnson.net/post/2017/hugo-asset-pipeline/
[5]: https://gohugo.io/tools/search/
[6]: https://www.algolia.com/
[7]: https://lunrjs.com/
[8]: https://blog.carlmjohnson.net/post/2017/hugo-asset-pipeline/
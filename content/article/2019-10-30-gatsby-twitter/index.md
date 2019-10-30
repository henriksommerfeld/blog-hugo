---
title: "Twitter Source Plugin for Gatsby"
date: 2019-10-30T14:54:10+01:00
url: "gatsby-twitter"
categories: ["Coding"]
tags: [GatsbyJS]
summary: ""
draft: true
---

{{<post-image image="tweet-component-screenshot.png" alt="Skewed screenshot of resulting Tweets section of web page. ">}}
<p>Screenshot of the end result.</p>
{{</post-image>}}

## Intro

I was re-writing a WordPress site in Gatsby that had embedded tweets using an embed script (WordPress plugin). The product owner (my wife), required the new site to also show her tweets. I didn't like the idea of an embed script (that would slow down the site and spy on visitors), so I started to look into Gatsby source plugins. I ended up writing my own.

## Initial Attempt

I tried [gatsby-source-twitter][1], which fetches data from [Twitter's API][5] at build time and makes it available through GraphQL. This worked liked promised, but I found a couple deal breaking flaws:

* Breaks build if no Twitter tokens are available
* Breaks build if data changes (dynamic GQL schema)
* Only fetches links, not the actual content (images...)

My way of tackling these flaws wouldn't work in a reusable plugin, so I just made different decisions about pros and cons.

### Breaks build if no Twitter tokens are available

Twitter's API requires authentication, so credentials must be provided in the plugin's config. But since you don't want to include credentials in version control, it means that you can't simply clone a repo that uses this plugin and build the project (without going through the app registration process on [Twitter's Developer site][5]). 

Furthermore I like to be able to disable this data fetching, like when developing and running repeated builds. 

### Breaks build if data changes (dynamic GQL schema)

### Only fetches links, not the actual content (images...)
This last point is by no means a criticism, but what I found when I got it all working (a working Tweets React component) was that a tweet that is only a link, e.g. https://t.co/DM6et4kaZP, doesn't say that much. If you look at the same tweet at twitter.com, it automatically includes the linked site's Twitter card/Open Graph data (title, description and image). 

I guess this could be a [transformer plugin][6] and not the responsibility of a [source plugin][7], but I felt I needed this (more details below).


## My Local Plugin
 

[1]: https://www.gatsbyjs.org/packages/gatsby-source-twitter/
[2]: https://www.gatsbyjs.org/docs/schema-customization
[3]: https://wordpress.org/
[4]: https://www.gatsbyjs.org/
[5]: https://developer.twitter.com/
[6]: https://www.gatsbyjs.org/docs/creating-a-transformer-plugin/#what-do-transformer-plugins-do
[7]: https://www.gatsbyjs.org/docs/creating-a-source-plugin/

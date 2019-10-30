---
title: "Gatsby Source Plugin for Twitter"
date: 2019-10-31T00:20:10+01:00
url: "gatsby-source-plugin-for-twitter"
categories: ["Coding"]
tags: [GatsbyJS, JavaScript, TypeScript]
summary: "Description of my local Gatsby Source Plugin for Twitter with linked source code."
draft: false
---

{{<post-image image="tweet-component-screenshot.png" alt="Skewed screenshot of resulting Tweets section of web page. ">}}
<p>Screenshot of the end result.</p>
{{</post-image>}}

## Intro

I was rewriting a [WordPress][3] site in [Gatsby][4] that had embedded tweets using an embed script (WordPress plugin). The product owner (my wife), required the new site to also show her tweets. I didn't like the idea of an embed script (that would slow down the site and spy on visitors), so I started to look into [Gatsby source plugins][7]. I ended up [writing my own](#my-local-plugin).

_An important and maybe obvious reflection is that reading tweets at build time will require a lot of builds if you're a frequent tweeter. Then a simple embed code might be a better option and you save yourself some development time._

<blockquote>unfurl.js is used to fetch additional metadata (Twitter Card / Open Graph) from linked websites. Images are downloaded so that they later can be served with gatsby-image</blockquote>

## Initial Attempt

I tried [gatsby-source-twitter][1], which fetches data from [Twitter's API][5] at build time and makes it available through GraphQL. This worked liked promised, but I found a couple deal breaking flaws:

* Breaks build if no Twitter credentials are available
* Breaks build if data changes (dynamic GQL schema)
* Only fetches links, not the actual content (images etc.)

My way of tackling these flaws wouldn't work in a reusable plugin, so I just made different decisions about pros and cons.

<blockquote>I should mention that this site I was building was my first ever encounter with Gatsby</blockquote>

### Breaks build if no Twitter credentials are available

Twitter's API requires authentication, so credentials must be provided in the plugin's config. But since you don't want to include credentials in version control, it means that you can't simply clone a repo that uses this plugin and build the project (without going through the app registration process on [Twitter's Developer site][5]). 

Furthermore I like to be able to disable this data fetching, like when developing and running repeated builds locally. 

### Breaks build if data changes (dynamic GQL schema)

This is a real deal breaker that I've struggled with even when querying markdown content (not at all related to this plugin). The [GraphQL schema is created dynamically][2] based on the content, so if you query a property for uploaded images in a tweet and none of the returned tweets have an image, the query fails and you have a broken build. When querying an external data source that you have no control over, this is unbearable.

### Only fetches links, not the actual content (images etc.)
This last point is by no means a criticism, but what I found when I got it all working (a working Tweets React component) was that a tweet that is only a link, e.g. `https://t.co/DM6et4kaZP`, doesn't say that much. If you look at the same tweet at twitter.com, it automatically includes the linked site's Twitter card/Open Graph data (title, description and image). 

I guess this could be a [transformer plugin][6] and not the responsibility of a [source plugin][7], but I felt I needed this (more details below).

<blockquote>The site builds fine without the tweets section</blockquote>

<h2 id="my-local-plugin">My Local Plugin 🎈</h2>

I should mention that this site I was building was my first ever encounter with Gatsby, so I consider myself an enthusiastic beginner. I'd be happy for any corrections of my possible misunderstandings.

What I ended up doing was [creating a local plugin][8] by shamelessly copying the [gatsby-source-twitter][1] plugin and customising it. 

### Only supporting one query
Since this plugin is local and I only had one specific use-case, I removed support for all but the query I was going to use.

### Always returning a dummy tweet
By always returning one hard-coded dummy tweet that has all the properties I query for in my React component, I avoid the potential build errors. I realise this is more of a workaround than a proper "solution", but it work for me. The downside is that I have to filter out this dummy tweet in my component, making the plugin non-reusable.

### Checking for credentials
If any of the three required Twitter API credentials (key, secret, token) isn't provided, only the dummy tweet is returned and the site builds fine without the tweets section.

### Enriching tweets
After fetching the data from Twitter's API, [unfurl.js][10] is used to fetch additional metadata (Twitter Card / Open Graph) from linked websites. Images are downloaded so that they later can be served with [gatsby-image][11].

{{<highlight js>}}
exports.sourceNodes = async (
  { actions, createContentDigest, reporter },
  { query, credentials }
) => {
  if (!query) {
    reporter.warn(`No Twitter query found. Please check your configuration`);
    return Promise.resolve();
  }

  const tweetsQueryResult = await getTweets(query, credentials, reporter);

  const enrichedTweets = await fetchMetadataFromLinkedSites(
    tweetsQueryResult.results,
    reporter
  );

  await fetchImagesFromTweets(enrichedTweets, reporter);

  const resultsWithDummy = [dummyTweet, ...enrichedTweets];
  tweetsQueryResult.results = resultsWithDummy;

  await createNodesForTweets(
    tweetsQueryResult,
    actions,
    createContentDigest,
    reporter
  );

  return Promise.resolve();
};
{{</highlight>}}
_Core of plugin's `gatsby-node.js`_

<i class="fab fa-github"></i> The repo of the entire site can be found at https://github.com/henriksommerfeld/isabel-blog
 

[1]: https://www.gatsbyjs.org/packages/gatsby-source-twitter/
[2]: https://www.gatsbyjs.org/docs/schema-customization
[3]: https://wordpress.org/
[4]: https://www.gatsbyjs.org/
[5]: https://developer.twitter.com/
[6]: https://www.gatsbyjs.org/docs/creating-a-transformer-plugin/#what-do-transformer-plugins-do
[7]: https://www.gatsbyjs.org/docs/creating-a-source-plugin/
[8]: https://www.gatsbyjs.org/docs/creating-a-local-plugin/
[9]: https://github.com/henriksommerfeld/isabel-blog/tree/master/plugins/gatsby-source-twitter-unfurl
[10]: https://github.com/jacktuck/unfurl
[11]: https://www.gatsbyjs.org/docs/using-gatsby-image/
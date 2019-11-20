---
title: "Netlify CMS with Gatsby - Best Option with Some Quirks"
date: 2019-11-19T14:14:10+01:00
url: "netlify-cms"
categories: ["Coding"]
tags: [Netlify CMS, GatsbyJS]
summary: ""
description: ""
draft: true
---

When I needed a CMS for a Gatsby site, my choice became Netlify CMS. I'll talk about my criteria, pros and cons.

This was a personal website made for a non-technical person (why I needed a CMS at all in the first place) who associates websites with WordPress. She, my wife, is fairly tech savvy, but wouldn't accept editing markdown or other "complicated things" 🙃 My hypothesis was that I could somewhat compensate for unintuitive features with some "on site training".

## Criteria

* Easy to set up authentication/authorisation
* Use Markdown for storage in a location I decide
* Customisable, for good user experience
* Good developer experience
* Cheap (ideally free)

So, the things I needed were the above. Pretty much all hosted services ticks the first checkbox of easiness to create an account and managing identity. That's the thing you need a server for, which you might not already have when your site is static.

But looking at the available headless CMS options, like on [headlesscms.org][2], there aren't many alternatives if you want a Git based CMS that is open source. One of the things I was aiming for was using Markdown for content, since I imagine that will be easier to migrate in the future than the experience I had migrating this content from WordPress (and especially WordPress.com). I can also mention that [TinaCMS][3] wasn't released at this time.

Anyway, since I had previous great experience with Netlify, Netlify CMS was already at the top of my list. After reading the post [_Gatsby and Netlify CMS: First Impressions_][1], I decided to start with the [one click installation button that Netlify provides][4]. 

Some time later when I have [the site][5] up and running I can reflect on my Netlify CMS experience. I'll start with the positive.

## Pros

* Deploys with the website (no external hosting)
* Free with Netlify hosting up to 5 users
* Easy to add route specific edit link
* Instant previews that you can code yourself
* Easy to configure page types and fields
* Possibility to add custom editor controls



## Cons

* Many open issues on GitHub
* Rich Text Editor in need of love
* Plenty of errors and warnings in console
* Saving changes locally requires setting up plugin in beta
* Easy to break preview with Gatsby
* Bad HTML makes automated UI testing harder

## Conclusion

I love these services with generous free tiers that I can use and learn about for personal use and then be aware of during architectural discussions at work.

[1]: https://dev.to/steelvoltage/gatsby-and-netlify-cms-first-impressions-4ink
[2]: https://headlesscms.org/
[3]: https://headlesscms.org/projects/tinacms
[4]: https://templates.netlify.com/template/gatsby-blog-with-netlify-cms/
[5]: https://github.com/henriksommerfeld/isabel-blog

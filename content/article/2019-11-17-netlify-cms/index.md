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

When I needed a CMS for a Gatsby site, my choice became [Netlify CMS][7]. I'll talk about my criteria, pros and cons.

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

Some time later when I have [the site][5] up and running, I can reflect on my Netlify CMS experience. I'll start with the positive.

## Pros 👍

* Deploys with the website (no external hosting)
* Free with Netlify hosting up to 5 users
* Easy to add route specific edit link
* Instant previews that you can code yourself
* Easy to configure page types and fields
* Possibility to add custom editor controls

Netlify CMS is just an extra dependency (Gatsby plugin) that lives together with your site. When you add a field to a page, the site changes and CMS changes required can go in the same commit and deploy, that's great. 

When hosting your site on Netlify, you can add up to 5 additional users that can log in to the CMS as editors/admins. This is configurable through your account on netlify.com as easily as any other setting.

Adding a link on the site that takes you to the edit mode of that specific page is a matter of just using the right URL. Maybe not the most important feature, but a small thing that makes a site owner's life a bit easier.

The preview of a page you're editing is shown right next to the rich text editor as you type. How these previews should look is up to you (the developer). It took me some fiddling to figure out how I could reuse the styling from the Gatsby site, where I'm using [styled components][6], but it's great that this is just a matter of coding.

Pages and their fields can be configured in a YAML file, see [the documentation for Collection Types][8]. Apart from being a YAML file (that's easy to mess up), it works as expected. Adding custom editor controls (called widgets) is also documented at [Creating Custom Widgets][9].


## Cons 👎

* Saving changes locally requires setting up plugin in beta
* Many open issues on GitHub
* Rich Text Editor in need of love
* Increases build time
* Only possible to preview the part you're editing
* Easy to break preview with Gatsby
* Bad HTML makes automated UI testing harder

There are a couple of downsides as well. The first and most obvious one is that by default all changes done through the CMS´ UI, even locally, is done against your remote git repository. This was a big hurdle for me initially before I got the local configuration to work and I seriously started to look for other alternatives. I cannot see how anyone could live with this during development, and [I'm not alone][10]. 

There are a fairly high number of open issues on GitHub for this code base. Some things are small and can be fixed in Gatsby, but it absolutely doesn't feel as polished as some of the commercial alternatives. 

Example: I have a _tags_ field which is entered as a comma separated list and saved as a list in markdown. If I don't have any tags in a post, Netlify CMS saves this as a list of one item with the value of an empty string. When Gatsby then tries to create a route for each tag and the tags provided are `[""]`, it's a problem. Of course it's possible to compensate for such things, but small things like this is something you will need to handle.

The Rich Text Editor could be improved in a number of ways. It uses an older version of [Slate][11] that has some issues solved in later versions, but [an upgrade seems complicated][12]. Also, there is no way to customise the editor. Take a look at this screenshot (the red lines are my hints).

{{<post-image image="insert-image.png" width="700" />}}

Inserting an image is accessed by expanding extra controls. Yet there are two always visible buttons for adding code. Who needs a Rich Text Editor? People who want to add code or people who want to add images? 🤔 All right, those aren't mutually exclusive, but admit it's a bit strange.

## Conclusion

I love these services with generous free tiers that I can use and learn about for personal use and then be aware of during architectural discussions at work. 

Funkar bra med e2e-test med Actions

[1]: https://dev.to/steelvoltage/gatsby-and-netlify-cms-first-impressions-4ink
[2]: https://headlesscms.org/
[3]: https://headlesscms.org/projects/tinacms
[4]: https://templates.netlify.com/template/gatsby-blog-with-netlify-cms/
[5]: https://github.com/henriksommerfeld/isabel-blog
[6]: https://www.styled-components.com/
[7]: https://www.netlifycms.org/
[8]: https://www.netlifycms.org/docs/collection-types/
[9]: https://www.netlifycms.org/docs/custom-widgets/
[10]: https://github.com/netlify/netlify-cms/issues/2335
[11]: https://www.slatejs.org/#/rich-text
[12]: https://github.com/netlify/netlify-cms/issues/2402
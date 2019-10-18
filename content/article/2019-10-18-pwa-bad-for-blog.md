---
title: "Progressive Web App - Bad Idea for a Blog"
date: 2019-10-18T12:19:10+02:00
url: "pwa-bad-for-blog"
categories: ["Coding"]
tags: [Progressive Web App, GatsbyJS]
summary: "My experiences of making a website a Progressive Web App. Not a good idea when it's truly a website rather than an app."
draft: false
---

I recently built a new personal website/blog for my wife using GatsbyJS and I really enjoyed all the cool stuff you can do easily with available plugins. Since didn't really have any idea about the disadvantages with _Progressive Web Apps_ (PWA), I naively just installed the [manifest][1]
and [offline][2] plugins and verified my success with [Lighthouse][3]. Boom, I had a PWA! 🎉

Then I tried the PWA on my iPhone 🙁 I discovered [there are a number of serious issues with PWA's on iOS][4], since Apple doesn't like the web, I suppose. I am using iOS 13.1.3 at the time of writing this.

## iOS PWA issues for me
* In-app browser for external links
* Navigation is different
* No address bar
* No reload. Errors persist
* File download weirdness

### External links
External links are always opened in an in-app browser rather than Safari, Chrome, Firefox or whatever you prefer. For a PWA that's perceived as a website rather than an _app_, even though it technically is an app, this is strange and confusing.

### Navigation
You don't have the _Back_ and _Forward_ buttons you're used to, instead you can do some finger swiping that I don't think I've ever made in an app (had to google it to realise that's what I was supposed to do). The lack of an address bar also means you can't just copy the URL to the page/route you're on.

### Persistent errors
The worst flaw I experienced was related to the offline support. After the issues described above I questioned why I really made a PWA in the first place. Offline support was the fist feature that came to mind, so I tried that.

I activated _Flight mode_ and clicked a few links, worked great. Then a few more links.

{{<figure src="/images/20191017_211100000_iOS.png" alt="Safari cannot open the page. Error: FetchEvent.respondWith received an error: TypeError: Internet connection seems down." class="image-border" width="400" caption="Safari cannot open the page (screenshot in Swedish)">}}

Hmm, okay, the error message could be a bit friendlier but an error is expected since not all resources can be prefetched. So I toggled off flight mode and...


{{<figure src="/images/20191017_211100000_iOS.png" alt="Safari cannot open the page. Error: FetchEvent.respondWith received an error: TypeError: Internet connection seems down." class="image-border" width="400">}}

...no difference. How do I reload the page? Force-quit the app and reopened - still the same thing. After quitting and reopening a few times I eventually got to the start page, but if I wasn't the developer of this I would have given up earlier.

### File download wierdness

Sort of the same thing happened when I tried to download a large image (there are press images on the site). I chose to save the file and then...no feedback at all. When I looked in _Pictures_, the image was there, but how to get out of the "download mode"? 

{{<figure src="/images/20191017_211351000_iOS.png" alt="pressbild-2-0c3....jpg. JPEG image 10.7 MB Open in iMovie, More..." class="image-border" width="400">}}

I tried the same thing in Chrome and that just worked like I expected, like on every web page.

## Conclusion
My ignorance around PWA's became apparent as soon as I tried it and I certainly didn't expect it to work this poorly.
I guess this works better on Android, but in my opinion a website should not only work on one platform. So, my conclusion is that a PWA might be a good option if you really have an _app_, where you can use the things that _do work_ on both Android and iOS, but for a regular website I will avoid it.



[1]: https://www.gatsbyjs.org/packages/gatsby-plugin-manifest
[2]: https://www.gatsbyjs.org/packages/gatsby-plugin-offline
[3]: https://developers.google.com/web/tools/lighthouse
[4]: https://medium.com/@firt/whats-new-on-ios-12-2-for-progressive-web-apps-75c348f8e945



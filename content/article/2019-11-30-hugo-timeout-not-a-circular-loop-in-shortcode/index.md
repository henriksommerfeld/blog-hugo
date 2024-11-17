---
title: "Hugo Timeout Not a Circular Loop in Shortcode"
date: 2019-11-30
summary: "I have been getting a few random build errors with Hugo on Netlify recently. This is a bit strange, since it builds fine on my local machine and with Github Actions. Re-running the same build also worked a few times. The build log on Netlify says the following..."
description: Hugo build timeout was not acircular loop in a shortcode, like the error message suggested.
tags: [Hugo]
categories: [Coding]
draft: false
---

> timed out initializing value. This is most likely a circular loop in a shortcode

I have been getting a few random build errors with Hugo on Netlify recently. This is a bit strange, since it builds fine on my local machine and on Github Actions. Re-running the same build also worked a few times. The build log on Netlify says the following:

```
Hugo Static Site Generator v0.59.1-D5DAB232/extended linux/amd64 BuildDate: 2019-10-31T15:28:09Z
Building sites …
Total in 25937 ms
Error: Error building site: "/opt/build/repo/content/article/2016-11-01-my-iot-exploration-part-2-raspberry-pi-sense-hat/index.md:1:1": 
timed out initializing value. This is most likely a circular loop in a shortcode
```

The timeout part is correct, but the guess about a loop in a shortcode is not. I recently added image processing and I'm doing that in a shortcode, so it was pretty clear this problem was related to that. 

The actual problem is that the build with image processing takes longer than 10 seconds, which it the default timeout for a build. Increasing the timeout in my `config.toml` solved the problem:

```
timeout = 60000
```

**_Update_**: I mention that this was caused by [adding image processing][2], but when you do that you should commit the generated images files to source control, according to [Hugo’s documentation for image processing][1]. I hadn't done that, and that's why the builds were suddenly taking a lot longer than before.

[1]: https://gohugo.io/content-management/image-processing/
[2]: /lazy-loading-images-in-hugo/

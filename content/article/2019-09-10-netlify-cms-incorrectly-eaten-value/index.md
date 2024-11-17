---
title: "Netlify CMS - Incorrectly eaten value"
date: 2019-09-10
url: "netlify-cms-incorrectly-eaten-value"
categories: ["Coding"]
tags: [Netlify CMS]
draft: false
---

I'm writing this in case I forget it later.

## Context
I'm migrating my wife's blog from WordPress to GatsbyJS and since she's not comfortable with Markdown or Git, I need a CMS. I aim at a zero-cost solution and I want the content to be part of the repository, rather than a separate thing (like what an API driven CMS provides). 

## Problem

Netlify CMS crashes when the frontmatter is followed by a newline and an image. The CMS itself doesn't add this newline, but Prettier for VS Code does. I've been manually updating a `url` property when migrating old posts to keep the same URL, and doing that in VS Code inserts this "error" (perfectly valid markdown).

```
date: 2011-09-11
---
    <==== Here
![](/uploads/lrvlsi6ilp1r22t2co1_400.jpg "Some title")
```

There is [an issue registered at GitHub][1], but it seems to wait for [some larger _overhaul_ issue][2], so we might have to live with this for some time.

## Workaround

Remove the newline with an editor that doesn't add it back on save.

```
date: 2011-09-11
---
![](/uploads/lrvlsi6ilp1r22t2co1_400.jpg "Some title")
```

[1]: https://github.com/netlify/netlify-cms/issues/2421
[2]: https://github.com/netlify/netlify-cms/issues/2402

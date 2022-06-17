---
title: "Dark Mode Learnings 🌙"
date: 2019-11-15T14:14:10+01:00
url: "dark-mode-learnings"
categories: ["Coding"]
tags: [Dark mode, CSS]
summary: "So, I decided to implement dark mode on my website (to tackle parental leave boredom). I'll describe what I did and what I could have done differently in hindsight."
description: "I decided to implement dark mode on my website. This is what I learned."
ogimage: "jay-wennington-loAgTdeDcIU-unsplash.jpg"
draft: false
---

{{<post-image image="jay-wennington-loAgTdeDcIU-unsplash.jpg" alt="Laptop on bed in dark room with bright white screen">}}
<p>Photo by <a href="https://unsplash.com/@jaywennington?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jay Wennington</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>. </p>
{{</post-image>}}

So, I decided to implement dark mode on my website (to tackle parental leave boredom). I'll describe what I did and what I could have done differently in hindsight in these areas:

* Different CSS files VS `body` selector
* Provide a switch between modes?
* Messing up Sass variables and CSS variables
* Adjust images with filter

## Background

Supporting different themes on a website is very simple, I remember that I built three different themes that you could choose between on my website almost 20 years ago when I was learning about CSS and the semantic web. It's just a matter of switching .css files. Those themes had different layout where the navigation would be placed differently and much more. Dark/light mode is just a matter of changing colours.

Of course the web has evolved a bit since the Web's youth. The basic techniques you need today are:

* [CSS variables][1]
* [Media queries][4]

{{<post-image image="dark-mode.gif" alt="Animated gif of toggling dark mode on my website from Windows dark/light mode">}}
This shows how toggling between light and dark mode in Windows 10 changes the theme on my website as well.
{{</post-image>}}

My starting point was the extensive blog post named [_Hello darkness, my old friend_][2]. It gives a background and describes an implementation that I pretty much followed.

It uses a `light.css` and a `dark.css` which are conditionally loaded with media queries. These files define the same set of [CSS variables][1] that are then used in a `main.css`.

```
<link rel="stylesheet" href="/dark.css" media="(prefers-color-scheme: dark)">
<link rel="stylesheet" href="/light.css" media="(prefers-color-scheme: no-preference), (prefers-color-scheme: light)">
```

This works great and uses the theme of the operating system, here _light_ theme is the default if the browser doesn't provide this information. It's when you add the possibility to manually switch between themes it becomes a bit more complicated.

## Different CSS files VS `body` selector
A slightly different approach is to place the media query inside a `main.css` and include all the CSS variables there. My site is build with Hugo and uses one main CSS file, rather than a component system, so I don't have any deferring of non-critical CSS anyway. Given that, I think a few extra CSS variables wouldn't make difference.

In that case I could set a class or data attribute on the body tag and use that as my condition in CSS.

```
<body class="dark-theme">
```

## Provide a switch between modes?
Do you really need a switch or is it sufficient with the device setting for light/dark? If I hadn't taken the extra steps of adding a switch, it would have been a lot simpler,  and maybe good enough, in hindsight. Given that I have a switch, borrowed from [_Pure CSS Smooth Toggle Swtich Demo_][3], I think it would have been easier to toggle a CSS class or data attribute than modifying the CSS link tags like I do.

## Messing up Sass variables and CSS variables

A stupid mistake I made a couple of times during development was to confuse the syntax of Sass/SCSS variables and CSS variables, especially when using Sass functions such as `lighten`, `darken` and `transparentize`. Since CSS variables aren't checked at compile time, a few Sass variables sneaked into the resulting CSS file.


{{<code css "hl_lines=3">}}
--color: #CBD5E0;
--accent-color: #ED8936;
--color-published: #{darken(var(--color), 10%)}; /* somewhat tricky syntax */
--background-color: #2D3748;
--blockquote-color: var(--accent-color);
--header-text-shadow: rgba(26,32,44,0.5);
{{</code>}}

## Adjust images with filter
A bonus feature I borrowed straight from [_Hello darkness, my old friend_][2] is to mute images a bit. I didn't want to go to the extremes, but I do decrease brightness and saturation somewhat in dark mode.

{{<code css>}}
/* light.scss */
:root {
    --image-filter: none;
}

/* dark.scss */
:root {
    --image-filter: brightness(0.9) saturate(0.9) drop-shadow(0px 0px 2px #{$gray900});
}

/* main.scss */
figure img {
    filter: var(--image-filter);
}
{{</code>}}





[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[2]: https://web.dev/prefers-color-scheme/
[3]: https://www.cssscript.com/demo/pure-css-css3-smooth-toggle-switch/
[4]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries

+++
author = "admin"
categories = ["Coding"]
date = "2016-09-06T19:48:29+00:00"
title = "My Guideline for Creating Easter Eggs"
type = "article"
url = "/my-guideline-for-creating-easter-eggs/"

+++

A way of bringing up motivation when you have been working with the same software system for an extended period of time might be to add an [Easter egg][1]. When you know the system and the people around it well, you have a good opportunity to implement an Easter egg in a good way. These are the things I try to keep in mind when creating an Easter egg.

## 1. Do not break anything

The first and most important rule when creating an Easter egg, is to _not cause a bug_. If your change breaks the shopping basket preventing customers from buying your company's products, you will have a hard time justifying your little joke. Source control will most likely make it obvious what caused the problem, so don't cause a bug. Make sure to test your egg and the surrounding features well.

## 2. Nothing offensive

Think about what will happen if the system owner, your boss or an end user of the system, finds the egg. Can you defend it? If your egg involves insulting the end user or showing something obscene and your company's most important customer finds it by mistake, you might have a problem.

## 3. Performance

Make sure it doesn't have too big of an impact on performance. It's not a good idea to make the user download a heavy image immediately when they visit your site, just because you would like it to appear as an Easter egg at some part of your site.

## 4. Hide it well enough

The egg should only trigger on what you intended. Input boxes are generally good because you can trigger the egg when a certain input is given. Again, test surrounding functionality to make sure the egg doesn't pop up unexpectedly. You should probably also avoid good coding practices if you want to hide it from you colleagues. For example, if you create a nicely separated well named component, it will be found more easily. What would you think if you found this on a page or in your source control system?

{{<code html>}}
<input type="text" name="firstname" easter-egg />
{{</code>}}

## Tip for web Easter eggs

Since I work with a web based system I have a natural interface for adding a hidden function. Thinking of it, I guess it's even easier if you're working on an API, where your consumers will be devs who will just be happy finding an Easter egg. Anyway, I like [CSS Shake][2] – it's lightweight if you only need one of the effects and it's visually amusing.

To get some more inspiration, check out [11 Best easter eggs on the web and in software: hidden secrets and surprises][3].

 [1]: https://en.wikipedia.org/wiki/Easter_egg_(media)#In_computing
 [2]: http://csshake.surge.sh/
 [3]: http://www.pcadvisor.co.uk/feature/social-networks/11-best-easter-eggs-on-web-in-apps-3530683/
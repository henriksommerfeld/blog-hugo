---
title: "Refactoring z-index"
date: 2019-06-09T20:41:10+02:00
url: "refactoring-z-index"
categories: ["Coding"]
tags: [CSS]
summary: "Ever found a z-index of 999 in CSS and wondered if there really are 998 other elements below it? This is a post about how I have refactored CSS z-indexes to become sane."
draft: false
---

{{<post-image image="sabri-tuzcu-182685-unsplash_1500.jpg" alt="Handles for standing subway passengers, from close to far away.">}}
<p>Photo by <a href="https://unsplash.com/photos/6rV9tBFL5SA">Sabri Tuzcu</a> on <a href="https://unsplash.com/">Unsplash</a>. Creating depth with z-index. Mine is most important, so I set it to 999999.</p>
{{</post-image>}}

Ever found a `z-index` of `999` in CSS and wondered if there really are 998 other elements below it? 

> _One time I even stumbled upon a z-index of 2147483647_

One time I even stumbled upon a z-index of 2147483647. I thought that number looked familiar, _"isn't this Int32 max value? 🤔"_ Yes, a google search later my suspicion was confirmed: the highest z-index you can use is the maximum value of a 32 bit integer.

But, even if you _can_ use really high numbers for z-index, why _should_ you? The answer is simple: you shouldn't! High numbers are unnecessary and just makes it harder to see what's higher and lower, the difference between 99999 and 148851 can be hard to spot a glance. So, how can we make something better? 

## My refactoring

The first thing I did in the code base I was working on, was to collect all the indexes in a constants file. We were using [styled components][1], so my example is in javascript, but of course the same thing can be done in [Sass][2].

{{<highlight javascript>}}
export const zIndexes = {
  AlertBox: 10,
  ModalOpacity: 100,
  PresentationContainer: 745,
  HamburgerMenu: 999,
  MenuOpacity: 999,
  Arrows: 9999,
  MenuWrapper: 12500,
  FullScreenButton: 99999,
  ProgressBar: 999999
};
{{</highlight>}}

Note that I ordered them by ascending index. By putting _all_ z-indexes in the same file, we have a great overview of them. The place I copied the values from, are now referencing a constant instead of having the actual value. I think this is also good from a readability standpoint - you don't have to care what the value is when looking at the styles for a component/class.

Next step is to take those numbers down to something simpler. If we have a new element that needs a value between the existing ones, we can just re-assign all of them, no biggie.

{{<highlight javascript>}}
export const zIndexes = {
  AlertBox: 1,
  ModalOpacity: 2,
  PresentationContainer: 3,
  HamburgerMenu: 4,
  MenuOpacity: 4,
  Arrows: 5,
  MenuWrapper: 6,
  FullScreenButton: 7,
  ProgressBar: 8
};
{{</highlight>}}

[1]: https://www.styled-components.com/
[2]: https://sass-lang.com/
---
title: Hugo Pipeline Series – Alpine.js is Great with Hugo
url: /hugo-pipeline-series-alpinejs-is-great-with-hugo
date: 2020-06-29T10:21:00+02:00
description: Alpine.js is geat to use on a Hugo site if you find pure JavaScript too cumbersum, unless you're using Turbolinks.
summary: With any server-side rendered HTML that isn’t produced by a JavaScript framework, JavaScript needs to be added to an already existing HTML document. This is the way it was done when JavaScript was introduced and how it’s done today when using Hugo.
tags: [Alpine.js, Hugo]
categories: [Coding]
ogimage: kaspar-allenbach-G024sNcoYvY-unsplash.jpg
draft: true  
---

{{<post-image image="kaspar-allenbach-G024sNcoYvY-unsplash.jpg" alt="white and gray mountains">}}
Photo by <a href="https://unsplash.com/@kasparallenbach">
Kaspar Allenbach</a>.
{{</post-image>}}

With any server-side rendered HTML that isn't produced by a JavaScript framework, JavaScript needs to be added to an already existing HTML document. This is the way it was done when JavaScript was introduced and how it's done today when using Hugo.

I use JavaScript for the following features on my blog:
* Opening and closing a hamburger menu
* Lazy loading of images
* Lightbox for images and code
* Providing site search
* Easter eggs
* Comments and analytics (but that's not my code)

I started out using [jQuery](https://jquery.com/) when migrating the blog [from WordPress to Hugo](/switching-from-wordpress-to-hugo), which I think was the obvious choice at the time, even considering that jQuery's popularity was falling. Later I migrated from jQuery to pure JavaScript. That was fairly straight forward and the code looked quite similar after the migration, albite a bit lengthier. This worked fine and I didn't need a library at all, so why add one again?

Looking at what the JavaScript I have is doing, we can see where I can benefit from using a library:
* Changing CSS classes on an element, mostly `body`
* Adding event listeners to handle interactions
* Rendering search results

## Using Alpine.js

In all these areas I benefit from using declarative code, it's just less code and easier to read. This is where [Alpine.js](https://github.com/alpinejs/alpine) comes in. Alpine.js has borrowed a lot from [Vue.js](https://vuejs.org/) when it comes to syntax, but can work with an existing DOM. I haven't used Vue.js and that can make you feed a bit excluded when the documentation explains something by saying that _"it works just like in Vue.js"_.  It is however a small API, so I found it easy to get started with.

## An example with keyboard navigation
This is the relevant (simplified) code I use for showing/hiding outline for the element that has focus, based on whether the user is navigating by mouse or keyboard.

``` html
<body x-data="window.blog" :class="{ 'keyboard-navigation' : keyboardNavigation }"
  @mouseup="keyboardNavigation = false" @keydown.tab="keyboardNavigation = true">
…
</body>
```

``` js
window.blog = {
  keyboardNavigation: false
}
```

``` css
body.keyboard-navigation a:focus {
  outline: 2px solid var(--accent-color);
}
```

Doing this with imperative code is simply messier, so this is one example where Alpine.js helps. 

## An example with search results

Another example is the search results I present. This is a situation where I could just add any of the popular JavaScript frameworks, since this part of the page creates the HTML in JavaScript. This is also a situation where pure JavaScript quickly gets messy, like concatenating strings and setting `innerHTML`, especially if you need event listeners on those new elements. 

{{<code html "hl_lines=14 25">}}
<div class="search-results-container">
  <div id="search-output" x-show="search.textInSearchBox">
    <div id="no-results-message" x-show="search.store && search.textInSearchBox && !search.hits.length">
      No matching posts found. You can use wildcards and search only in titles, e.g. <code>title:iot</code>
    </div>
    <div id="index-loading-message" x-show="!search.indexLoadFailed && search.indexLoading && search.textInSearchBox">
      <span class="icon-spinner" aria-hidden="true"></span> Loading search index, please wait...
    </div>
    <div id="index-failed-message" x-show="search.indexLoadFailed && search.textInSearchBox">
      Search index failed to download 😢
    </div>
    <div id="number-of-hits-message" x-text="search.getHitsText()" x-show="search.hits.length"></div>
    <ol class="result-list" x-show="search.hits.length" x-ref="hits">
      <template x-for="hit in search.hits" :key="hit.ref">
        <li>
          <h2><a :href='hit.ref' x-text="search.fromStore(hit).title"></a></h2>
          <div class="entry-meta">
            <time class="published" :datetime="search.fromStore(hit).dateiso">
              <svg class="icon icon-calendar"><use xlink:href="#icon-calendar"></use></svg>
              <span x-text="search.fromStore(hit).dateformatted"></span>
            </time>
          </div>
          <p x-text="search.fromStore(hit).summary"></p>
        </li>
      </template>
    </ol>
  </div>
</div>
{{</code>}}

`search` is the object that contains the functions and properties being referenced in this markup. It's in a separate JavaScript file not inluded here, but hopefully you get the point of the declarative approach instead of doing this in imperative JavaScript.

## What I'm not using

What I found less useful in Alpine.js was animations and `x-ref` when using a .js file. Maybe this is because I came from a world of pure JavaScript and animations in CSS. It seems that the convention when using Alpine.js is to include all JavaScript in `<script>` tags rather than separate .js files. I didn't go that route and found that `document.getElementById()` works just as well as passing x-refs around (they don't seem to work in .js files otherwise). Using a `<script>` tag is probably better as long as the code is as simple as in my keyboard navigation example above, but as it grows, I find it better to use a .js file 🤷‍♂️

Another thing to note is that if you're using [Turbolinks][2] (which gives navigation without full page reloads), [it doesn't seem to work with Alpine.js][1].

[1]: https://github.com/alpinejs/alpine/issues/319
[2]: https://github.com/turbolinks/turbolinks

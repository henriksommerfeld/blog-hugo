---
title: Alpine.js – Benefits and Limitations
url: /alpinejs-benefits-and-limitations/
date: 2020-06-29T06:21:00+02:00
description: For the custom JavaScript code on my Hugo blog I use Alpine.js . I’ll discuss the benefits and the limitations in this post. This post is part 4 in the Hugo Pipeline Series, but the benefits and limitations I discuss are not specific to using Alpine.js together with Hugo.
summary: For the custom JavaScript code on my Hugo blog I use Alpine.js . I’ll discuss the benefits and the limitations in this post. This post is part 4 in the Hugo Pipeline Series, but the benefits and limitations I discuss are not specific to using Alpine.js together with Hugo.
tags: [Alpine.js, JavaScript, Hugo]
categories: [Coding]
ogimage: kaspar-allenbach-G024sNcoYvY-unsplash.jpg
draft: false  
---

This post is part 4 in the [Hugo Pipeline Series](/hugo-pipeline-series-intro/), but the benefits and limitations I discuss are not specific to using [Alpine.js](https://github.com/alpinejs/alpine) together with [Hugo](https://gohugo.io/). 

{{<post-image image="kaspar-allenbach-G024sNcoYvY-unsplash.jpg" alt="white and gray mountains">}}
Photo by <a href="https://unsplash.com/@kasparallenbach">
Kaspar Allenbach</a>.
{{</post-image>}}

For the custom JavaScript code on my [Hugo](https://gohugo.io/) blog (the one you're on right now) I use [Alpine.js](https://github.com/alpinejs/alpine) . I'll discuss the benefits and the limitations in this post. 

## What is Alpine.js and why?
Alpine.js is meant to be used with an existing HTML document (server-side rendered HTML that isn't produced by a JavaScript framework) , just like plain JavaScript or [jQuery](https://jquery.com/). This is the way it was done when JavaScript was introduced and how it's done today when using Hugo.

I use JavaScript for the following features on my blog:
* Opening and closing a hamburger menu
* Lazy loading of images
* Lightbox for images and code
* Providing site search
* Easter eggs
* Comments and analytics (but that's not my code)

I started out using jQuery when migrating the blog [from WordPress to Hugo](/switching-from-wordpress-to-hugo), which I think was the obvious choice at the time. Later I migrated to plain JavaScript. That was fairly straight forward and the code looked quite similar after the migration, although a bit lengthier. This worked fine and I didn't need a library at all, so why add one again?

Looking at what the JavaScript I have is doing, we can see where I can benefit from using a library:
* Changing CSS classes on an element, mostly `body`
* Adding event listeners to handle interactions
* Rendering search results

In all these areas I benefit from using declarative code, it's just less code and easier to read. This is where Alpine.js comes in. Alpine.js has borrowed a lot from [Vue.js](https://vuejs.org/) when it comes to syntax, but work with an existing [DOM][5]. I haven't used Vue.js and that can make you feed a bit excluded when the documentation explains something by saying that _"it works just like in Vue.js"_.  It is however a small API, so I found it easy to get started with.

## An example with keyboard navigation
This is the relevant (simplified) code I use for showing/hiding outline for the element that has focus, based on whether the user is navigating by mouse or keyboard.

### HTML
``` html
<body x-data="window.blog" :class="{ 'keyboard-navigation' : keyboardNavigation }"
  @mouseup="keyboardNavigation = false" @keydown.tab="keyboardNavigation = true">
…
</body>
```
### JavaScript
``` js
window.blog = {
  keyboardNavigation: false
}
```
### CSS
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

`search` is the object that contains the functions and properties being referenced in this mark-up. It's in a separate JavaScript file not included here, but hopefully you get the point of the declarative approach instead of doing this in imperative JavaScript.

## Benefits

Hopefully I've been able to highlight some of the benefits in the examples above, but to conclude:

* Easy to get started with
* Same kind of declarative data binding that we love with other JavaScript frameworks

## Limitations

Now to the interesting stuff, things that Alpine.js _not_ so good for – the stuff you generally don't find in documentation or tutorials.

* You cannot have nested components or have them communicate easily.
* The page (DOM) isn't updated when updates are triggered by non-interactive events.
* Doesn't work with Turbolinks

In the case of my blog, I made the `body` tag the Alpine component, which works just fine as I'm mostly setting different CSS classes on the body tag anyway. For a more complex use, [A guide to Alpine.js component communication][4] describes how you can have sibling components talk to each other and have the DOM react to non-interactive events, [see answer on GitHub][3]. A non-interactive event is when the user hasn't clicked or typed anything, such as when data is fetched (a promise is resolved) and you set that data to a property. 

The theme switcher I have reacts to theme (light/dark) changes in the operating system and also when the theme setting in `localStorage` is changed. The code I have to listen for those events can update a property bound to the Alpine component, but it won't update the DOM. Rather than implementing some involved dispatch mechanism, I prefer to use pure DOM manipulation for these situation, starting with `document.getElementById()` and setting the element's properties.

Another thing to note is that if you're using [Turbolinks][2] (which gives navigation without full page reloads), [it doesn't seem to work with Alpine.js][1].

## Conclusion

Overall, I think the migration from plain JavaScript to Alpine.js was worth it for me. The code is easier to read now and that's what I was aiming for. I just wish I understood the limitations earlier, that would have saved some time.

There are also features of Alpine.js that I don't use, namely animations and `x-ref` when using a .js file. Maybe this is because I came from a world of plain JavaScript and animations in CSS. It seems that the convention when using Alpine.js is to include all JavaScript in `<script>` tags rather than separate .js files. I didn't go that route and found that `document.getElementById()` works just as well as passing x-refs around (they don't seem to work in .js files otherwise). Using a `<script>` tag is probably better as long as the code is as simple as in my keyboard navigation example above, but as it grows, I find it better to use a separate file 🤷‍♂️

[1]: https://github.com/alpinejs/alpine/issues/319
[2]: https://github.com/turbolinks/turbolinks
[3]: https://github.com/alpinejs/alpine/discussions/585
[4]: https://codewithhugo.com/alpinejs-component-communication-event-bus/
[5]: https://en.wikipedia.org/wiki/Document_Object_Model
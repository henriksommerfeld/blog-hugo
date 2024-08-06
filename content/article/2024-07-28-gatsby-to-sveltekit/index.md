---
title: Migrating from Gatsby to Sveltekit
url: /migrating-from-gatsby-to-sveltekit
date: 2024-08-06T00:28:00+02:00
description: I have migrated the family's recipe collection site, a static Gatsby website, to Sveltekit. Here I describe the roadblocks and my conslusions.
summary: During my first parental leave I built a static web site with Gatsby for the family’s recipe collection. It has worked great and cost us nothing to host, but it has also been all the bad things critics say about the npm ecosystem. In hindsight, Gatsby was the wrong horse to bet on.
tags: [GatsbyJS,Sveltekit,Netlify CMS,Sveltia CMS]
categories: [Coding]
ogimage: logos.png
draft: false
---

{{<post-image image="logos.png" alt="Small GatsbyJS logo to the left and a bigger Svelte logo to the right" />}}

During [my first parental leave][1] I built a static web site with [Gatsby][2]
for [the family's recipe collection](https://recept.netlify.app). It has worked
great and cost us nothing to host, but it has also been all the bad things
critics say about the [npm](https://www.npmjs.com) ecosystem. `node_modules`
has been around 1 GB and it doesn't build on anything newer than
[Node.js](https://nodejs.org) 16. Upgrading one dependency requires upgrading a
bunch of others and some of them are not maintained anymore. In hindsight,
Gatsby was the wrong horse to bet on.

## Choosing Sveltekit

For my second parental leave I aimed at rebuilding basically the same site, but
with another framework. I wanted to try out [Svelte][3], so the decision landed
on [Sveltekit][4].

I don't know if Svelte instead of [React][5] really made a big difference. The
important difference is Sveltekit instead of Gatsby (or if I had landed on
[Astro][6], [Hugo][7] or some other alternative). I'll touch on the Sveltekit
characteristics I found relevant for my use-case. To understand my use-case,
here are some main characteristics of the site:

* Fully static
* Recipes stored as Markdown files in the repository 
* Images stored in the repository
* Simple CMS with authentication for my wife to contribute. [Netlify CMS][8]
got replaced with [Sveltia CMS](9)
* Generating multiple versions of images
* In-browser search and tags to find recipes, in addition to listing by
category

## Dev Server vs Static Build

> How can this possibly work during compile time?

A popular idea among Javascript frameworks seems to be that *where* and *when*
code is executed should be "abstracted away". That is, _server_ vs _client_ and
_compile-time_ vs _run-time_. In Sveltekit this has the consequence of assuming
an active server when using `npm run dev`, even though I'm using the
`@sveltejs/adapter-static` and setting `export const prerender = true` in
`layout.ts`. This led to a few occasions where I was happily hacking on and
found myself thinking "how can this possibly work during compile time?" The
answer was that it didn't work, an `npm run build` showed the error that what I
was doing wasn't available for static builds. 

## Images

Images are an important part of the site, used in every listing and
presentation of a recipe. Since an image can be uploaded unprocessed from a
phone through the CMS (that doesn't itself have any image scaling
functionality), I need to generate multiple versions of each image at
build-time. Each Markdown file (recipe) references at least one image, e.g.
`/static/uploads/egg-royale.jpeg`

I thought having to write a full [GraphQL][10] query to reference an image was
cumbersome in Gatsby, but generating images in Sveltekit is somewhat of a mess.
My first mistake was to get confused with image components. First the
[@sveltejs/enhanced-img](https://kit.svelte.dev/docs/images#sveltejs-enhanced-img)
described in the Sveltekit docs has [21 open and 18 closed
issues](https://github.com/sveltejs/kit/issues?q=is%3Aissue+is%3Aopen+enhanced-img)
at the time of writing this. I also tried another component, but that didn't
have any caching, so multiple builds in a row without any change would result
in all images being processed again and again, for every build. 

I then realised that the components are just using
[vite-imagetools](https://github.com/JonasKruckenberg/imagetools) and rendering
some HTML. The latter part I can do myself, so I ended up using
_vite-imagetools_ directly. I find it a bit odd that my images are now
*modules* and that I have to import all images using a [glob
import](https://vitejs.dev/guide/features.html#glob-import) just to pick the
one I'm interested in.

{{<code typescript>}}
const images = import.meta.glob('/src/uploads/*{.webp,.jpg,.jpeg,.png,.heif,.heic}', {
  import: 'default',
  eager: true,
  query: '?w=800;1500&format=webp&as=picture'
})
const image = getImage(images, lqipImages, imagePath)
{{</code>}}

I also have to produce sensible errors when a referenced image isn't found or
can't be converted the way I expect. See [the definition of
`getImage`](https://github.com/henriksommerfeld/food-sveltekit/blob/e49dba92826c6740b299e027286551cdc378db91/src/lib/image.ts#L26)

## Final Words

In hindsight I should probably have picked Astro instead of Sveltekit with the
possibility to keep the React components from Gatsby, but I guess I have to
have something left in the backlog. The explicitness of client vs server in
Astro also appeals more to me than the "magic" that handles where my code is
run in Sveltekit. 

The overall experience of using Sveltekit is nice though and I would absolutely
use it again, especially in a scenario with an active server, like the stuff I
build at work. 

The build times are actually a bit slower when comparing Sveltekit to Gatsby,
but now it builds on Node.js 20.x and installs without `--legacy-peer-deps`,
which is more important. Maybe I should've gone with Hugo...

[1]: /how-i-tackled-parental-leave-boredom-with-code/
[2]: https://www.gatsbyjs.org
[3]: https://svelte.dev/
[4]: https://kit.svelte.dev/
[5]: https://react.dev/
[6]: https://astro.build/
[7]: https://gohugo.io/
[8]: https://www.netlify.com/blog/netlify-cms-to-become-decap-cms/
[9]: https://github.com/sveltia/sveltia-cms
[10]: https://graphql.org/

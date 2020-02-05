---
title: Lazy Loading Images in Hugo
url: /lazy-loading-images-in-hugo
date: 2020-02-05T04:42:21+01:00
summary: When writing another post, I realised that I hadn't documented/described my image lazy loading implementation in Hugo anywhere, so here it comes. The first thing we need are responsive images, not the thing you get when setting the width to 100% in CSS, but different versions of the same image in different resolutions so that the web browser can pick the best one (using srcset).
description: In this post I explain my implementation of lazy loading images on my Hugo website.
tags: [Hugo]
categories: [Coding]
ogimage: drew-coffman-DzIt-fTYv4E-unsplash.jpg
draft: false
---

When writing another post, I realised that I hadn't documented/described my image [lazy loading][4] implementation in [Hugo][3] anywhere, so here it comes.

{{<post-image image="drew-coffman-DzIt-fTYv4E-unsplash.jpg" alt="Person laying in hammock">}}
Photo by <a href="https://unsplash.com/@drewcoffman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Drew Coffman</a>
{{</post-image>}}

The first thing we need are [responsive images][5], not the thing you get when setting the width to 100% in CSS, but different versions of the same image in different resolutions so that the web browser can pick the best one (using `srcset`).

## Changing folder structure

The structure I had before implementing this was all the Markdown files in the same folder with the images in a common `static/images` folder. To use [image processing][1] in Hugo we need to use _[Page Resources][6]_, meaning we have to create a folder for each post where we put both the Markdown file and the images related to that post.

Before:
```
content
 - articles
   - 2019-11-15-dark-mode.md
   - 2019-11-17-netlify-cms.md
``` 

After:
```
content
 - articles
   - 2019-11-15-dark-mode
     - index.md
     - jay-wennington-loAgTdeDcIU-unsplash.jpg
   - 2019-11-17-netlify-cms
     - hero-image.png
     - index.md
     - insert-image.png
``` 

## Writing a shortcode

To be able to reference the images in the Markdown files, we need a _[shortcode][7]_. This is the trickiest part to explain since the code is a bit lengthy. This is because I have the possibility to pass parameters for whether or not to have a border, a custom width, a lightbox and caption. It might also be because my Go template skills are questionable.

I use the shortcode in my `index.md` file to reference the image like this:
{{<highlight go-html-template>}}
{{</*post-image image="hero-image.png" /*/>}}
{{</highlight>}}

What happens in the shortcode implementation below is that I create a blurred version of the image resized to 48px wide (keeping the aspect ratio). This is the image you will see before a better version is fetched. This small image is embedded into the HTML as a Base64 encoded string, so that there is no extra request required to get the initial image.

A few different versions are then generated, but only if the original image is larger than the version I'm trying to generate. I don't want to upscale an image (it will be blurry). The variable `$src_set` is appended with each version and will contain all versions (sizes) when the HTML part begins.


Shortcode `post-image.html`:
{{<highlight go-html-template>}}
{{ $image := (.Page.Resources.GetMatch  (index .Params.image)) }}
{{ $alt := .Get "alt" }}
{{ $width := .Get "width" }}
{{ $borderless := .Get "borderless" }}
{{ $placeholder := ($image.Resize "48x q20") | images.Filter (images.GaussianBlur 6) }}
{{ $src := $image }}
{{ $src_set := ""}}

{{ $src_set = (print $image.RelPermalink " " $image.Width "w") }}
{{ $src := $image }}

{{ if ge $image.Width "500"}}
{{ $x_small := $image.Resize "500x" }}
{{ $src_set = (print $src_set ", "  $x_small.RelPermalink " 500w") }}
{{ end }}

{{ if ge $image.Width "800"}}
{{ $small := $image.Resize "800x" }}
{{ $src_set = (print $src_set ", " $small.RelPermalink " 800w") }}
{{ end }}

{{ if ge $image.Width "1200"}}
{{ $medium := $image.Resize "1200x" }}
{{ $src_set = (print $src_set ", " $medium.RelPermalink " 1200w") }}
{{ end }}

{{ if gt $image.Width "1500"}}
{{ $large := $image.Resize "1500x" }}
{{ $src_set = (print $src_set ", " $large.RelPermalink " 1500w") }}
{{ end }}

{{ $border_class := "image-border" }}
{{ if $borderless}}
{{ $border_class = "" }}
{{ end }}


<noscript>
  <style>
    figure.lazy {
      display: none;
    }
  </style>
  <figure class="{{ $border_class }}">
    {{ if .Get "lightbox" }}
    <a href='{{ $image.RelPermalink }}'>
      {{ end }}
      <img src="{{ $src.RelPermalink }}" {{ if $width }}width="{{$width}}"{{ end }} />
      {{ if .Get "lightbox" }}
    </a>
    {{ end }}
    <figcaption>
      <em>{{ .Inner }}</em>
    </figcaption>
  </figure>
</noscript>

<figure class="{{ $border_class }} lazy">
  {{ if .Get "lightbox" }}
  <a href='{{ $image.RelPermalink }}'>
    {{ end }}
    <img class="lazyload" data-sizes="auto" src="{{ $src.RelPermalink }}" {{ if $width }}width="{{$width}}"{{ end }}
      srcset="data:image/jpeg;base64,{{ $placeholder.Content | base64Encode }}" data-src="{{ $src.RelPermalink }}"
      data-srcset="{{ $src_set }}" width="{{ $image.Width }}" height="{{ $image.Height }}" alt="{{ $alt }}" />
    {{ if .Get "lightbox" }}
  </a>
  {{ end }}
  {{ if .Inner }}
  <figcaption>
    <em>{{ .Inner }}</em>
  </figcaption>
  {{ end }}
</figure>
{{</highlight>}}

## Adding Javascript

There are a few CSS classes set here that acts as a signal to different Javascript features. `lightbox` is such a thing, but the interesting one here is `lazyload`. I use a Javascript library called [lazysizes][2] that is included in my Javascript bundle and I have created the HTML to work with that library.

You might have noticed that the code above looks somewhat duplicated, that's because I have a `noscript` tag for those with Javascript disabled. In that case, a srcset tag is still used to provide the best image, but without the lazy loading.

You might also have noted that there is no "blur up effect" here. That's a conscious decision, since this is a bit simpler to implement and feels faster, in my opinion.

## Performance consideration

In [Hugo's documentation for image processing][1] it's clearly stated that it's recommended to include the generated images in source control. This is to avoid generating the same images over and over again. On a large site with lots of images, this can make a big difference.

[1]: https://gohugo.io/content-management/image-processing/
[2]: https://github.com/aFarkas/lazysizes#readme
[3]: https://gohugo.io
[4]: https://en.wikipedia.org/wiki/Lazy_loading
[5]: https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
[6]: https://gohugo.io/content-management/page-resources/
[7]: https://gohugo.io/content-management/shortcodes/
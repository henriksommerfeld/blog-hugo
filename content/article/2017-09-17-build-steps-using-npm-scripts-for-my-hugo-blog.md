---
title: "Build Steps Using NPM Scripts for My Hugo Blog"
url: "build-steps-using-npm-scripts-for-my-hugo-blog"
date: 2017-09-17T17:15:54+02:00
draft: false
categories: ["Coding"]
tags: ["Hugo","NodeJS"]
---

Quite recently [I migrated this blog from WordPress to Hugo][1]. Since I didn't want to use a theme built by someone else, I had to add things like CSS and JavaScript myself. To be able to work with this locally in an efficient way and to be able to produce a complete build output in a reproducible manner, I had to automate the build steps. With WordPress I used [Gulp][9] for this, but I thought that might not be needed, so I made an attempt to do this using only npm scripts. 

What I needed support for, was the following:

* Modern JavaScript to ES 5 compilation
* Sass to CSS compilation
* Live reload on all assets
* Search indexing
* Bundling and minification

These are the scripts I ended up with. The [full `package.json` can be found here][2].

{{<highlight json>}}
"scripts": {
    "clean": "rm -f static/*.js static/*.css",
    "clean:public": "rm -rf public",
    "js:build": "browserify assets/scripts/main.js --debug -o static/site.js -t [ babelify --presets [ es2015 ] ]",
    "js:build:prod": "browserify assets/scripts/main.js -t [ babelify --presets [ es2015 ] ] | uglifyjs -mc > static/site.js",
    "js:watch": "onchange assets/scripts -- npm run js:build",
    "sass:watch": "onchange \"assets/styles/**/*.sass\" -- npm run sass:build",
    "sass:build": "node-sass assets/styles/main.sass static/site.css && node-sass assets/styles/print.sass static/print.css",
    "sass:build:prod": "node-sass assets/styles/main.sass static/site.css --output-style compressed && node-sass assets/styles/print.sass static/print.css --output-style compressed",
    "build:assets": "npm run clean && npm run sass:build:prod && npm run js:build:prod",
    "hugo:watch": "hugo serve --config config-dev.toml --bind=0.0.0.0",
    "serve": "concurrently --kill-others \"npm run js:watch\" \"npm run sass:watch\" \"npm run hugo:watch\"",
    "index:prod": "node build/index-search.js public/search-index.json",
    "index": "node build/index-search.js static/search-index.json",
    "timestamp": "node build/save-build-timestamp.js",

    "start": "npm run clean && npm run sass:build && npm run js:build && hugo && npm run serve",
    "build": "npm run build:assets && npm run clean:public && hugo && npm run index:prod && npm run timestamp"
}
{{</highlight>}}

## Structure of scripts

To be able to control the order of execution and to avoid having one horribly long line, the tasks are broken down in smaller pieces and then composed accordingly. To run the blog on my local machine I run `npm run start` (yes, the `run` part can be skipped in this case). This simply runs five commands in order, among which four of them are other npm scripts: `clean`, `sass:build`, `js:build` and `serve`.

The other main script is `build`, which is run by my build and hosting service Netlify. More on this later.

## Cleaning

To have a clean start when doing sequential builds, I have two clean scripts. The reason for this is explained below, but the output folder is named `public` in this setup, so that's what needs to get cleaned.

## Building JavaScript

To produce a JavaScript bundle that can run in web browsers, I use [browserify][3] and [babelify][4] to be able to use newer JavaScript syntax. This is done in script `js:build`.

## Building CSS

Compiling Sass to CSS is straight forward and done with [node-sass][5]. The script `sass:build` specifies both output bundles, `site.css` and `print.css`.

## The Hugo stuff

Hugo produces HTML from my content files in Markdown with the associated page templates. Since Hugo is the most performant part of this setup and includes a great web server, I use that to run the site locally. Looking at the script `hugo:watch` you can see that I also have a different config file for Hugo when running locally. This is to disable Google Analytics and Disqus, which is pointless when running locally.

## Search indexing

The technique I use to provide search might be worthy a separate post, but in essence it's a separate Hugo template that outputs all blog posts into one file, `data-to-index.json`. That file is then indexed using [Lunr][6] through a script I wrote myself, [`index-search.js`][7]. To be able to have search locally, I have a separate `clean` script that does _not_ remove the entire public folder, since that would get me into a catch 22 situation. So to work with the "front-end" part of search, I run `hugo && npm run index && npm run start`. That way the index is produced once and I can still have live reload on everything else. The `timestamp` script simply adds a timestamp to the index file name to avoid caching issues.

## Live reload

One of the best things in recent years for web development in my opinion, is live reload. To be able to save a file and very quickly see the changes reflected without any additional action, makes it so much easier to stay focused on what you're doing. Here I use `onchange` to listen to changes in the source files. The script `js:watch` watches the js files and simply calls the `js:build` script when a change is detected.

## Producing a complete build to deploy

The only thing special to the scripts with a `:prod` suffix, is that they add minification to the bundles. By running `npm run build` I get a `public` folder ready to be deployed.


[1]: /switching-from-wordpress-to-hugo
[2]: https://github.com/henriksommerfeld/blog-hugo/blob/master/package.json
[3]: https://www.npmjs.com/package/browserify
[4]: https://www.npmjs.com/package/babelify
[5]: https://www.npmjs.com/package/node-sass
[6]: https://lunrjs.com/
[7]: https://github.com/henriksommerfeld/blog-hugo/blob/master/build/index-search.js
[8]: https://www.npmjs.com/package/onchange
[9]: https://gulpjs.com/


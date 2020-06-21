---
title: Hugo Pipeline Series – Developing and Deploying
url: /hugo-pipeline-series-developing-and-deploying
date: 2020-06-22T00:21:00+02:00
description: My pipeline for development is Create feature branch -> Code feature -> Create PR -> Tests are green -> Merge to master -> Deploy to live site.
summary: In terms of developing my Hugo site, I'll focus on the JavaScript parts, since Hugo templates and CSS isn't much to talk about. I use a few libraries that I've installed with npm and those need to be process before they are sent to the browser. The JavaScript code I have written myself, does not have that requirement. In that case it's just a matter of how old browsers I want to support. 
tags: [Hugo]
categories: [Coding]
ogimage: gh-pr.png
draft: true  
---

This post is part 3 in the [Hugo Pipeline Series](/hugo-pipeline-series-intro/).

{{<post-image image="gh-pr.png" lightbox="true" alt="Pull request workflow using GitHub's CLI" />}}

In terms of making code changes to my Hugo site, I'll focus on the JavaScript parts, since Hugo templates and CSS isn't much to talk about. I use a few libraries that I've installed with [npm][3] and those need to be process before they are sent to the browser. The JavaScript code I have written myself, does not have that requirement. In that case it's just a matter of how old browsers I want to support. 

So, by splitting libraries (installed through npm) from my own code, I'm able to rely solely on Hugo's file watcher with live reload. For development (using `hugo server`), the libraries are built once, and the file with custom code is served to the browser as is. I use [Browserify](http://browserify.org/) for the libraries and that's good enough for my needs. If you need something more powerful, you might consider [Victor Hugo](https://github.com/netlify-templates/victor-hugo) that comes with [Webpack](https://webpack.js.org/) preconfigured. I could also have referenced the libraries directly from a public [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), but that would make it harder to see when there's a new version of a library and more importantly – my site wouldn't work on localhost without an Internet connection.

{{<code go-html-template>}}
{{ if .Site.Params.MinifyBundles }}
  {{ $opts := (dict "minified" true "compact" true "noComments" true) }}
  {{ $main := resources.Get "main.js" | babel $opts }}
  {{ $libs := resources.Get "libraries.js" }}
  {{ $bundle := slice $libs $main | resources.Concat "bundle.js" | resources.Fingerprint "sha512" }}
  <script src="{{ $bundle.RelPermalink }}" integrity="{{ $bundle.Data.Integrity }}"></script>
{{ else }}
  {{ $libs := resources.Get "libraries.js" | resources.Fingerprint "sha512" }}
  <script src="{{ $libs.RelPermalink }}" integrity="{{ $libs.Data.Integrity }}"></script>
  {{ $mainDev := resources.Get "main.js" | resources.Fingerprint "sha512" }}
  <script src="{{ $mainDev.RelPermalink }}" integrity="{{ $mainDev.Data.Integrity }}"></script>
{{ end }}
{{</code>}}

For the "production build", I just minify the code and concatenate the libraries with my custom code into a single file. I use [Babel](https://babeljs.io/) from within the Hugo template ([available since Hugo 0.70][4]) which removes the need for yet another npm script.

When doing code changes I always create a new branch in Git. As I described in the previous post, anything pushed to master is automatically built and deployed (if build is successful) to the live site without any tests. By creating a pull request and using [GitHub Actions][1], I can feel confident that I haven't broken anything when the checks are green. 

These are the steps:
{{<post-svg image="dev-deploy-pipeline-drawing.svg" width="500" use-theme="true" />}}

When I create a pull request, either through GitHub's web interface or preferably by using their CLI (`gh pr create`), two things happen. (1) Netlify deploys a preview of the site (canary release) and (2) GitHub Actions runs my [Cypress](cypress.io/) tests against that deployed site.

Running the tests against a deployed site (as opposed to a dev server on localhost) transform the tests from function tests to end-to-end tests. Before I had this setup I once broke the _comments_ feature (using [Disqus](https://disqus.com/)) by fiddling with [Content Security Policy][2] headers, something I would have caught today when running the tests against a deployed site.

Since both building + deploying a site and installing Cypress to run the tests take some time, it's great that it can run in parallel. The `yarn install` run in GitHub Actions is typically done before the canary release is deployed by Netlify, so I use an action that waits for a 200 response from Netlify and then run the tests. Super happy with this setup!

### master-pull-request.yml
{{<code yml>}}
name: Tests

on:
  pull_request:
    branches:
      - master

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Install
        run: |
          yarn install
      - name: Waiting for 200 from the Netlify Preview
        uses: jakepartusch/wait-for-netlify-action@v1.1
        id: waitFor200
        with:
          site_name: "henriksommerfeld"
          max_timeout: 300
      - name: Integration tests
        run: |
          CYPRESS_BASE_URL=${{ steps.waitFor200.outputs.url }} npm run cypress:cli     
      
      - name: Run Lighthouse
        uses: foo-software/lighthouse-check-action@master
        id: lighthouseCheck
        with:
          accessToken: ${{ secrets.LIGHTHOUSE_CHECK_GITHUB_ACCESS_TOKEN }}
          author: ${{ github.actor }}          
          branch: ${{ github.ref }}
          urls: ${{ steps.waitFor200.outputs.url }}
          sha: ${{ github.sha }}
          prCommentEnabled: true
          slackWebhookUrl: ${{ secrets.LIGHTHOUSE_CHECK_WEBHOOK_URL }}
{{</code>}}

As you can see from my workflow file above, I get a notification in [Slack][5] (I have a personal workspace) when the canary release is deployed and when a [Lighthouse](https://developers.google.com/web/tools/lighthouse) audit is completed (after the Cypress tests). If I've made changes to the look and feel (like a CSS change), I naturally take a look at the deployed canary release, but if not, I'll just go ahead and merge (which triggers a deploy to the live site).

One thing to say about the Lighthouse audits is that they are of questionable value for the canary releases. The performance score is always lower on the first page load, so you need to load at least two pages to get a fair result. Secondly, the SEO score won't say much since the canary release is purpously blocked from indexing and has a different URL than the canonical URL set for the site. For this reason, I run a Lighthouse audit on the live site as well. In this case I can't wait for a 200 response, so I'll just wait a bit longer than a deploy normally takes and run the audit after that.

### master-push.yml
{{<code yml>}}
name: Tests

on:
  push:
    branches:
      - master

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - name: Wait 2 min for Netlify Deploy to complete
        uses: jakejarvis/wait-action@master
        with:
          time: '2m'

      - name: Hit once
        uses: wei/curl@master
        with:
          args: https://www.henriksommerfeld.se

      - name: Run Lighthouse
        uses: foo-software/lighthouse-check-action@master
        id: lighthouseCheck
        with:
          accessToken: ${{ secrets.LIGHTHOUSE_CHECK_GITHUB_ACCESS_TOKEN }}
          author: ${{ github.actor }}          
          branch: ${{ github.ref }}
          urls: 'https://www.henriksommerfeld.se/about,https://www.henriksommerfeld.se'
          sha: ${{ github.sha }}
          prCommentEnabled: true
          slackWebhookUrl: ${{ secrets.LIGHTHOUSE_CHECK_WEBHOOK_URL }}

{{</code>}}

The Slack notifications from a "production deploy" looks something like this:

{{<post-image image="slack-notifications.png" lightbox="true" alt="Deploy notification in Slack" />}}

[1]: https://github.com/features/actions
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
[3]: https://www.npmjs.com/
[4]: https://gohugo.io/hugo-pipes/babel/
[5]: https://slack.com
---
title: Hugo Pipeline Series – Editing and Deploying
url: /hugo-pipeline-series-editing-and-deploying
date: 2020-06-14T22:12:00+02:00
description: This is how I write and deploy content on this blog, the technical process, not the creative one.
summary: This is how I write and deploy content on this blog. I'll describe how I work with images and JavaScript dependencies to keep building and deploying as quick as possible.
tags: [Hugo, VS Code, JavaScript]
categories: [Coding]
ogimage: retrosupply-jLwVAUtLOAQ-unsplash.jpg
draft: false  
---

This post is part 2 in the [Hugo Pipeline Series](/hugo-pipeline-series-intro/).

{{<post-image image="retrosupply-jLwVAUtLOAQ-unsplash.jpg" alt="vintage teal typewriter beside book">}}
Photo by <a href="https://unsplash.com/@retrosupply">
RetroSupply</a>.
{{</post-image>}}

In the first post in this series I said that I don't use a proper Content Management System (CMS). To manage my content I use a code editor ([VS Code](https://code.visualstudio.com/)) and [Git](https://en.wikipedia.org/wiki/Git) ([GitHub](https://github.com/)). The advantage of having my content in text files in the same repository as the code is huge. No database to backup or sync between environments.

See [Scott Hanselman looking at all his blog posts][3] from 2005 and onwards. It's all XML files, which might not be trendy today, but is still human readable and easily convertible to another text format. I use [Markdown](https://en.wikipedia.org/wiki/Markdown) now, but the important thing is that it's text files that can be converted if I need to. I have already changed the code highlighting once, which was an easy search-and-replace operation. When I did the same in [WordPress](https://wordpress.org/) some years ago, it was…harder.

## Different workflows for content and code changes

Since correcting a simple spelling mistake using a static site generator requires a new build, it's beneficial to reduce the amount of stuff that needs to happen between a push and a deploy. Therefore I have split content changes and code changes (see next post) into two different workflows.

### Reduce the stuff to build

I have some npm packages and have split `dependencies` from `devDependencies` to reduce the amount of packages that need to be installed for a content change. Installing dependencies with `yarn install --production` installs 44 MB of _node_modules_, while `yarn install` installs 110 MB of _node_modules_.

My netlify.toml file:
``` toml
[build.environment]
  HUGO_VERSION = "0.72.0"
  YARN_VERSION = "1.22.4"
  YARN_FLAGS = "--production"
  NODE_ENV = "production"
```

My content deployment workflow consists of pushing directly to the master branch. That triggers a web hook that does a build and deploy by [Netlify](https://www.netlify.com/). This requires the discipline not to push code changes directly to the master branch, but since I'm the only developer, that's a policy easy to enforce.

{{<post-image image="hugo-deploy-pipeline.png" alt="Deploy pipeline with VS Code, GitHub and Netlify" />}}


### Images

The biggest speed difference, both in building on my own laptop and in deploying, is how images are handled. This is strikingly obvious when I compare to the two [Gatsby](https://www.gatsbyjs.com/) sites I have. When writing or editing a blog post, I have the [Hugo development server][4] running. When I add a new image, Hugo creates the different versions (sizes) of the image that my templates specify – once. Then I commit the Markdown file and the images (original and generated) to Git. That's it, the image processing for that specific image is done, it won't ever have to be processed again unless I want to. No CPU cycles are spent on any server to generate images and that saves time in deployment.  It also saves time against the free build minutes quota I have, currently 300 minutes per month on Netlify. 

The local dev server never have to re-generate images it has already processed, so it starts quicker as well. Just as a test when I created a new shortcode with new image sizes, I ran Hugo with the option to re-generate everything from scratch (Markdown, SCSS and images), `hugo --ignoreCache`:

```
                   | EN   
-------------------+------
  Pages            | 197  
  Paginator pages  |  42  
  Non-page files   |  97  
  Static files     |  27  
  Processed images | 459  
  Aliases          |  63  
  Sitemaps         |   1  
  Cleaned          |   0 

Total in 39741 ms
```

All of the 8 cores on my laptop where working here and it took 40 seconds. This is something I won't most likely ever have to do again, so 40 _minutes_ would have been fine in this extreme situation as well.

## Total build & deploy time

As I mentioned, I use Netlify to both build and deploy. That process [takes about 2 minutes][1], which regardless of everything else, is better than [the 25 minutes Wes Bos is experiencing][2].



[1]: https://app.netlify.com/sites/henriksommerfeld/deploys/5edd46691261090008d5a8b5
[2]: https://wesbos.com/new-wesbos-website/#Pain-Points
[3]: http://www.youtube.com/watch?v=7_sXnMevPH4&t=5m25s 
[4]: https://gohugo.io/commands/hugo_server/



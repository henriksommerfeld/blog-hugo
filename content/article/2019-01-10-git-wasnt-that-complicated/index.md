---
title: "Git wasn't that Complicated"
date: 2019-01-10T19:52:58+01:00
url: "git-wasnt-that-complicated"
categories: ["Thoughts"]
tags: []
summary: "When I was about to quit my previous job for the job I have now, I mentioned a few things that I anticipated I would have to learn at the new job. One of the most obvious things was Git...."
draft: false
---
{{<post-image image="tomas-malik-1185809-unsplash_1500.jpg" alt="Stopped car on Icelandic road from above">}}
<p>Photo by <a href="https://unsplash.com/photos/KFIjzXYg1RM">Tomáš Malík</a> on <a href="https://unsplash.com/">Unsplash</a>. My modern development journey, pausing to reflect on Git.</p>
{{</post-image>}}

When I was about to quit my previous job for the job I have now, [I mentioned a few things that I anticipated I would have to learn at the new job][1]. One of the most obvious things was Git. 

At my previous job we used [TFVC][2] and even though I had used Git for personal stuff, like this blog ([see source][3]), I hadn't learned branching or how to use the Git CLI. If you've only used Git, TFVC is managed from within Visual Studio with Microsoft's traditional GUI-first approach. 


Judging from the number of articles I had seen about Git, like heated discussions about whether or not you should use rebasing, Gitflow, configuring command line aliases etc, I got the impression that there was quite a bit I had to learn to get productive. Just skim this article named _[Useful git commands for **everyday** use!][5]_

My conclusion so far is that I haven't been forced to learn that much at all about Git. Sure there are advanced possibilities if you need them, but we don't. We use feature branching with pull requests within the team and between teams when we have to make changes to code that another team owns. 

A combination of CLI and GUI works best for me, but I haven't yet needed anything more than what VS Code provides me with in terms of GUI. What I _do_ find useful is a "Git aware" command line. Since I work in several different repositories on a daily basis and we use feature branching, I like the ability to see which branch I'm on and if I'm up to date.

{{<post-image image="ConEmu-Git-update-post.png" alt="ConEmu with Git info" borderless="true" />}}

To get this decent console experience on Windows I've used [oh-my-posh][4].


[1]: /getting-a-divorce-from-sharepoint
[2]: https://stackoverflow.com/questions/31889079/what-exactly-is-tfvc-team-foundation-version-control
[3]: https://github.com/henriksommerfeld/blog-hugo
[4]: https://github.com/JanDeDobbeleer/oh-my-posh
[5]: https://dev.to/onmyway133/useful-git-commands-for-everyday-use-552p
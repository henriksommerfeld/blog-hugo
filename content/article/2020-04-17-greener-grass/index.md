---
title: The Grass is Greener on the Other Side
url: /the-grass-is-greener-on-the-other-side
date: 2020-05-03
summary: Approaching 40 years old and two years since I changed direction as a software developer, I conclude that the grass really is greener on the other side. Perhaps I should have jumped earlier. Git hooks are better than deployment weekends!
description: Approaching 40 years old and two years since I changed direction as a software developer, I conclude that the grass really is greener on the other side. Perhaps I should have jumped earlier. Git hooks are better than deployment weekends!
tags: [Career]
categories: [Thoughts]
ogimage: green-grass_16-9.jpg
draft: false
---

{{<post-image image="green-grass_16-9.jpg" alt="Green field from above">}}
Photo by <a href="https://unsplash.com/@yanchev?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
Dimitar Yanchev</a> (my cropping).
{{</post-image>}}

Approaching 40 years old and two years since I changed direction as a software developer, I conclude that the grass really _is_ greener on the other side. Perhaps I should have jumped earlier.

## Where I'm coming from

Most of my career I've been a consultant working with [.Net][3] development and specialised in [SharePoint][4] (described in [_Getting a Divorce From SharePoint_][5]). When I read [The Phoenix Project][2] I strongly identified with the pre-transformation description and the different characters described in that book. At one time, me and a colleague had a great laugh comparing our work situation to the film [The Martian][1] (where the main character is stuck alone on Mars, click the link and see the trailer to get a feeling for what I mean). Our job felt just as complex and challenging – and we were only maintaining a bloody website! To be fair, it was a website selling products for a couple of hundred million EUR annually, but still.

Not all problems should be solved, some should be avoided. When things are complicated due to accidental technical debt rather than complex due to supporting a complex world, walk away. 

Another aspect of your career is how much you learn over time. Do I have x years of experience or 1 year of experience x times?

Sample tech:
* [Visual Studio [year] (Not responding)™][20]
* .Net Framework 4.x
* Team Foundation Server (using [TFVC][30])
* SharePoint Server
* MS SQL Server
* Windows Server
* Virtual machines weighing 100+ GB
* [Lenovo P50][6]
* README for monthly "deploy weekend"



## Where I'm now

Now I'm in _Ops_, part of a team named _Tooling_ that provides the infrastructure and tools for other development teams to run their applications on. I'm the least experienced in the team when it comes to infrastructure and the tools we use, so I learn a ton of new stuff all the time. Having taken a web interface for granted for almost all of my career, the primary user interface our team is building right now is a [CLI][24].

As a developer in our organisation, you create a new service (API, web app, etc.) by using our CLI. It will ask you a few questions: name and description for the service, what team owns it, select the upstream services it depends on etc. That takes care of all the boring stuff you _need_, but don't want to deal with as an application developer, like logging, monitoring, TLS certificates etc.

Naturally, the idea of _infrastructure as code_ isn't something you have to _sell_ to someone like me with a coding background, but seeing it in action is still fantastic. Even if this isn't feasible for a small company, we're certainly not as big as Google, Amazon, Microsoft or Facebook.

I find it delightful to primarily work with open source products. We buy commercial software when we find that's the best option, but we don't buy a product that claims it does everything. There is a big difference in choosing the pieces that best fits the puzzle you're trying to assemble, vs buying a complete puzzle that you have to retrofit your existing pieces into.

Sample tech:
* [Visual Studio Code][19] (still avoid [Vim][18])
* JavaScript/TypeScript
* [Go][28]
* [Node JS][13] with [koa][14] or [Apollo Server][15]
* [Docker][10], [Terraform][27], [Nomad][11], [Consul][12], [Jenkins][9], [Neo4j][16], [Grafana][8], [Graylog][7], [Prometheus][29]...
* [Mob][21] station with large TV and [Ubuntu Linux][23] [NUC][22] + personal [MacBook Pro][17]

## Next actions

I will keep evaluating my learning and how fun I think my job is. In hindsight I should probably have made a change earlier, but I wasn't unhappy before either and I guess that's the tricky part when it isn't as clear as black and white. 

I hope I have contributed to better ways of working earlier in my career as well, but some things are hard to change within a specific role or organisation. Some people prefer stability and familiarity, but "git hooks" _are_ better than "deployment weekends"!

Read (or listen to the audio books) [The Phoenix Project][2] and [The Unicorn Project][25] and listen to [Rich Hickey's talk _Simple Made Easy_][26] if you haven't, that's my next actions for you 😉

[1]: https://www.imdb.com/title/tt3659388/
[2]: https://itrevolution.com/book/the-phoenix-project/
[3]: https://dot.net
[4]: https://www.microsoft.com/en-gb/microsoft-365/sharepoint/collaboration
[5]: /getting-a-divorce-from-sharepoint/
[6]: https://www.lenovo.com/us/en/laptops/thinkpad/thinkpad-p/ThinkPad-P50/p/22TP2WPWP50
[7]: https://www.graylog.org/
[8]: https://grafana.com/
[9]: https://www.jenkins.io/
[10]: https://www.docker.com/
[11]: https://www.nomadproject.io
[12]: https://www.consul.io/
[13]: https://nodejs.org/en/
[14]: https://koajs.com/
[15]: https://www.apollographql.com/
[16]: https://neo4j.com/
[17]: /settings-for-new-macbook-pro/
[18]: https://www.vim.org/
[19]: https://code.visualstudio.com/
[20]: https://visualstudio.microsoft.com/vs/
[21]: https://mobprogramming.org/
[22]: https://en.wikipedia.org/wiki/Next_Unit_of_Computing
[23]: https://ubuntu.com/
[24]: https://www.w3schools.com/whatis/whatis_cli.asp
[25]: https://itrevolution.com/book/the-unicorn-project/
[26]: https://www.infoq.com/presentations/Simple-Made-Easy/
[27]: https://www.terraform.io/
[28]: https://golang.org/
[29]: https://prometheus.io/docs/introduction/overview/
[30]: https://medium.com/@thomaz.moura/tfs-version-control-is-dead-6d475e247389

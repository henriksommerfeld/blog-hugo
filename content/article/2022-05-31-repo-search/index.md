---
title: Find GitHub Repositories Locally
url: /find-github-repositories-locally
date: 2022-06-03T21:15:00+02:00
description: "I recently glued together some CLI tools to be able to clone and open the web page of the GitHub repositories  have access to."
summary: "I recently glued together some CLI tools to be able to clone and open the web page of the GitHub repositories  have access to."
tags: [zx, javascript, bash]
categories: [Coding]
ogimage: search-ogimage.jpg
draft: false
---

I recently glued together some CLI tools to be able to clone and open the web page of the GitHub repositories  have access to.

## TL;DR

The repo is here: [Search repository][1]

## Problem

I've used some extension to [Alfred][2] from time to time to search for repositories I have access to on GitHub, but always been bothered by the slowness. It seems to load a list of all my repositories before every search, which I find quite unnecessary. I do search for repos on GitHub quite often, since we use it at work in addition to my small personal usage.

## Solution

The basic idea is to fetch a list of all the repositories, with some additional metadata, with one explicit command into a json file and then use a separate command to perform search against that file.

### Fetch repos

To fetch all repositories I have access to, I use [GitHubs's API (list-repositories-for-a-user)][3]. Since I already had their CLI installed, I use that to avoid having to deal with authentication myself.

Repos can be fetch 100 a time, so I need to loop until there are no more returned. I use [🐚 zx][4] as the main glue and dump it all into a single file.

{{<post-image image="refresh-index.gif" alt="Refresh index of repositories">}}
I update my local cache whenever I can't find a repo I know exists or just occasionally
{{</post-image>}}

### Search local cache

Searching the local file is fast and although the fzf preview can be made nicer, it works fine for me. I've added the two actions I typically need, (1) opening the repo's web page and (2) cloning it.

{{<post-image image="search.gif" alt="Search repos locally">}}
Searching repos against local file using fzf
{{</post-image>}}

Again, the repo is here: [Search repo][1]

[1]: https://github.com/henriksommerfeld/search-repo.git
[2]: https://www.alfredapp.com/
[3]: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
[4]: https://github.com/google/zx

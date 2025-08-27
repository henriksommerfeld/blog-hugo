---
title: 'GitHub CLI Auth Confusion Using GITHUB_TOKEN'
url: '/github-cli-auth-confusion-using-github-token'
date: 2025-08-27
draft: false
description: "GitHub's CLI prefers GITHUB_TOKEN if set. This can cause confusing behaviour when the same command produce different results depending on the context in which it's running."
summary: "GitHub's CLI prefers GITHUB_TOKEN if set. This can cause confusing behaviour when the same command produce different results depending on the context in which it's running." 
tags: [github, scripting, zx]
categories: [coding]
---

I'm (still) using GitHub both personally and professionally through my
employer. At work we have a couple of private NPM packages hosted by GitHub's
registry at https://npm.pkg.github.com. Since only "classic" Personal Access
Tokens (PAT) are supported for authorising against this registry, I have a
separate PAT for this limited to the `read:packages` scope.

A few repos have a `.npmrc` file containing
`//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}` requiring me to set
`GITHUB_TOKEN` to the mentioned PAT, at least before `npm install`.

I also use GitHub's CLI, i.e. in [my Zx script for finding, opening and cloning
repositories][1] I have access to. 

## Huh?

Now to the confusing part. I noticed that running `gh api '/user/repos'` in my
regular shell gave me all the repos I have access to, including the ones of
organisations I'm a member of. In a Zx script however, the same command would
only give me my personal repos.

## Aha!
Then I remembered that I applied a workaround to prevent the `gh` CLI to use
`GITHUB_TOKEN`. Apparently I even commented it:

```zsh
# unset GITHUB_TOKEN from gh's process environment and run gh command.
# see https://stackoverflow.com/a/41749660 & https://github.com/cli/cli/issues/3799 for more.
# GITHUB_TOKEN is only used for NPM auth
alias gh="env -u GITHUB_TOKEN gh $1"
```

That's why I get more repos when running in a regular shell than in a script
running in a different shell (without this alias). The best way to fix this is
of course to duplicate the workaround!

```javascript
#!/usr/bin/env zx
process.env.GITHUB_TOKEN = ''
...
const reposInPage = await $`gh api '/user/repos?per_page=100&page=${i}'`
  .pipe($`jq .`).then(JSON.parse)
...
```

After all, I did coin the term [Workaround-Driven Development][2] back in 2018 (although I'm sure many others did before me)

[1]: /find-github-repositories-locally/
[2]: /getting-a-divorce-from-sharepoint#workaround-driven-development-wdd

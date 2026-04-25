---
title: 'How I Upgrade Lazyvim'
url: '/how-i-upgrade-lazyvim'
date: 2026-04-25
draft: false
description: "I use Lazyvim because it provides a set of plugins
that work well together and it's easy to customise. Everything I customise is
doomed to break when upgrading though, so here's what I do to avoid that when I
eventually find the need to upgrade."
summary: "I use Lazyvim because it provides a set of plugins
that work well together and it's easy to customise. Everything I customise is
doomed to break when upgrading though, so here's what I do to avoid that when I
eventually find the need to upgrade."
tags: [lazyvim,neovim]
categories: [Tools]
---

I use [Lazyvim](https://www.lazyvim.org/) because it provides a set of plugins
that work well together and it's easy to customise. Everything I customise is
doomed to break when upgrading though, so here's what I do to avoid that when I
eventually find the need to upgrade.

## Steps
1. Clone the repo like described in [Lazyvim's installation
instructions](https://www.lazyvim.org/installation) to a new config, let's say
`~/.config/lazyvim2`. I'll add it to my dotfiles.
    - `git clone https://github.com/LazyVim/starter ~/dotfiles/lazyvim2`
2. Remove the git folder
    - `rm -rf ~/dotfiles/lazyvim2/.git`
3. Create a symlink from `~/dotfiles/lazyvim2` to `~/.config/lazyvim2`
4. Update my alias for Lazyvim in my `.zshrc`

``` sh
export NVIM_APPNAME=lazyvim2
alias lv="NVIM_APPNAME=lazyvim2 nvim"
alias lv_old="NVIM_APPNAME=lazyvim1 nvim"
alias nvim-plain="NVIM_APPNAME= nvim"
```

This makes it possible to choose between my new and old config until I'm sure I've transferred the customisations I want. That `NVIM_APPNAME` env to support multiple configs really is great!


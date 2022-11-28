---
title: Remove Fading and Transparency in i3
url: /remove-fading-and-transparency-in-i3wm
date: 2022-11-28T20:15:00+01:00
description: ""
summary: ""
tags: [i3]
categories: [Tooling]
ogimage: i3wm-logo-portada.png
draft: false
---

Today when I booted my [Endeavour OS][1] Linux machine and logged in to [i3][2], I noted that there was a very annoying fade when switching between workspaces and also semi-transparency on inactive windows. I recently upgraded all packages with `yay`, but haven't touched any config in a while, so I was confused. 

{{<post-image image="i3wm-logo-portada.png" alt="i3 logo" />}}

It turned out to be the settings in `/etc/xdg/picom.conf` that I needed to change.


[1]: https://endeavouros.com
[2]: https://i3wm.org

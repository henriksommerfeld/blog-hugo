---
title: Remove Fading and Transparency in i3
url: /remove-fading-and-transparency-in-i3wm
date: 2022-11-28
description: ""
summary: ""
tags: [i3]
categories: [Tools]
ogimage: i3wm-logo-portada.png
draft: false
---

Today when I booted my [Endeavour OS][1] Linux machine and logged in to [i3][2], I noted that there was a very annoying fade when switching between workspaces and also semi-transparency on inactive windows. I recently upgraded all packages with `yay`, but haven't touched any config in a while, so I was confused. 

{{<post-image image="i3wm-logo-portada.png" alt="i3 logo" />}}

It turned out to be the settings in `/etc/xdg/picom.conf` that I needed to change by copying it to the home folder and disable fading.
 
**Update:** [I3wm started picom automatic also it is commented?][3] describes this problem. However, I didn't really see how to completely disable it using the config file (the way it was before the update), so I instead removed the package (`yay -R picom`)


[1]: https://endeavouros.com
[2]: https://i3wm.org
[3]: https://forum.endeavouros.com/t/i3wm-started-picom-automatic-also-it-is-commented/34073

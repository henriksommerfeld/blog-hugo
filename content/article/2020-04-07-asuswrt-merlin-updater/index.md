---
title: Asuswrt-Merlin Firmware Update Checker
url: /asuswrt-merlin-firmware-update-checker
date: 2020-04-06T06:22:21+01:00
summary: 
description: 
tags: [Networking, Scripting]
categories: [Tooling]
ogimage: 
draft: false
---

I have an Asus RT-AC-68U router at home. [I've previously used the build-in update checker together with a notification script][3] that ran on the router itself. Recently I noticed that I hadn't got any update notifications in a long time, one of downsides of silent failures. 

When I ran a manual check using the router's web interface, it just said: _"Temporarily unable to get the latest firmware information. Please try again later."_ It doesn't seem to be that temporary though.

## Building my own update checker

Since [the project website of Asuswrt-Merlin][4] presents the latest version in an easily parsable way, I decided to write my own checker using _[screen scraping][5]_.



## Scheduling the update checker
`crontab -e`

```
10 18 * * 3 /home/pi/router-update-check.sh >> /home/pi/router-update-check.log
```

[1]: https://crontab.guru/
[2]: https://github.com/henriksommerfeld/asuswrt-merlin-update-check
[3]: /firmware-update-notifications-for-my-asus-router
[4]: https://www.asuswrt-merlin.net/
[5]: https://en.wikipedia.org/wiki/Web_scraping
[6]: https://askubuntu.com/questions/23009/why-crontab-scripts-are-not-working
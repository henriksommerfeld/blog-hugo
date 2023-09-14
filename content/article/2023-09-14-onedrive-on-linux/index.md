---
title: OneDrive on Linux
url: /onedrive-on-linux
date: 2023-09-14T19:13:00+02:00
description: How to use Microsoft OneDrive on Linux through CLI
summary: When switching from MacOS to Linux, one of the things I was concerned about was Microsoft OneDrive that I've used for a decade or so. I found the using an unofficial CLI works really well.
tags: [onedrive]
categories: [Tooling]
ogimage: onedrive-logo.png
draft: false
---

When switching from MacOS to Linux, one of the things I was concerned about was [Microsoft OneDrive][2] that I've used for a decade or so. My wife and I have shared folders, so switching to another service would be a bit of a hassle. 

I also found that the web interface at onedrive.live.com is intermittently broken when my ad blocking lists contain [certain URL's](https://learn.microsoft.com/en-us/sharepoint/required-urls-and-ports) 

To my surprise I found that the unofficial [OneDrive Client for Linux][1] works better than I expected. You could set it up for syncing with `systemd`, but I really like using it like `git` and not having an always running service in the background. 

```
onedrive --sync -upload-only
```

A lot to type, but with history search, it's quick (and of course there are aliases). There is also [OneDriveGUI][5] if you're in to GUI's, but you'll loose some geek points.

What you don't get is the on-demand file access. There are other services for that, but I haven't tried them. 

## Install/Upgrade

There are [a bunch of packages for different distributions][3], but I found [the one for Arch][4] has a tendency to break, so I install and upgrade it from source instead.

```
# Arch prerequisite: sudo pacman -S make pkg-config curl sqlite ldc
git clone https://github.com/abraunegg/onedrive.git
cd onedrive
./configure --with-systemdsystemunitdir=no --enable-completions
make clean; make;
sudo make install
``````

[1]: https://github.com/abraunegg/onedrive
[2]: https://onedrive.com
[3]: https://github.com/abraunegg/onedrive/blob/master/docs/INSTALL.md
[4]: https://aur.archlinux.org/packages/onedrive-abraunegg
[5]: https://github.com/bpozdena/OneDriveGUI

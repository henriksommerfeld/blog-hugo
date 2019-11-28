---
title: "I ❤️ My \"New\" 2013 MacBook Pro"
date: 2019-11-28T21:29:10+01:00
url: "i-love-my-new-2013-macbook-pro"
categories: ["Tooling"]
tags: [Mac OS, Hardware]
summary: "This is a story about my personal computer (PC) experience, from the 1990’s up to my new love for a six year old laptop.

In November 2019 my wife bought a new laptop (MacBook Air) and I took over the old one. It’s a 2013 MacBook Pro that I have borrowed a few times for debugging web pages on iOS, but beyond that I don’t have much macOS experience. I saw the opportunity to take it and learn macOS for real for the first time."
description: "This is a story about my personal computing experience, from the 1990's up to my new love for a six year old laptop."
ogimage: "2019-11-26_HPA_2184.jpg"
draft: false
---

This is a story about my personal computer (PC) experience, from the 1990's up to my new love for a six year old laptop.

{{<post-image image="2019-11-26_HPA_2184.jpg" alt="Photo of the laptop I'm writing about in this post" />}}

In November 2019 my wife bought a new laptop (MacBook Air) and I took over the old one. It's a 2013 MacBook Pro that I have borrowed a few times for debugging web pages on iOS, but beyond that I don't have much macOS experience. I saw the opportunity to take it and learn macOS for real for the first time.

## History

I grew up with DOS (_Disk Operating System_, not _Denial of Service_) and Windows during Microsoft's glory days of total dominance in desktop computing. Computers were fascinating by themselves without thinking about alternatives to _[Windows for Workgroups 3.11][9]_. 

> It strikes me that we sometimes talk about Desktop and Mobile nowadays. By Desktop we then mean Laptop. Those were once two different things. 

At university, a new world of Solaris and Linux came to my awareness. I ran [Slackware][11] as my primary OS for quite some time when the computer was mostly used to learn computers. For that use, it was perfectly fine to spend most of the time in config files and compiling custom kernels.

{{<post-image image="mittrum.png" width="700" lightbox="true" alt="Student room in yearly 21 century with 14 inch computer monitor and 14 inch TV">}}
My student room with a computer on the floor, a "full tower", and some other important equipment.
{{</post-image>}}

I found this image of my student room, probably from 2002 when I was moving in. It reveals a bunch of important equipment at the time:

* Two purchased versions of [Suse Linux][1] (I remember that was my entry drug to Linux)
* A bunch of computer related books, of which I can read "C++" on one of them
* A 3.5" floppy disk 💾
* Large number of CD's for...2002's version of a _film offline watch list_.
* A bottle of [Jägermeister][2] 

As I started working after graduation, Windows was again the default choice and still is where I work today. Especially as a [.Net developer specialised in SharePoint][3], Windows was a requirement, not a choice.

## My New Mac 🤩

My new MacBook Pro is fantastic. It runs the latest version of macOS (Catalina) and I'm automatically logged in with my Apple Watch! I'll mostly compare this machine to my work laptop, an HP EliteBook 840 G5 from 2018 (that has a fingerprint reader, that is disabled by a domain policy).

### Shell

I use [Oh My Zsh][4] which is unsurprisingly quite like its PowerShell counterpart [oh-my-posh][5], that I'm used to. With just a couple of lines (below) in my `~/.zshrc`, ZSH feels like an upgrade. 

```
plugins=(git zsh-nvm zsh-autosuggestions)
source $ZSH/oh-my-zsh.sh
alias ls="exa"
autoload -U compinit
compinit
```

Text in the terminal also look great (I've always wondered who at Microsoft decided that red error messages on dark blue background was the way to go). 

Even emojis work! I had to pause for a moment after my first Homebrew installation and admire the beer mug 🍺 The emojis _look good_ too, there is no thick black border around them, amazing!

### Aesthetics

It's not just emojis, _everything_ look good. It's like there is only one design system used, even for third-party apps. I can't even find an ugly icon, nothing that reminds me of my days as a student.

### Package Manager

[Hombrew][8] is great and the given choice. Being able to install and uninstall both CLI tools and GUI apps of current versions through the command-line is great. I've only used Homebrew for about two weeks now, but I haven't once seen a big chunk of red XML in the console (like I occasionally do with Chocolatey).

I've saved my currently installed apps in a [Brewfile](https://gist.github.com/henriksommerfeld/c7b6d59b19f89780b1a7e40ab2f6434b) (with `brew bundle dump`) as a reference. If I install from scratch next time, I guess I'll copy that file, make some changes and run `brew bundle` – all done.

### Performance

Performance is better than I expected, CPU load is lower than on my HP laptop, doing roughly the same things. I have a few Electron apps running and I've mostly been fiddling with a Gatsby project. I was a bit worried about RAM, since the Mac has 8 gb and the HP has 16, but so far so good. I even installed _Adobe Photoshop 2020_ and have used it for simpler edits. I'm sure it will be slow for heavier use, but since I have a licence, I might as well use it. What I'm _not_ running on the Mac is _WMI Provider Host_ and _Antimalware Service Executable_, which is using a significant amount of resources on my Windows machine.

### Trackpad

Have you heard a reviewer on YouTube reviewing a Windows laptop and not comparing the trackpad to the Mac's? I haven't, and there's a reason for that - it's great!

### Display

The display on my 2013 MacBook Pro is _so_ much better than on my 2018 HP EliteBook. Colour, sharpness, brightness, everything. Sure there are Windows laptops with great displays, but the plethora of Windows laptops with non-great displays often attract those responsible of budget (maybe at your employer).

### iMessage

Since I was already an iPhone user, having iMessage on the computer is great. I've been trying to get people to write to me through _WhatsApp_ or _Facebook Messenger_ before, so that I could reply from my computer, but iPhone users keep going back to iMessage.

## The Future

Looking ahead, I can see myself continuing with Macs. The high prices, brittle keyboards, dongle dependency, replacing Esc and Fn keys with _Touch Bar_ etc, have kept me away from Macs. None of those problems exist on my 2013 MacBook, and if Apple continue in the direction set by the 16" MacBook Pro of making their products _better_, I might buy one when this 2013 one goes to its final rest.



[1]: https://www.suse.com/
[2]: https://upload.wikimedia.org/wikipedia/commons/3/39/17-03-16-J%C3%A4germeister-Miniaturen-RR7_8310.jpg
[3]: https://www.henriksommerfeld.se/getting-a-divorce-from-sharepoint/
[4]: https://github.com/ohmyzsh/ohmyzsh
[5]: https://github.com/JanDeDobbeleer/oh-my-posh
[6]: https://docs.microsoft.com/en-us/windows/wsl/faq
[7]: https://en.wikipedia.org/wiki/Windows_Insider#Rings
[8]: https://brew.sh/
[9]: https://en.wikipedia.org/wiki/Windows_3.1x
[10]: https://gist.github.com/henriksommerfeld/c7b6d59b19f89780b1a7e40ab2f6434b
[11]: http://www.slackware.com/

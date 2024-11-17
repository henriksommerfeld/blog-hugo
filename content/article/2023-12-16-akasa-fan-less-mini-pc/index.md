---
title: Akasa Fanless Mini PC
url: /akasa-fanless-mini-pc
date: 2023-12-17
description: The last couple of years, I've enjoyed a completely silent mini-PC by putting it into a fanless case. This time I'm using the Akasa Newton A50 to make a machine for my parents.
summary: The last couple of years, I've enjoyed a completely silent mini-PC by putting it into a fanless case. This time I'm using the Akasa Newton A50 to make a machine for my parents.
tags: [hardware]
categories: [Tools]
ogimage: blue-led.jpg
draft: false
---

This is my second fanless case build and I'll describe the pros and cons I've encountered. 

I've been running the bigger version of the Akasa cases for a couple of years now and the new one seems to have the same pros and cons. I'll get to that later.

{{<post-image image="new-and-old-case.jpg" alt="Akasa Newton 50 to the left and Akasa Turing A50 MKII to the right">}}
<a href="https://www.akasa.com.tw/update.php?tpl=product/product.detail.tpl&type=FANLESS%20CASES&type_sub=Mini%20PC&model=A-NUC78-M1B">Akasa Newton 50</a> to the left and <a href="https://www.akasa.com.tw/update.php?tpl=product/product.detail.tpl&type=FANLESS%20CASES&type_sub=Mini%20PC&model=A-NUC62-M1BV2">Akasa Turing A50 MKII</a> to the right.
{{</post-image>}}

The one I've used this time is the Akasa Newton 50 for the [Asus PN-51 I previously built for my sister][3]. Since she got a laptop I'm going to pass it on to our parents after removing the small fan that spins up and down causing an annoying sound. 

## Who is this for

Let's continue with the reasons for doing this. The obvious thing is having a completely silent computer that doesn't break the bank. A lot of people have other needs, but both myself and my parents are two user groups that fit this niche. 

I'm a programmer working from home running [Sway][4] on [EndeavourOS][5] with [Foot][6], [Docker][7], [Tmux][8], [Neovim][9] and [Firefox][10] as my main applications. 

My parents run [Windows][11] with [Onedrive][12], Firefox, printing/scanner software and a [CD](https://en.wikipedia.org/wiki/Compact_disc) player as their main applications (yes, with an external USB CD player). 

## Who is this not for
Mac lovers, gamers, work-from-café people, data hoarders, running-large-language-models-locally kind of people, and so on.

## How to disassemble/assemble

The original Asus PN-51 case is not made for disassembling. Use force and accept that the old case will be recycled. There is no way back.

{{<post-image image="cutter.jpg" alt="Open Asus PN-51 case next to a big cutter" />}}

Remove the existing cooling paste and apply some new. There is cooling paste included in the package, but not enough, since it should also be applied to the other side of the quite large cooling plate attached to the CPU.

{{<post-image image="remove-cooling-paste.jpg" alt="Removing the cooling paste" />}}

The instructions could clearer, but if you go slow, you'll see that they are unambiguous. 

{{<post-image image="assemble.jpg" alt="Screwing the actual computer into the new case" />}}

Since you've put your computer inside a thick metal box, there is no wifi or bluetooth going on. Antennas can be purchased separately, but I've found ethernet paired with a simple bluetooth dongle to be enough. 

As these cases are made for a specific computer model, the available ports are the same as with the original case. 

{{<post-image image="blue-led.jpg" alt="Akasa Newton 50 case to the left running with a bright blinding blue led and the original Asus PN-51 case to the right">}}
The new machince up and running with the old original empty case next to it. 
{{</post-image>}}

What Akasa has exposed though, is the very bright blue power led. An inexcusable design flaw, fixable with a couple of [dimmers][13]. One thing you need to do before powering up the machine, is to disable the fan controll in [UEFI][14].

## Conclusion
So, all in all I think this has been worth it for my own machine and I believe my parents will be satisfied with this revived version of a slightly aged machine. 

These cases fix the main issue with NUC/mini-PC's: the insufficient cooling and noise caused by a small fan. During the years I've run my machine, I haven't run into any heating issues either. The case is large enough to remove the generated heat.

[1]: https://www.akasa.com.tw/update.php?tpl=product/product.detail.tpl&type=FANLESS%20CASES&type_sub=Mini%20PC&model=A-NUC78-M1B
[2]: https://www.akasa.com.tw/update.php?tpl=product/product.detail.tpl&type=FANLESS%20CASES&type_sub=Mini%20PC&model=A-NUC62-M1BV2
[3]: /build-a-barebone-pc-for-your-non-tech-relative
[4]: https://swaywm.org/
[5]: https://endeavouros.com/
[6]: https://codeberg.org/dnkl/Foot
[7]: https://en.wikipedia.org/wiki/Docker_(software)
[8]: https://github.com/tmux/tmux
[9]: https://neovim.io/
[10]: https://www.mozilla.org/en-US/firefox
[11]: https://en.wikipedia.org/wiki/Microsoft_Windows
[12]: https://en.wikipedia.org/wiki/OneDrive
[13]: https://www.amazon.se/-/en/dp/B08Q341C4F
[14]: https://en.wikipedia.org/wiki/Uefi

+++
author = "admin"
categories = ["Coding"]
date = "2017-01-07T11:22:55+00:00"
tags = ["Windows Subsystem for Linux","NodeJS","Windows 10"]
title = "Frustration with NodeJS on Windows"
type = "article"
url = "/frustration-with-nodejs-on-windows/"

+++

During the last couple of years I have noticed more and more developers switching to Mac, especially among those in the SharePoint field that traditionally have been very loyal to Microsoft. I see a correlation between this and the trend away from Visual Studio bound development. After playing around with NodeJS for awhile I understand why and hope for a change. **Hopefully I can save you some googling with the links in this post if you run into the same issues as I have**.

After having watched many of the great clips by [DevTips on YouTube][1] and having done more front-end work professionally, I wanted to set up a simple lab environment on my local machine with Sass and BrowserSync. I mean, how hard can it be?

## Platform independent NodeJS

I started by trying out a bunch of [Yeoman generators][2] that included what I needed. Most of them installed fine, but none of them fully worked after installation on my Windows 10 machine. When running the build task (usually with Gulp), I got different errors in different dependant Node modules and were stuck.

I started to think about why "everyone" how maintains these projects are using Macs. Could it be because Node is "platform independent" to the extent that it works on every Mac? (sorry for the irony) But Windows 10 has a Linux sub-system that I have already activated...maybe I will have more success using that? I came across Stefan Bauer's great post [A bash on Windows and the new SharePoint Framework][3]. which explains the problems with NodeJS on Windows quite well. I had noticed the problems related to **node-gyp** already, but he explains it well.

## Trying Bash on Ubuntu on Windows

When I tried installing Node on Ubuntu on Windows I immediately ran into some Ubuntu weirdness related to Node and NPM, which is described here: [Yeoman: Getting it to Work on Ubuntu][4]. Having worked through that, my Sass compilation failed due to a dependency on the network which is not implemented in the Linux sub-system on Windows. See issue [_os.networkInterfaces error in NodeJS_][5] on GitHub. There are a few suggested workarounds for this as well, but at this time it's starting to feel absurd. Should I really be doing workarounds related to network interfaces in Linux to be able to do not-so-advanced front-end work on Windows? Maybe I should just stick with [Codepen][6]?

On the positive side, it seems that the issue with Ubuntu on Windows, which to be fair is still in beta, is resolved and available in Windows Insider build 14965 according to [this User Voice suggestion (Enable network connection enumeration)][7]. I'll guess I just have to wait for that and hope I can avoid these rabbit trails in the future.

_**Update: I found a Yeoman generator named [Yeogurt][8] that worked fine with the latest Node and NPM versions on Windows 10.**_

 [1]: https://www.youtube.com/user/DevTipsForDesigners
 [2]: http://yeoman.io/generators/
 [3]: http://www.n8d.at/blog/a-bash-on-windows-and-the-new-sharepoint-framework/
 [4]: http://truthyfalsey.com/yeoman-working-ubuntu/
 [5]: https://github.com/Microsoft/BashOnWindows/issues/468
 [6]: http://codepen.io/
 [7]: https://wpdev.uservoice.com/forums/266908-command-prompt-console-bash-on-ubuntu-on-windo/suggestions/16109719-enable-network-connection-enumeration
 [8]: https://github.com/larsonjj/generator-yeogurt
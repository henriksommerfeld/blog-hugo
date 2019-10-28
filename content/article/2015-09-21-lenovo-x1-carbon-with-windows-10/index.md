+++
author = "admin"
categories = ["Thoughts"]
date = "2015-09-21T09:59:55+00:00"
tags = ["Cmder","Hardware","Windows 10"]
title = "Lenovo X1 Carbon with Windows 10"
type = "article"
url = "/lenovo-x1-carbon-with-windows-10/"

+++

I have recently got the chance to upgrade my work computer from an old, heavy and ugly machine with almost no battery life and a terrible screen to something new and shiny. I ended up getting the third generation Lenovo X1 Carbon (unfortunately without touch screen for budget reasons). This is my experience so far of that machine running Windows 10.

{{<post-image image="x1_carbon.jpg" lightbox="true" alt="Lenovo X1 Carbon" />}}

I really like the X1 Carbon. Lightweight with a good screen and good keyboard, and good performance for an ultrabook. Even my MacBook loving wife thought it looked cool.

## Screen and scaling

I have the 2560&#215;1440 screen set at 125% scaling and I'm sort of glad that I didn't get the 3200&#215;1800 Dell XPS 13 I would have got if it had been available. I still have to log out and in again to Windows after connecting my two 1920&#215;1200 monitors (using the _ThinkPad OneLink Pro Dock_ docking station), otherwise everything is horribly blurry. Even many of the Store apps are not using the screen resolution in a good way. The Facebook app is for instance showing the feed in a narrow column with small text in the middle of the screen with a lot of dead space on the sides.

## Logging in

The possibility to log in with a PIN code is something I really like, especially when using an external keyboard with a full numerical keypad, this makes the login quick and simple. When using only the laptop I use the fingerprint reader which I find even simpler. I think this is a great improvement for security, especially as you are encouraged to use your Microsoft account for logging in to Windows. If you want to have a good password on your Microsoft account and you would need to enter that password every time your laptop wakes up, you would go crazy, so this is a great improvement.

## Calendar app

One of the things I have been missing in Windows is a calendar application that supports all relevant providers. I've had my Office 365, Gmail and iCloud in one calendar view in iOS for a long time. Now I can have that in Windows too, and I can see the upcoming appointment on the lock screen. Fantastic!

## Setting up a good command line experience

The PowerShell console has been vastly improved in Windows 10 with the possibility to resize the window and have persisted command history between sessions. Of course it’s laughable if you come from a UNIX based system that these are new features released in 2015, but it’s still a great improvement. However, I still prefer [Cmder][2] that has everything in one console. [One-Get][3] is also looking promising, but as long as it doesn’t have and update command I’ll stick with Chocolatey and its command line tools. Installing and upgrading programs through the command line feels so much simpler to me than visiting a web site, finding the right download link and doing the next, next, finish routine.

{{<figure src="/images/cinst_paint.png" link="/images/cinst_paint.png" alt="Installing Paint.NET through command line">}}

I found [Setup Windows 10 for Modern/Hipster Development][5] to be a good resource for finding some nice tools.

 [2]: http://cmder.net/
 [3]: https://github.com/OneGet/oneget
 [5]: https://github.com/felixrieseberg/windows-development-environment/blob/master/README.md
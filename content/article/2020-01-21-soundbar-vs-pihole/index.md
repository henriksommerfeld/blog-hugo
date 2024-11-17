---
title: "Yamaha YAS-109 Soundbar has Excessive Network Traffic"
url: yamaha-yas-109-soundbar-has-excessive-network-traffic
date: 2020-01-21
summary: This is an appeal to any of you who is coding for, or otherwise developing connected devices, to put some extra thought into your network traffic. Maybe also a warning to consumers and an encouragement to us tech savvy people to monitor your connected devices.
description: This is an appeal to any of you who is coding for, or otherwise developing connected devices, to put some extra thought into your network traffic. Maybe also a warning to consumers and an encouragement to us tech savvy people to monitor your connected devices.
tags: [Internet of Things, Hardware]
categories: [Thoughts]
ogimage: soundbar-hero-16_9.jpg
draft: false
---

This is an appeal to any of you who is coding for, or otherwise developing connected devices, to put some extra thought into your network traffic. Maybe also a warning to consumers and an encouragement to us tech savvy people to monitor your connected devices.

{{<post-image lightbox="true" image="soundbar-hero-16_9.jpg" alt="Yamaha YAS-109 soundbar with a Pi-hole logo">}}
Yamaha YAS-109 soundbar
{{</post-image>}}

I recently bought a soundbar for my TV, a [Yamaha YAS-109][2]. When I looked at my [Pi-hole][1] dashboard a few weeks later, I was surprised. The soundbar was by far the most active device on my network, event though it has mostly been "turned off" (standby mode). 

{{<post-image lightbox="true" image="top-clients.png" width="600" alt="Pi-hole dashboard showing top active clients by request. Soundbar has 36996 requests, while second most active device has 3052.">}}
The most active device I have in my network is apparently the soundbar (192.168.1.197), by far.
{{</post-image>}}

Looking at what all these requests are, filtered on the soundbar only, shows the following. 

{{<post-image lightbox="true" image="top-domains.png" width="600" alt="URL's for Alexa, Yamaha, Spotify and Google is in the list" />}}

Clearly it's calling the [Alexa][5] service a lot and I want to point out that I have hit the mute button, that according to the manual, should ensure privacy (disable Alexa). The manual also states that I have to configure an Amazon account if I want to use the Alexa service, which I haven't done. 

Resetting Pi-hole statistics and just looking at a few minutes of traffic, I saw the following requests:
* ap.spotify.com (~14 times/min)
* avpro.global.yamaha.com (~8 times/min)
* avs-alexa-na.amazon.com (~8 times/min)
* www.goog<span>le.c</span>om (~3 times/min)
* various [NTP][3] servers (~3 times/min)

Note that this was logged when the device was in standby mode and no traffic is blocked, so it shouldn't be a bad retry logic gone wild. The soundbar has [Spotify Connect][4], but I haven't used that feature. Why it needs to contact www.goog<span>le.c</span>om so often, or frankly - at all, is beyond my understanding. Although I have a bad habit of checking my wrist watch a bit too often, I think calling a time server several times a minute for a soundbar in standby mode is just ridiculous. 

This isn't the worst example of an _[Internet of Shit][6] device_, since the core functionality of being a speaker works perfectly fine without an Internet connection (that's the way I run it now). I don't know _why_ it's "calling home" so frequently, it might not be evil, but it sure abuses my network in a non-justifiable way.

So, if your company produces similar consumer electronics and especially if you're writing the code for it, please don't do this. If you're not monitoring your home network, please do. [Setting up Pi-hole][1] is really simple!




[1]: https://pi-hole.net/
[2]: https://uk.yamaha.com/en/products/audio_visual/sound_bar/yas-109/index.html
[3]: https://en.wikipedia.org/wiki/Network_Time_Protocol
[4]: https://www.spotify.com/uk/connect/
[5]: https://en.wikipedia.org/wiki/Amazon_Alexa
[6]: https://twitter.com/internetofshit

---
title: My Unifi Dream Wall
url: /my-unify-dream-wall
date: 2023-03-31
description: "The Unifi Dream Wall was recently released and I've been using it as my home router since July 2022, so I thought I'd share my thoughts on it."
summary: "The Unifi Dream Wall was recently released and I've been using it as my home router since July 2022, so I thought I'd share my thoughts on it."
tags: [Network, Unifi]
categories: [Tools]
ogimage: dream-wall-input.jpeg
draft: false
---

The [Unifi Dream Wall][1] was recently released and I've been using it as my home router since July 2022, so I thought I'd share my thoughts on it.

{{<post-image image="cablebox-open.jpeg" alt="Unifi Dream Wall beneath cable box mounted on wall" >}}
<p>The screen is smaller on this version than the editions you can find in Ubiquiti's store, but other than that, it doesn't appear to be any other visible changes made.</p>
{{</post-image>}}

## Context
My family bought our first house in July 2022, a house built in 1930 with three floors and excessive ethernet wiring throughout the house by the previous owner. All cables connected at a single point in the basement where fiber also connected the house to the Internet.

{{<post-image image="cable-mess.jpg" alt="Cable mess" >}}
<p>The cable management before we moved in</p>
{{</post-image>}}


## Form factor
For our house, the form factor is much better than any alternative I've seen. The Power over Ethernet (PoE) ports also mean I have gotten rid of a bunch of PoE injectors around the house. The Micro SD card slot is good enough for our storage needs using [Unifi Protect][2] with recording enabled during detected motion.

{{<post-image image="protect.jpeg" alt="Micro-SD card slot" >}}
<p>The Micro SD card holds the video recordings as part of Unifi Protect, which is good enough for our home usage.</p>
{{</post-image>}}

One thing I'm not sure about the idea behind, is the double power supplies (PSU). It has two, but since it only takes one power plug, I don't really understand the purpose.

## Thermals

I was surprised by the running temperature of the device when I turned it on without any load, quite hot. Thankfully it's pretty much the same after connecting my devices, around 64°C. I'm only using around 33W out of maximum 420W PoE capacity though (3 access points and 2 cameras) and CPU utilisation is around 15-20%

{{<post-image image="temp.jpeg" alt="Dream Wall showing temperature on display. 64 degrees Celsius, 147 degrees Fahrenheit" width="500" />}}
{{<post-image image="cpu.jpeg" alt="Dream Wall showing CPU load on display" width="500" />}}

## Noise
The noise level was my biggest initial disappointment, coming from a traditional home router without a fan. The Dream Wall is a device with components equal to Ubiquiti's rack mountable hardware and I think that's how you should set your noise level expectations. Having that said, my wife uses the room as as music studio without complaining (after the initial reaction), but I wouldn't want to sleep next to it.

## Stability
There has been a few times with power outage in the house and the Dream Wall has had trouble starting up again. This is how it goes:
1. Power comes back and the Dream Wall is *on* but not handling any traffic and the display says it needs to be restarted.
2. I restart it and it says: "Est. Time Remaining: 5m". 
3. After 5 minutes it says: "It is taking a little longer". No matter how long I wait it doesn't help (I've switched my computer to phone tethering and waited hours) ⛔

This is the procedure that has worked for me to get it running again.
1. Power comes back and the Dream Wall is *on*  but not handling any traffic and the display says it needs to be restarted.
2. I shut it down and wait long enough for it to completely cool down (touching the aluminium on the left side where it gets the hottest)
3. I start it again and it starts handling traffic. ✅

Other than that, it's been great. Moving around the house and watching the phone seamlessly switch between WiFi access points is nice. 

## Final words

All in all, I'm happy with the purchase and would recommend it to anyone with a similar need.

[1]: https://store.ui.com/collections/unifi-network-unifi-os-consoles/products/dream-wall
[2]: https://store.ui.com/collections/unifi-protect

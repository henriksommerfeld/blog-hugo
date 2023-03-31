---
title: My Unify Dream Wall
url: /my-unify-dream-wall
date: 2023-03-31T22:18:00+02:00
description: "The Unify Dream Wall was recently released and I've been using it as my home router since July 2022, so I thought I'd share my thoughts on it."
summary: "The Unify Dream Wall was recently released and I've been using it as my home router since July 2022, so I thought I'd share my thoughts on it."
tags: [Network, Unify]
categories: [Tooling]
ogimage: dream-wall-input.jpeg
draft: false
---

The [Unify Dream Wall][1] was recently released and I've been using it as my home router since July 2022, so I thought I'd share my thoughts on it.

{{<post-image image="cablebox-open.jpeg" alt="Unify Dream Wall beneath cable box mounted on wall" >}}
<p>The screen is smaller on this version than the editions you can find in Ubiquiti's store, but other than that, it doesn't appear to be any other visible changes made.</p>
{{</post-image>}}

## Context
My family bought our first house in July 2022, a house built in 1930 with three floors and excessive ethernet wiring throughout the house by the previous owner. All cables connected at a single point in the basement where fiber also connected the house to the Internet.

{{<post-image image="cable-mess.jpg" alt="Cable mess" >}}
<p>The cable management before we moved in</p>
{{</post-image>}}


## Form factor
For our house, the form factor is much better than any alternative I've seen. The Power over Ethernet (PoE) ports also mean I have gotten rid of a bunch of PoE injectors around the house. The Micro SD card slot is good enough for our storage needs using [Unify Protect][2] with recording enabled during detected motion. 

{{<post-image image="protect.jpeg" alt="Micro-SD card slot" >}}
<p>The Micro SD card holds the video recordings as part of Unify Protect, which is good enough for our home usage.</p>
{{</post-image>}}

One thing I'm not sure about the idea behind, is the double power supplies (PSU). It has two, but since it only takes one power plug, I don't really understand the purpose.

## Thermals

I was surprised by the running temperature of the device when I turned it on without any load, quite hot. Thankfully it's pretty much the same after connecting my devices, around 64°C. I'm only using around 33W out of maximum 420W PoE capacity though (3 access points and 2 cameras) and CPU utilisation is around 15-20%

{{<post-image image="temp.jpeg" alt="Dream Wall showing temperature on display" width="500" />}}
{{<post-image image="cpu.jpeg" alt="Dream Wall showing CPU load on display" width="500" />}}

## Noise
The noise level was my biggest initial disappointment, coming from a traditional home router without a fan. The Dream Wall is a device with components equal to Ubiquiti's rack mountable hardware and I think that's how you should set your noise level expectations. Having that said, my wife uses the room as as music studio without complaining (after the initial reaction), but I wouldn't want to sleep next to it.

## Stability
There has been a few times with power outage in the house (partly due to electricians cutting the power for renovation work without telling me in advance) and the Dream Wall has had trouble starting up again. Booting has been slow and twice required manual intervention. This has however been during the early access period with 2.x version of Unify OS and there might have been hardware changes made (in addition to the screen) between my version and the ones available in the store now, so I don't think you should be scared of that.

Other than that, it's been great. Moving around the house and watching the phone seamlessly switch between WiFi access points is nice. 

## Final words

All in all, I'm happy with the purchase and would recommend it to anyone with a similar need.

[1]: https://store.ui.com/collections/unifi-network-unifi-os-consoles/products/dream-wall
[2]: https://store.ui.com/collections/unifi-protect

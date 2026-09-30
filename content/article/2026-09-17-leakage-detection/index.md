---
title: 'Water Leakage Alarm with Home Assistant'
url: '/water-leakage-alarm-with-home-assistant'
date: 2026-09-30
draft: false
description: This is my water leakage alarm setup in Home Assistant
summary: Since I have now had water leakage detection working in Home Assistant for a few years without touching it much, I think it's time to describe my setup, as I find it useful.
tags: ['home assistant']
categories: ['tools']
ogimage: aqara-sensor.webp
---

Since I have now had water leakage detection working in Home Assistant for a few years without touching it much, I think it's time to describe my setup, as I find it useful.

## Sensor

The most obvious thing you need is a sensor that can detect a water leak. Since I run a ZigBee network with my Home Assistant, I use the [Aqara Water Leak Sensor][1].

## Node-RED

Since I'm not particularly fond of YAML, I set this up using [Node-RED][2]. With the current version of Home Assistant, _Automations_ might work just as well as a {{<GUI />}} option, but I just found Node-RED to be the more appealing option at the time. The image below shows how it looks in Node-RED and I like the overview this provides for more complicated flows, but for this use-case that's not a significant advantage. Regardless of implementation the principle is very simple. The binary leakage sensor either indicates a leak or not. If it indicates a leak, we should send a message.

<style>
.hidden {
  display: none;
}
.light .light-hidden {
  display: none;
}
.light .light-shown {
  display: block;
}
</style>
<div class="light-hidden">{{<post-image image="node-red-leakage-dark.webp" borderless="true" alt="Screenshot from Node-RED with one node labled 'Leakage dish washer' and two connected nodes: 'Pushover notification' and 'Home Assistant notification'" />}}</div>
<div class="hidden light-shown">{{<post-image image="node-red-leakage-light.webp" borderless="true" alt="Screenshot from Node-RED with one node labled 'Leakage dish washer' and two connected nodes: 'Pushover notification' and 'Home Assistant notification'" />}}</div>


## Alerting

For the alerts/notifications I use Home Assistant's [notifications][4]
(`notify.notify`). This is great because it works locally even without a
working internet connection.

I also use [Pushover][3] which provides many ways of configuring the alert and
will reach me even if I can't reach my Home Assistant instance from the
internet when I'm not at home, as long as Home Assistant can reach Pushover's
servers.

Messages in the screenshots below are in Swedish, but that just shows you can set it to any text you want.

{{<post-images>}}
  {{<post-image image="watch-alert.webp" alt="Apple Watch screenshot showing two alerts, one with Home Assistant + Pushover icon and one with only the Home Assistant icon. Heading says 'Vattenläcka på diskmaskinen' and description 'Läckagedetektorn utlöst bakom diskmaskinen.'. Only top of the second message is visible.">}}
    <em>Alert on Apple Watch</em>
  {{</post-image>}}
  {{<post-image image="iphone-alert.webp" alt="Iphone lock screen showing two alerts, one with the Home Assistant icon and one with Home Assistant + Pushover icon. Both has heading 'Vattenläcka på diskmaskinen' and description 'Läckagedetektorn utlöst bakom diskmaskinen.'">}}
    <em>Alert on Iphone</em>
  {{</post-image>}}
{{</post-images>}}

## Testing

Depending on the sensor and the notification method, it can be a bit tricky to know which property to read and how to format the notification message. The good news is that this simple flow is really easy to test end-to-end. Just put the sensor in a cup filled with some water and see if you get the alert.

When testing this now it took about two seconds from putting the sensor in water until my Apple Watch started vibrating and showing the message above.

{{<post-image image="aqara-sensor.webp" alt="Aqara water sensor in a dipping bowl with some water in it, on a white table.">}}
  <em>End-to-end testing of water leakage alarm</em>
{{</post-image>}}

## What could possibly go wrong?

There are a number of ways this system can fail and it's good to be aware of them.

### Home Assistant Offline


Of course the entire Home Assistant instance might break, loose power or whatever. Everyday use of Home Assistant is an implicit offline detection. I will notice this when turning off a light or locking a door, so I consider this failure scenario covered.
### Sensor Offline

Home Assistant can loose the connection to the sensor for a number of reasons. ZigBee signal might be too weak or the sensor's battery has run out. For this I use an automation, located under _Settings -> Automations & scenes_.

<style>
.hidden {
  display: none;
}
.light .light-hidden {
  display: none;
}
.light .light-shown {
  display: block;
}
</style>
<div class="light-hidden">{{<post-image image="offline-alert-dark.webp" alt="Screenshot from Home Assistant automation with trigger 'Device offline' and action 'Send a presistent notification'" />}}</div>
<div class="hidden light-shown">{{<post-image image="offline-alert-light.webp" alt="Screenshot from Home Assistant automation with trigger 'Device offline' and action 'Send a presistent notification'" />}}</div>


### Updates Breaking the Flow

Even if everything seems fine, it is a good idea to test this once a year or so, like with a smoke detector. An update can silently break the setup if we're unlucky. Having that said, I have yet to experience that after several years.


[1]: https://www.aqara.com/en/product/water-sensor/
[2]: https://community.home-assistant.io/t/home-assistant-community-add-on-node-red/55023
[3]: https://pushover.net/
[4]: https://www.home-assistant.io/integrations/notify/

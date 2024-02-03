---
title: Yale Doorman L3 with Home Assistant through Bluetooth Proxy
url: /yale-doorman-l3-with-home-assistant-through-bluetooth-proxy
date: 2023-07-17T01:08:00+02:00
description: I'll describe how I use Bluetooth proxy to control my Yale Doorman L3 lock through Home Assistant.
summary: I'll describe how I use Bluetooth proxy to control my Yale Doorman L3 lock through Home Assistant.
tags: [home-assistant]
categories: [Tools]
ogimage: nodemcu.jpg
draft: false
---


I'll describe how I use [Bluetooth proxy][4] to control my [Yale Doorman L3 lock][5] through [Home Assistant][3].

## Background

I bought the _Yale Doorman L3_ lock for my front door in a kit that
included the _[Yale Connect Wi-Fi Bridge][1]_. That should enable remote access
to the lock, which you may or may not want, but without it it's not available
for automations and only accessible from your phone when you stand in front of
the lock (shortest imaginable Bluetooth range).

The _Connect Wi-Fi Bridge_ is possible to get working, but it's a fundamentally
broken product. I've had two (in the previous house as well) and none of them
have worked reliably (and forums are full of people with the same issue). To
add insult to injury, I receive an email from Yale when the lock has been
offline for a while, blaming my Wi-Fi. Remember, if your product is bad, it's
always the customer's fault.

{{<post-image image="bridge-close-to-door.jpg" alt="Yale Wi-Fi Bridge very close to font door" width="600">}}
<p>No matter how close the bridge is to the door, the BLE signal is weak.</p>
{{</post-image>}}

{{<post-image image="bad-ble-signal.png" alt="Bad BLE signal and good WiFi signal" width="600">}}
<p>WiFi SNR: Excellent. Wi-Fi signal: Good. BLE signal: Bad</p>
{{</post-image>}}

So, it's nothing wrong with the Bluethooth capabilities in the lock itself, it's just
that the _Connect Wi-Fi Bridge_ is a faulty product. By connecting the lock itself directly to Home 
Assistant, I'm not limited by the _Connect Wi-Fi Bridge_ or a Yale cloud service. Here is the 
setup _with_ the _Connect Wi-Fi Bridge_:

{{<post-svg image="yale-connect-wifi-bridge.svg" use-theme="true" />}}

## Home Assistant Bluethooth Proxy and ESPHome to the Rescue

By using Home Assistant Bluetooth Proxy I don't have to place the Home
Assistant machine (I use a Raspberry Pi) right by the front door. Home
Assistant can speak to the lock through the proxy instead of the _Connect Wi-Fi Bridge_ and without 
hitting the public Internet. 

{{<post-svg image="bluetooth-proxy.svg" use-theme="true" />}}

## Step-by-step

The steps I took to got this set up (I already had a Home Assistant instance
running). 

### Get the Bluetooth Proxy going

First I bouth [a NodeMCU that speaks WiFi and Bluetooth][2] and flashed it
   with the right firmware using the option _Generic ESP32_ at the [ESPHome
Bluetooth Proxies web site][4] using the Chromium web browser. Not all Chromium
based browsers work, you should see a _Connect_ button. When asked to join a Wi-Fi network, 
I used my IoT Wi-Fi. I then added it to Home Assistant from the option in the dialogue following the firmware flash. 

{{<post-image image="esphome-flash-bluetooth-proxy.png" alt="" width="600">}}
{{</post-image>}}

After that I chose the option to add the ESP32 device to Home Assistant and got this 
trick question about a `Host`. What I found working was to enter the IP address 
the ESP32 device has on my local network. I set a fixed address for the device in my router.

{{<post-image image="esphome-add-to-home-assistant.png" alt="" width="600">}}
{{</post-image>}}

### Install and Configure Home Assistant Integrations

1. Install the [August integration][6] in Home Assistant to get the _Offline Key_
   required by the Yale Access Bluetooth integration. The August integration
specifically lists the _Yale Doorman L3_ lock as incompatible, but it worked for
me to get the Offline Key by simply signing in to my Yale account using e-mail.
2. Install the [Yale Access Bluetooth integration][7], which should then recognise your
   Offline Key and the Yale lock itself.
3. Now it's just a matter of adding the lock to a dashboard and start building
   some neat automations. So far I use it to send a notification if I have any
door or window open in the house when I lock the door, a good thing when you're
leaving the house.

## Final Note

Now you can give the _Yale Connect Wi-Fi Bridge_ the [Office Space printer scene
treatment](https://www.youtube.com/watch?v=N9wsjroVlu8)  it deserves.

[1]: https://www.yalehome.com/sg/en/products/accessories/yale-connect-wi-fi-bridge
[2]: https://www.amazon.se/-/en/AZDelivery-Bluetooth-Development-compatible-including/dp/B08BTLYSTM
[3]: https://www.home-assistant.io/
[4]: https://esphome.github.io/bluetooth-proxies/
[5]: https://www.yalehome.com/se/sv/products/smart-locks/yale-doorman-l3s
[6]: https://www.home-assistant.io/integrations/august/
[7]: https://www.home-assistant.io/integrations/yalexs_ble

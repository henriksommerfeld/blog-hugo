---
title: "Firmware Update Notifications for My Asus Router"
date: 2018-07-31T11:14:58+02:00
url: "firmware-update-notifications-for-my-asus-router"
categories: ["Tools"]
tags: ["Networking", "Scripting"]
---

Even though there is an app for my [Asus RT-AC68U router][6] with the default firmware, it hasn't worked that well for me and I wanted reliable firmware update notifications. I found that this has been done by others, but still, there are a few steps to go through, so I'm documenting them here. This works for several other Asus router models as well, see [the list of supported routers][8].

## Installing Custom Firmware
The first step I took was to install the custom firmware [Asuswrt-Merlin][1]. To be able to run a custom script on your router, you need a custom firmware. Installing it is just as easy as downloading the binary and uploading it in the regular router web interface at `http://192.168.1.1/Advanced_FirmwareUpgrade_Content.asp`.

One thing about downloading though, you will need to do a manual download and installation for every update later on, so choosing their OneDrive hosted download location and bookmarking the folder for your router model will save you time, compared to using the horrible SourceForge mirrors where you have to click 15 times and wait a while to actually download something.

After installing the Merlin firmware you should see a new logo in the web interface (which otherwise looks pretty much the same).

{{<figure link="/images/asus-firmware-upload.png" src="/images/asus-firmware-upload.png" alt="Asus router web interface for uploading and applying a firmware update" class="image-border" caption="Install custom router firmware">}}

## Enabling New Firmware Version Check

The router's firmware can check for updates itself, but that needs to be enabled. Do it under the _Tools_ menu.

{{<figure link="/images/asus-update-notification-enabling.png" src="/images/asus-update-notification-enabling.png" alt="Asus router web interface for enabling firmware version check" class="image-border" caption="Enable firmware version check">}}

## Adding Notification Script

I found a sample notification script, _[Update Notification Example][2] (the script I copied)_, but to be able to put that in the router, we first need to enable SSH. I changed it from _No_ to _LAN only_.

{{<figure src="/images/asus-enable-sshd.png" alt="Asus router web interface for enabling SSHD" class="image-border" caption="Enable router SSH access">}}

After enabling SSH I can log in with the same user as in the web interface and add the script. Note that the script needs to have this exact name and path (`/jffs/scripts/update-notification`). Also note that the script only handles the notification, the router firmware itself will call this script when an update is available.

```
ssh admin@192.168.1.1
nano /jffs/scripts/update-notification
```

The script supports e-mail, Pushbullet and Pushover for notifications. I chose [Pushover][9] and followed their guide for creating an API token for the router and added that to the script. The Pushover phone app cost me 50 SEK (4.9 EUR / 5.7 USD) as a one time purchase, but it's free to try for a week. I removed the stuff I didn't need from the original script and ended up with this.

{{<highlight bash>}}
#!/bin/sh
# https://github.com/RMerl/asuswrt-merlin/wiki/Update-Notification-Example

pushover_token="aox5eet52qtquc9d42pjkud5fx4rg6 <- just fake"      # Your access token here (https://pushover.net/api)
pushover_username="w1yy39m3ysguhyfyrpk54peve8ioc8 <- just fake"   # Pushover User ID (the user/group key (not e-mail address often referred to as USER_KEY)

# Retrieve version
TMPVERS=$(nvram get webs_state_info)
VERS=$TMPVERS
ROUTER_IP=$(nvram get lan_ipaddr)
echo "Version: $VERS"

pushover_message () {
  curl -s \
    --form-string "token=$pushover_token" \
    --form-string "user=$pushover_username" \
    --form-string "message=New firmware version $VERS is now available for your router at $ROUTER_IP." \
    https://api.pushover.net/1/messages.json
}

if [ "$pushover_token" ] && [ "$pushover_username" ]; then          
  echo "Sending notification"                                       
  pushover_message                                                  
else                                                                
  echo "Notification settings not configured (not sending anything)"
fi                                                                  
{{</highlight>}}

Make the script executable and run it once to see that it works. 

```
chmod +x /jffs/scripts/update-notification
/jffs/scripts/update-notification
exit
```

I think updating your router software is just as important as keeping your computer or phone updated, so now i don't have to remember to manually check for updates. I just got the first "real" update notification and made the manual upgrade before writing this, works great 😎.

{{<figure link="/images/pushover-router-notifications.jpg" src="/images/pushover-router-notifications.jpg" alt="Router firmware update notifications in Pushover app on iPhone" class="image-border" caption="Router firmware update notification on my phone">}}

[1]: https://asuswrt.lostrealm.ca/
[2]: https://github.com/RMerl/asuswrt-merlin/wiki/Update-Notification-Example
[3]: https://onedrive.live.com/?authkey=%21AJLLKAY--4EBqDo&id=CCE5625ED3599CE0%211444&cid=CCE5625ED3599CE0
[4]: http://192.168.1.1/Tools_OtherSettings.asp#fwcheck
[5]: http://192.168.1.1/Advanced_System_Content.asp
[6]: https://www.asus.com/Networking/RTAC68U/
[7]: https://asuswrt.lostrealm.ca/download
[8]: https://asuswrt.lostrealm.ca/about
[9]: https://pushover.net/
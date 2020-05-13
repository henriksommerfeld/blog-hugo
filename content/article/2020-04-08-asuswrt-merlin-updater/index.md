---
title: Asuswrt-Merlin Firmware Update Checker
url: /asuswrt-merlin-firmware-update-checker
date: 2020-04-08T14:02:21+02:00
summary: I have an Asus RT-AC68U router at home. I’ve previously used the build-in update checker together with a notification script that ran on the router itself. Recently I noticed that I hadn’t got any update notifications in a long time, one of downsides of silent failures. This is my custom code that looks for updates.
description: My custom checker for finding updates to Asuswrt-Merlin router firmware. I describe the code and how it's scheduled to run.
tags: [Networking, Scripting, NodeJS]
categories: [Tooling]
ogimage: pushover.jpg
draft: false
---

I have an Asus RT-AC68U router at home. [I've previously used the build-in update checker together with a notification script][3] that ran on the router itself. Recently I noticed that I hadn't got any update notifications in a long time, one of downsides of silent failures. 

When I ran a manual check using the router's web interface, it just said: _"Temporarily unable to get the latest firmware information. Please try again later."_ It doesn't seem to be that temporary though.

## TLDR

The code is in [this GitHub repo][2] and the scheduling piece with cron is described a the end of this post.

## Building my own update checker

Since [the project website of Asuswrt-Merlin][4] presents the latest version in an easily parsable way, I decided to write my own checker using _[screen scraping][5]_ in NodeJS.

### Version checker

To find the latest version, I just looked at [the website][4], inspected the HTML, installed the packages `request-promise` and `cheerio`, and finally extracted the version number of interest.

{{<code javascript>}}
import rp from 'request-promise';
import $ from 'cheerio';

export async function getLatestStableVersion() {
  try {
    const html = await rp('https://www.asuswrt-merlin.net/');
    const text = $('#block-currentrelease', html).text();
    const rows = text.split('\n');
    const stableOthers = rows.find(r => r.startsWith('Others:'));
    const stableVersion = stableOthers.split('Others:')[1].trim();
    return stableVersion;
  }
  catch (error) {
    Promise.reject(error);
  }
}
{{</code>}}

### Saving last checked version

In order to know if there is a new version since my last check, I of course need to keep track of what the version was the last time I checked. I did this with a simple text file on disk.

{{<code javascript>}}
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const savedVersionFilePath = path.resolve(path.resolve(''), './last-checked-version.txt');

export function getLastCheckedVersion() {
  if (!existsSync(savedVersionFilePath)) {
    return "0.0"
  }
  
  const lastCheckedVersion = readFileSync(savedVersionFilePath, 'utf8');
  return lastCheckedVersion;
}

export function saveLastCheckedVersion(version) {
  writeFileSync(savedVersionFilePath, version);
}
{{</code>}}

### Notifier

I already had a working notification script using the service [Pushover][7] that I ported from Bash to NodeJS.

{{<code javascript>}}
import dotenv from 'dotenv';
import rp from 'request-promise';

export function sendPushoverNotification(message) {
  dotenv.config();
  var options = {
    method: 'POST',
    uri: 'https://api.pushover.net/1/messages.json',
    body: {
      token: `${process.env.PUSHOVER_TOKEN}`,
      user: `${process.env.PUSHOVER_USER}`,
      message: message
    },
    json: true
  };

  rp(options)
    .then(function (parsedBody) {
      console.log(`Pushover notification sent: ${message}`);
    })
    .catch(function (err) {
      console.error(err);
    });
  }
{{</code>}}

### Gluing it together

By sending a notification both when there is no update and when an error occurs, I won't have any silent failures unless I made a mistake here somewhere. 

{{<code javascript>}}
import { getLatestStableVersion } from './latest-version-checker.js';
import { sendPushoverNotification } from './notify.js';
import { getLastCheckedVersion, saveLastCheckedVersion } from './localFile.js';

async function main() {
  try {
    const lastCheckedVersion = getLastCheckedVersion();
    console.log("main -> lastCheckedVersion", lastCheckedVersion)
    const latestVersion = await getLatestStableVersion();
    
    if (latestVersion !== lastCheckedVersion) {
      const message = `🔔 New firmware version ${latestVersion} is now available at 
      
      https://www.asuswrt-merlin.net/`;
      sendPushoverNotification(message);
      saveLastCheckedVersion(latestVersion);
    }
    else {
      const message = `🤷‍♂️ No firmware released. ${latestVersion} is the latest.`;
      sendPushoverNotification(message);
    }
  } catch (error) {
    console.log("main -> error", error)
    const message = `⚠️ Router firmware update check failed`;
    sendPushoverNotification(message);
  }
}

main();
{{</code>}}

## Scheduling the update checker

I'm running this on a [RaspberryPi][8] and it's scheduled to run once a week, 18:10 on Wednesdays. I found https://crontab.guru to be helpful for not mixing up the time settings.

`crontab -e`

```
10 18 * * 3 /home/pi/router-update-check.sh >> /home/pi/router-update-check.log
```

The trickiest thing for me as a terrible Linux admin, was to get the cron scheduling working. Adding the output of `echo $PATH` at the top of the script did the trick. Logging the output (to `router-update-check.log` in this case), also helped.

`router-update-check.sh` script contains the following:

{{<code bash>}}
#!/bin/bash
PATH=/home/pi/.nvm/versions/node/v13.12.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:/snap/bin

cd /home/pi/Code/asuswrt-merlin-update-check/
node ./main.js
{{</code>}}

The result of running the script once every minute (while troubleshooting) showed up in my phone like this. I now have an update checker that I can only blame myself if it doesn't work. Great success!

{{<post-image image="pushover.jpg" alt="Pushover notifications on iOS" width="600">}}
{{</post-image>}}

[1]: https://crontab.guru/
[2]: https://github.com/henriksommerfeld/asuswrt-merlin-update-check
[3]: /firmware-update-notifications-for-my-asus-router
[4]: https://www.asuswrt-merlin.net/
[5]: https://en.wikipedia.org/wiki/Web_scraping
[6]: https://askubuntu.com/questions/23009/why-crontab-scripts-are-not-working
[7]: https://pushover.net/
[8]: https://www.raspberrypi.org/
[9]: https://pi-hole.net/
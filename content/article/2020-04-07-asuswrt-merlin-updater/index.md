---
title: Asuswrt-Merlin Firmware Update Checker
url: /asuswrt-merlin-firmware-update-checker
date: 2020-04-06T06:22:21+01:00
summary: 
description: 
tags: [Networking, Scripting, NodeJS]
categories: [Tooling]
ogimage: 
draft: false
---

I have an Asus RT-AC-68U router at home. [I've previously used the build-in update checker together with a notification script][3] that ran on the router itself. Recently I noticed that I hadn't got any update notifications in a long time, one of downsides of silent failures. 

When I ran a manual check using the router's web interface, it just said: _"Temporarily unable to get the latest firmware information. Please try again later."_ It doesn't seem to be that temporary though.

## Building my own update checker

Since [the project website of Asuswrt-Merlin][4] presents the latest version in an easily parsable way, I decided to write my own checker using _[screen scraping][5]_ in NodeJS.

### Version checker

To find the latest version, I just looked at [the website][4], inspected the HTML, installed the packages `request-promise` and `cheerio`, and finally extracted the version number of interest.

{{<highlight javascript>}}
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
{{</highlight>}}

### Saving last checked version

In order to know if there is a new version since my last check, I of course need to keep track of what the version was the last time I checked. I did this with a simple text file on disk.

{{<highlight javascript>}}
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
{{</highlight>}}

### Notifier

I already had a working notification script using the service [Pushover][7] that I ported from Bash to NodeJS.

{{<highlight javascript>}}
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
{{</highlight>}}

### Gluing it together

{{<highlight javascript>}}
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
{{</highlight>}}

## Scheduling the update checker

Running once a week and notifying when nothing changed. Might get annoying...?


`crontab -e`

```
10 18 * * 3 /home/pi/router-update-check.sh >> /home/pi/router-update-check.log
```

[1]: https://crontab.guru/
[2]: https://github.com/henriksommerfeld/asuswrt-merlin-update-check
[3]: /firmware-update-notifications-for-my-asus-router
[4]: https://www.asuswrt-merlin.net/
[5]: https://en.wikipedia.org/wiki/Web_scraping
[6]: https://askubuntu.com/questions/23009/why-crontab-scripts-are-not-working
[7]: https://pushover.net/
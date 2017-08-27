---
title: "Switching from CrashPlan and other Backup Services"
date: 2017-08-26T14:53:58+02:00
categories: ["User perspective"]
tags: ["Backup","CrashPlan","OneDrive"]
draft: false
---

A week before my annual subscription of CrashPlan would expire I got an e-mail informing me that the [_CrashPlan for Home_ service was discontinued][1]. My subscription was extended by 60 days to give me enough time to find another service. I've used it for a couple of years and have been quite happy with it, except maybe for [the micro stuttering I experienced][2]. It had the possibility to back up to a local external drive as well as online (offsite) with plenty of configurable options.

## No Compelling Alternatives
Obviously CrashPlan found that the consumer market isn't an attractive business and having looked at the competing services, this seems to be a general truth. The generous storage offerings from Amazon, Google and Microsoft seems to be difficult to compete with. It turns out that most (well, _all_ I have found) true online backup services have some of these drawbacks:

* File size upload limitations
* Limited file versioning
* Bandwidth throttling
* Refusing to back up some file extensions
* Only allows backing up _one_ drive
* Prehistoric GUI
* Enterprise pricing
* Dishonest marketing

If you want to go for any online backup service, you really need to read through the fine print to find the limitations. I found Cloudwards' [Best Cloud Backup Services 2017][3] to be a good comparison of the different backup offerings available. 

## What are My Real Backup Needs?
The machine I'm looking for a backup solution for, is a traditional computer standing on the floor under my desk with a bunch of drives in it. Rethinking my needs, I realised that what I actually need are two things, a backup of most of my files to a local backup so I can restore fairly quick (1) and an archival solution for self-created content that is irreplaceable (2). The latter mostly consists of raw files from my camera.

## Chosen Solution
Since I already use OneDrive, I chose to extend that storage and move everything important into it. Unfortunately OneDrive doesn't allow files to be stored on different drives, so I uploaded my photos from previous years through the web interface and set them _not_ to sync locally. In addition to this I enabled _File History_ in Windows and made sure all important files were included (many more than I have in OneDrive). This way I can restore any file from my external drive quickly, and in case something really bad happens I will have to download them from OneDrive. This is good enough for me the and still adheres to [the 3-2-1 principal][4]. Everything I have in OneDrive I also have on my computer and on my external backup drive. Anything not in OneDrive I can live without, it will just be a bit time-consuming to reinstall and redownload some stuff.

_**Update 2017-08-27:** Having uploaded an additional 278 GB to OneDrive through the web interface I have to say it worked great, pretty much maxing out my 100 MBit/second upload connection. However, two files didn't upload and the tab I used to upload completely hang in Google Chrome, occupying 2.5 GB of RAM and 100% of one CPU core. Uploading those two files again (which were listed as errors) worked without problem._

[1]: https://www.crashplan.com/en-us/consumer/nextsteps/
[2]: /micro-stuttering-caused-by-crashplan/
[3]: https://www.cloudwards.net/award/best-online-backup-services/
[4]: https://www.hanselman.com/blog/TheComputerBackupRuleOfThree.aspx
+++
author = "admin"
categories = ["User prespective"]
date = "2017-03-20T06:50:51+00:00"
title = "Micro Stuttering Caused by CrashPlan"
type = "article"
url = "/micro-stuttering-caused-by-crashplan/"

+++

For some time I have tried to figure out what's been causing the micro stuttering I've experienced on my Windows 10 machine. Under moderate load applications have stopped responding for short periods of time, most obvious is audio playback where an unpleasant sound has interrupted playback. I could not see any correlation between this behaviour and a specific application, high CPU, disk or memory utilisation.

My machine is a desktop computer I have built myself from parts, so I thought I might have made some bad decision regarding hardware compatibility. It clearly wasn't a pure performance issue since it happened even during YouTube playback and the machine has NVMe storage, 64 GB of RAM, a 4 core CPU etc. I started to update all drivers, motherboard firmware etc, but without result.

{{<figure src="/images/task-manager.png" link="/images/task-manager.png" alt="Disk activity spikes in Windows Task Manager" caption="I had the problem even with less load, but it was easier to provoke the reaction with a higher load">}}

Then I noticed an interesting behaviour. There were spikes in disk activity even on drives that shouldn't be doing anything at the moment. My _Disk 5 (E:)_ is a USB connected drive that I wasn't reading or writing to at the moment. Sure, it could be anti-virus scanning or similar, but I noticed that the process for my backup software _CrashPlan_ was fairly active. So I stopped that program, and voilà – problem gone!

It turned out that I had CrashPlan set to run backup continuously, _Always_. Changing it to _Between specified times_ solved it for me. An interesting observation is that CrashPlan isn't configured to use _Disk 5 (E:)_ in any way, but that's still what caused the spikes in disk usage.

{{<figure src="/images/crashplan-microlag-on-off.png" link="/images/crashplan-microlag-on-off.png" alt="CrashPlan microlag on off">}}

{{<figure src="/images/crashplan-general-settings.png" link="/images/crashplan-general-settings.png" alt="CrashPlan General Settings">}}

Changing other settings, such as _User is away when not active for_ [15 minutes] and _When user is present, use up to_ [0 percent CPU] did not help either. So finally my machine is running as smooth as it should and I will hopefully remember this setting if I have to reinstall the machine at some point, and so do you, if you happen to run in to this very specific problem.
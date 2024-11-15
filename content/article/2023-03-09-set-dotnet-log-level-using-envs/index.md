---
title: Setting Dotnet Log Level Using Environment Variables
url: /set-dotnet-log-level-using-envs
date: 2023-03-09T21:15:00+01:00
description: "This is an example of how the log levels can be set granularly using envs"
summary: "After migrating a bunch of old Dotnet applications from Azure Web Apps on Windows to Docker containers on Linux, I found that the logs were flooded by Information messages from Dotnet itself."
tags: [Logging, Dotnet]
categories: [Coding]
ogimage: screenshot_20230309_222204.png
draft: false
---

After migrating a bunch of old [Dotnet][1] applications from [Azure Web Apps][2] on Windows to [Docker][3] containers on Linux,
I found that the logs were flooded by _Information_ messages from Dotnet itself. Instead of fiddling with JSON files, you can 
[set the log level using environment variables][4]. I guess it's a matter of preference, but I don't see a value of having
this tracked by version control and setting environment variables and reloading a service's containers, is very straight 
forward in our own infrastructure at work.

So, this is an example of how the log levels can be set granularly using envs.

```
LOGGING__LOGLEVEL__DEFAULT=Information
LOGGING__LOGLEVEL__MICROSOFT=Warning
LOGGING__LOGLEVEL__MICROSOFT.ASPNETCORE.DATAPROTECTION=Error
```
It looks a bit strange with dots in the variable names, but it works.

**Update 2024-09-19**: In a service I looked at recently, I found that the above did not help.
It turned out that the project used a package that had its own logging using
Serilog. To turn the volume down for that logging, I set:

```
SERILOG__MINIMUMLEVEL__DEFAULT=Error
```

[1]: https://dot.net/
[2]: https://azure.microsoft.com/en-gb/products/app-service/web
[3]: https://www.docker.com/
[4]: https://learn.microsoft.com/en-gb/dotnet/core/extensions/logging?tabs=bash#set-log-level-by-command-line-environment-variables-and-other-configuration

+++
author = "admin"
bfa_virtual_template = ["hierarchy"]
categories = ["Tooling"]
date = "2012-12-10T21:09:15+00:00"
tags = ["Backup","Gmail","GMVault","macOS","Scripting"]
title = "Automatically Backup your Gmail account on a schedule with GMVault and Mac OS X launchd"
type = "article"
url = "/automatically-backup-your-gmail-account-on-a-schedule-with-gmvault-and-mac-os-x-launchd/"

+++

While looking over my backup routines, I stumbled on Scott Hanselman's post [Automatically Backup your Gmail account on a schedule with GMVault and Windows Task Scheduler][1]. I had never really thought about backing up my Gmail account, but why not. Even though I'm mainly a Windows guy, my Windows 8 machine at home is a big tower that requires quite a lot of electricity and is therefore only powered on when needed. My Mac Mini on the other hand is constantly on acting as a server, so why not run GMVault from there?

My experience with configuring Mac OS X is limited, but I have gained enough knowledge to know that there is something called _launchd_ that is the Mac replacement for _init_ and _crontab_ on other POSIX systems. So, here is one way to configure GMVault to run as a "scheduled task" on Mac OS X Mountain Lion (10.8.2). My local user account is _henrik_, so that's what I'll use in this example.

1. Download [GMVault][2] and put the files anywhere you like, I choose `/opt/local`.
2. Run `gmvault sync youremail@gmail.com` from the shell and wait for as long as it takes. Use the `-d` option if you don't want the backup at `~/gmvault-db`.
3. Create a small script that runs the GMVault command and does some logging (so you can see if it actually works) 

{{<highlight bash "hl_lines=6">}}
#!/bin/bash

logger "Starting gmvault at $(date)"
echo "Running gmvault at $(date)" > /Users/henrik/backup-gmail.log

/opt/local/bin/gmvault sync -t quick youremail@gmail.com >> /Users/henrik/backup-gmail.log

logger "Finished gmvault at $(date)"
{{</highlight>}}
    
Apparently I had to use absolute paths here. The logging is of course optional, but handy. If only it was this simple to write to the Windows logs with PowerShell! I chose to write the output from GMVault to a separate log file after I first made an error (not having absolute paths) in the script and the logging just informed me that GMVault finished in 0 seconds. Run the script once to verify that it works as expected.

4. I chose a GUI approach and used Lingon to create the agent, but you could just as well use your favourite text editor to create the plist file, this is listed below. Create the agent running as your user, it is necessary for the OAuth authentication to work. Make sure to use a unique name, I chose _se.henrikpalm.gmailBackup_, and use the full path to the script. To test this, it can be good to choose a time for the agent to run that is a few minutes in the future.

    {{<post-image image="Lingon-Basic-GmailBackup.png" alt="Configure Gmail backup script with Lingon" borderless="true" />}}
  
    The result of the GUI approach above is a file located at `~/Library/LaunchAgents/se.henrikpalm.gmailBackup.plist`, containing the following:
	{{<highlight xml>}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>Label</key>
        <string>se.henrikpalm.gmailBackup</string>
        <key>ProgramArguments</key>
        <array>
            <string>/Users/henrik/backup-gmail.sh</string>
        </array>
        <key>RunAtLoad</key>
        <false/>
        <key>StartCalendarInterval</key>
        <dict>
            <key>Hour</key>
            <integer>13</integer>
            <key>Minute</key>
            <integer>0</integer>
        </dict>
        <key>StartOnMount</key>
        <false/>
    </dict>
</plist>
{{</highlight>}}

5. Start the agent.	
```
launchctl load ~/Library/LaunchAgents/se.henrikpalm.gmailBackup.plist
```

	Any configuration change in the agent requires it to be reloaded.
```
launchctl unload ~/Library/LaunchAgents/se.henrikpalm.gmailBackup.plist; launchctl load ~/Library/LaunchAgents/se.henrikpalm.gmailBackup.plist
```

6. Check the logs.
```
tail -F -n 20 /var/log/system.log | grep gmvault
```

	When the agent runs you should see something like this:
```
Dec 5 13:00:03 Mini.local henrik[93574]: Starting gmvault at Wed Dec 5 13:00:03 CET 2012
Dec 5 13:00:24 Mini.local henrik[93589]: Finished gmvault at Wed Dec 5 13:00:24 CET 2012
```

7. Done! Time Machine will now take care of backing up the local backup 😃

 [1]: http://www.hanselman.com/blog/AutomaticallyBackupYourGmailAccountOnAScheduleWithGMVaultAndWindowsTaskScheduler.aspx
 [2]: http://gmvault.org/
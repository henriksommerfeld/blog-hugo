+++
author = "admin"
bfa_virtual_template = ["hierarchy"]
categories = ["Administration"]
date = "2012-12-17T19:57:04+00:00"
tags = ["Internet Information Server","PowerShell","Scripting","SharePoint","Warm-up","Windows Server"]
title = "Setting up an IIS Warm-up Script in an automated fashion"
type = "article"
url = "/setting-up-an-iis-warm-up-script-in-an-automated-fashion/"

+++

Automatic recycling of application pools in IIS may be necessary, but it can annoy the users how happen to be up at night or early in the morning (depending on when the recycles are scheduled). There are numerous warm-up scripts out there and I have just stolen one of them. The purpose of this post is to show you how I set it up to run automatically when the application pools are recycled. The end result is to set it up by executing the following PowerShell command (example from production):

```
. .\ScheduleWarmup.ps1 PROD
```

The application I'm maintaining is on the Internet and uses SharePoint 2010. Configuration is automated with a bunch of scripts and I have therefore extended our existing "script infrastructure" with this warm-up script, thus this may seem somewhat overkill for your needs. In the _Post-SharePoint-Installation-Scripts_ folder we have one folder that holds the environment specific settings and one folder for general helper scripts as shown below.

{{<figure src="/images/ScheduleWarmup_WindowsExplorer.png" alt="Windows Explorer showing Schedule Warmup Scripts">}}

I have cleaned up these folders from the scripts aren't relevant for this blog post, but what they have in common is that they load the `LoadDependencies.ps1` file that loads the needed helper scripts and settings for the current environment (like dev, test, prod). The help script I have kept in the _Helpers_ folder is the `Security.ps1` from the [Carbon][1] package to check for administrative permissions.

## The Warm-up Script

I have borrowed the actual warm-up script from Jon Badgett's post [Easy SharePoint 2010 warmup Script using PowerShell][2], but since my site allows anonymous access and the web servers are exposed to the Internet I prefer not to use `Get-SPAlternateUrl` to find out which application pools to hit, because it requires the script to be run by a high privileged account. I'll hard-code the URLs in the settings files instead. So here is my `Warmup.ps1`:

{{<highlight powershell>}}
function Get-WebPage([string]$url) {
	$wc = new-object net.webclient;	
	$wc.credentials = [System.Net.CredentialCache]::DefaultCredentials;
	$pageContents = $wc.DownloadString($url);
	$wc.Dispose();
	return $pageContents;
}

foreach ($url in $input) {	
	"Warming up '{0}'..." -F $url;
	$html = Get-WebPage -url $url;
}
{{</highlight>}}

## Settings and Infrastructure

Examples of the settings files look like the following. Having the account that will run the scheduled task in the environment specific files enables you to have different accounts for each environment if your site requires authentication. All the environment specific variables have the _Env_ prefix as a naming convention in our scripts to avoid confusion where they are used. The file path to the warm-up script is where you want that script to be when the job is set up, so you can delete the supporting scripts folder later if you want to.

{{<highlight powershell>}}
Write-Host "Setting Prod environment Properties"
$EnvWarmupUrls = @("http://ourgreatservice.ourcompany.com/Pages/default.aspx", 
                   "http://ourgreatservice-edit.ourcompany.com/Pages/default.aspx")
$EnvWarmupJobAccount = "NT AUTHORITYNETWORKSERVICE"
$EnvWarmupScriptPath = "C:Scheduled scriptsWarmup.ps1"
{{</highlight>}}

{{<highlight powershell>}}
Write-Host "Setting Dev environment Properties"
$EnvWarmupUrls = @("http://ourgreatservicedev.ourcompany.com/Pages/default.aspx", 
                   "http://ourgreatservicedev-edit.ourcompany.com/Pages/default.aspx")
$EnvWarmupJobAccount = "NT AUTHORITYNETWORKSERVICE"
$EnvWarmupScriptPath = "C:TFS{0}MainScriptsPost-SharePoint-InstallationWarmup.ps1" -F [Environment]::UserName
{{</highlight>}}

I'll include the `LoadDependencies.ps1` here for reference as well:

{{<highlight powershell>}}
$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$HelperScriptsPath = $ScriptPath + "Helpers"

Clear-Host

# Check arguments, otherwise report argument error ----------------------------
if (!($args.count -eq 1)) 
{
   Write-Host -foregroundcolor red "Must specify environment : dev|inttest|at|prod "
   Write-Host 
   return $false
}
else
{
    $targetEnv = $args[0]
	if (!($targetEnv -eq "dev" -or $targetEnv -eq "inttest" -or $targetEnv -eq "at" -or $targetEnv -eq "prod") )
	{
	   Write-Host -foregroundcolor red "Invalid argument for environment:" $targetEnv
	   Write-Host -foregroundcolor red "Possible values: dev|inttest|at|prod" 
	   Write-Host 
	   return $false
	}
	$tmpPath = $ScriptPath + "SettingsSettings_" + $targetEnv + ".ps1"
    if (!(Test-Path $tmpPath))
    {
	   Write-Host -foregroundcolor red "Specified settings file '$tmpPath' does not exists."
	   Write-Host 
       return $false
    }

	$SettingsFilepath = $tmpPath
    Write-Host -foregroundcolor yellow "# Retrieving local settings from" $SettingsFilepath
	. $SettingsFilepath
}
# -----------------------------------------------------------------------------

# Assert Admin Privileges -----------------------------------------------------
$helperSecurityScript = $HelperScriptsPath + "Security.ps1"
if (!(Test-Path $helperSecurityScript))
{
	Write-Host "Specified file '$helperSecurityScript' does not exists." -ForegroundColor Red
	Write-Host 
    return $false
}

Import-Module $helperSecurityScript

if(-not (Test-AdminPrivileges))
{
    Write-Host "You are not currently running with administrative privileges.  Please re-start PowerShell as an administrator." -ForegroundColor Red
	Write-Host
    return $false;
}
# -----------------------------------------------------------------------------

return $true
{{</highlight>}}

## Setting up the Scheduled Task

You can create [scheduled tasks with PowerShell 3][3], but only periodically ones (at least to my understanding). I prefer [the approach described by Christopher Maish][4] &#8211; monitoring the event log for application pool recycles to trigger our `Warmup.ps1` script. That got me to choose the `SCHTASKS.EXE` instead. There are some extra work done here explained in the comments to make the script more fault-tolerant. Here's `ScheduleWarmup.ps1`:

{{<highlight powershell>}}
$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$dependenciesLoaded = . $ScriptPathLoadDependencies.ps1 $args
if (!$dependenciesLoaded) { exit; }

if (!(Test-Path $EnvWarmupScriptPath))
{
	Write-Host -ForegroundColor Red "Specified file '$EnvWarmupScriptPath' does not exist."
	exit
}

try {
	# Since the argument passed to SCHTASKS /TR (our $command variable) 
	# suffers from Windows file path length limitation, we'll save the URLs we 
	# want to hit in a text file and load them from there.
	$warmUpScriptFolder = Split-Path -Parent $EnvWarmupScriptPath
	$urlsFile = "{0}URLsToWarmUp.txt" -F $warmUpScriptFolder
	$EnvWarmupUrls &gt; $urlsFile

	# To support file paths with spaces and such and at the same time avoid the need of getting 
	# a PHD in escape characters, we'll compose a PowerShell script file on the fly that can be executed 
	# as a scheduled task without parameters.
	$composedScriptFile = "{0}WarmUpComposed.ps1" -F $warmUpScriptFolder
	$composedScriptFileContent = "Get-Content '{0}' | . '{1}'" -F $urlsFile, $EnvWarmupScriptPath
	$composedScriptFileContent &gt; $composedScriptFile

	$command = "powershell -NoLogo -NonInteractive -WindowStyle Hidden -File '{0}'" -F $composedScriptFile
	$trigger = "*[System[Provider[@Name='Microsoft-Windows-WAS'] and ((EventID &gt;= 5074 and EventID &lt;= 5081) or EventID=5117 or EventID=5186)]]"
	$jobName = "Our Great Service IIS Warmup"
}
catch { throw; }

"Deleting previously existing job named '{0}'..." -F $jobName
SCHTASKS /Delete /TN $jobName /F

"Creating job named '{0}'..." -F $jobName
SCHTASKS /Create /TN $jobName /RU $EnvWarmupJobAccount /RP /TR $command /SC ONEVENT /EC System /MO $trigger
{{</highlight>}}

The trigger doesn't look for `IISRESET` and doesn't look for a specific application pool, so feel free to add that to your script. Now we can copy this folder structure (in the screenshot above) to any of our web servers and easily keep the sites warm (it's snowing outside my window), even our dev environment if we want to.

{{<figure src="/images/ScheduleWarmup_console.png" link="/images/ScheduleWarmup_console.png" alt="Console executing schedule warm-up script">}}

Now you should have a job scheduled in _Task Scheduler_ that you can try by recycling an application pool manually in IIS. Make sure you wait for the job to finish before you call it a failure, the history tab in Task Scheduler says _Action Completed_ when it's done. All scripts used in this post can be downloaded as a ZIP file here: [ScheduledWarmupScript_1.zip][5]

 [1]: https://bitbucket.org/splatteredbits/carbon/downloads
 [2]: http://www.jonthenerd.com/2011/04/19/easy-sharepoint-2010-warmup-script-using-powershell/
 [3]: http://blogs.msdn.com/b/powershell/archive/2012/03/19/scheduling-background-jobs-in-windows-powershell-3-0.aspx
 [4]: http://www.christophermaish.com/blog/keeping-iis-application-pools-warm-for-low-bandwidth-sites/
 [5]: /files/ScheduledWarmupScript_1.zip
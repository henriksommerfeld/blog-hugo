+++
author = "admin"
bfa_virtual_template = ["hierarchy"]
categories = ["Tooling"]
date = "2015-03-01T09:32:04+00:00"
tags = ["Mac OS X","Networking","PowerShell","Proxy","Scripting"]
title = "Bypassing a Corporate Proxy"
type = "article"
url = "/bypassing-a-corporate-proxy/"

+++

Quite a few organisations seems to find this thing called &#8220;Internet&#8221; a scary thing that employees can only be given access to by grace of the mighty network administrators. As a consultant I have worked for a few of those organisations and felt the frustration when a blog is blocked or network traffic is so slow that you'd guess that it's manually monitored before accepted. I would personally never try to bypass these controls of course, but hypothetically one could do like the following.

You would need a proxy of your own somewhere on the internet that you can access from the corporate network to act as a relay to the free unrestricted internet. It could be a virtual machine running in a cloud service, or a computer you have at home. For this post I'm going to assume a Mac Mini at home running Tinyproxy.

### Setting up your relay

For installing applications apart from those in App Store I prefer [Homebrew][1].
  
{{<highlight sh>}}
brew install tinyproxy
{{</highlight>}}
  
Since I want this service to run at all times independent of which user is logged in, a .plist file should be added to the `/Library/LaunchAgents` folder. This could be done with `brew services`, but for some reason that didn't work for me. Running `sudo brew services start tinyproxy` just created an empty file for me, `/Library/LaunchDaemons/homebrew.mxcl.tinyproxy.plist`. So I added the contents myself, ending up with this:

{{<highlight xml>}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC -//Apple Computer//DTD PLIST 1.0//EN http://www.apple.com/DTDs/PropertyList-1.0.dtd>
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>homebrew.mxcl.tinyproxy.plist</string>
  <key>ProgramArguments</key>
  <array>
       <string>/usr/local/opt/tinyproxy/sbin/tinyproxy</string>
       <string>-c</string>
       <string>/usr/local/opt/tinyproxy/etc/tinyproxy.conf</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
{{</highlight>}}

I leave the config file for tinyproxy pretty much untouched, running at port 8888. I connect to it locally to verify that it's running, `telnet 127.0.0.1 8888`.

I also need an SSH server running on the machine to connect to from the outside and port forwarding set up in my router. This can be a bit of trial and error to find out through witch ports you can access your home server from the corporate network, port 80 (HTTP) and 443 (HTTPS) will often work. In my case it didn't, but I found that on port 23 (telnet) I was able to reach my home server, so I set it up in my router like this (192.168.1.123 is my Mac Mini's IP address on the home network):

{{<post-image image="dd-wrt-port-forwarding.png" alt="Port forwarding" borderless="true" />}}

### Connecting to the relay from the corporate computer

The corporate machine provided to me is a Windows 7 machine in this case, where I start by installing [Tunnelier][2] (which also exists in a portable version, if you’re not a local admin). I start by setting up the tunnel to my Mac Mini at home by connecting to its dynamic DNS name on the port I forwarded in my router.

{{<post-image image="Tunnelier-login.png" alt="Tunnelier login" borderless="true" />}}

To be able to get outside the corporate network I have to use their proxy, so I enter the same proxy settings I find in Internet Explorer in Tunnelier as well:

{{<post-image image="Tunnelier-Proxy-Settings.png" alt="Tunnelier proxy settings" borderless="true" />}}

To access Tinyproxy I need to set up some local port forwarding under the client-to-server tab. The destination port should be the one where tinyproxy is listening locally on my Mac Mini, in this case 8888. I also have a VNC server on port 5900 in this screenshot so I can connect graphically to my Mini. The local ports on the Windows 7 machine can be any that is not used already by another service, I chose 1053.

{{<post-image image="Tunnelier-C2S.png" alt="Tunnelier Client to Server" borderless="true" />}}

In Internet Explorer (which is really Windows global proxy settings) I enter 127.0.0.1 on port 1053 as my new proxy.

{{<post-image image="IE-LAN-settings.png" alt="IE-LAN-settings" borderless="true" />}}

Since I must be able to access internal corporate network resources I cannot route all traffic through my home server, so I add exceptions for the corporate domain and IP address range (123.4.* in this screenshot).

{{<post-image image="IE-proxy-settings.png" alt="IE proxy settings" borderless="true" />}}

One last thing I could do to make things quicker is to create scripts for turning the proxy settings on and off. If you need to connect to a WiFi in a hotel or on a train where the network is open but requires you to visit a web page to enter some login information, the proxy must be turned off to access that web page. I put these scripts on the desktop so I can right-click them and choose "Run with PowerShell".

### home-server.ps1

{{<highlight powershell>}}
$ProxyServer = "127.0.0.1"
$ProxyPort     = "1053"
$Path   = "HKCU:SoftwareMicrosoftWindowsCurrentVersionInternet Settings"
$Proxy = $ProxyServer + ":" + $ProxyPort
$Exceptions = "<-loopback>;*.company.com;123.4.*"
 
# Enable an explicit proxy

Set-ItemProperty -Path $path -Name ProxyEnable -Value 1
Set-ItemProperty -Path $path -Name ProxyServer -Value $Proxy
Set-ItemProperty -Path $path -Name ProxyOverride -Value $Exceptions
{{</highlight>}}

### no-proxy.ps1

{{<highlight powershell>}}
$Path   = "HKCU:SoftwareMicrosoftWindowsCurrentVersionInternet Settings"
 
# Disable an explicit proxy
Set-ItemProperty -Path $path -Name ProxyEnable -Value 0
{{</highlight>}}

A final word of warning is that this will of course be against the corporate IT policy, that’s why I would never do this in real life.

[1]: http://brew.sh/
[2]: http://www.bitvise.com/ssh-client
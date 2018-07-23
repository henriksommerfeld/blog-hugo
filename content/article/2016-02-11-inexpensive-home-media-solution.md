+++
author = "admin"
categories = ["Tooling","Thoughts"]
date = "2016-02-11T21:26:01+00:00"
tags = ["Chromecast","Hardware","Infuse"]
title = "Inexpensive Home Media Solution"
type = "article"
url = "/inexpensive-home-media-solution/"

+++

As my Mac Mini from 2010 has gotten slower and slower I've been thinking about a replacement for it as the HTPC (Home Theatre Personal Computer) I've been using it for. I was running Plex (both server and client) on it connected to a &#8220;dumb TV&#8221; and I've been fully happy with that. So, when I draw the conclusion that the old computer didn't cut it any more, I had a few different options. The needs I wanted to meet were:

  * Easy way to watch streaming video such as Netflix, HBO and SVT Play (Swedish Public Service TV)
  * Host local video and play it on the TV

## Playing video from streaming services

For this I bought the [Chromecast][1] that is connected to the TV (or actually to the sound system that in turn is connected to the TV). Then it's easy to cast from any of the streaming apps that supports Google Cast.

<figure class="image-border">
  <img src="../images/21867299155_84354a3d5e_k-1024x683.jpg" alt="Hejsan">
    <figcaption>
      <p>Photo by TechStage <a href="https://www.flickr.com/photos/bestboyzde/21867299155/in/photostream/">published on Flickr</a> under <a href="https://creativecommons.org/licenses/by-nd/2.0/">CC license</a></p> 
    </figcaption>    
</figure>

## Local hosting of video

Since I live in an apartment which doesn't fit a large or noisy NAS or other server, I ended up using the media server feature of my router (Asus RT-AC68U) and connected a USB powered 2.5&#8243; HDD to it. I can access the disk via DLNA and SMB &#8211; I guess most modern routers have a similar feature. So for uploading or watching stuff from my computer I just access the files through `\\192.168.1.1` in Windows as I would have with any other NAS.

## Playing video on phone and dumb TV

To play the video files on the TV I go through the phone using the [Infuse][4] app (only on iOS unfortunately). Infuse supports both Google Cast and AirPlay, so from there it's just a matter of casting to Chromecast in the same way I do from Netflix or any other of the streaming apps. Of course I can just watch it directly on the phone if I would prefer that.

## Non-technical spouse perspective

This works surprisingly well and it was an easy transition for my wife who's already gotten used to casting from the different apps on her phone. From a &#8220;non-technical spouse perspective&#8221; Infuse is just like Netflix, but for home videos. The only thing I needed to do was to create bookmarks in the Infuse app to the relevant folders, since the media server feature on the router shows a maze of empty non-removable folders that makes it quite hard to find what you are looking for.

## Things I had to buy

In contrast to my initial fear of having to buy a new computer or &#8220;smart&#8221; TV, this was quite inexpensive. The most expensive thing I bought was a new USB hard drive. I could probably have used the old one I had connected to my Mac Mini, but I suspected it was going to die soon (after many years of great service). In total I ended up buying:

* Chromecast
* Infuse app
* USB HDD (could have used the old one)

## Update

I have now also added [Videostream for Chromecast][5] to this mix for playing video files that Infuse doesn't support. I especially like how Videostream registers in the operating system so that you can search for _&#8220;video&#8221;_ to find it (using <i class="fa fa-fw"></i> or ⌘ + space) (as opposed to starting Chrome and look for the extension).

 [1]: https://www.google.com/chrome/devices/chromecast/
 [2]: https://www.flickr.com/photos/bestboyzde/21867299155/in/photostream/
 [3]: https://creativecommons.org/licenses/by-nd/2.0/
 [4]: http://firecore.com/infuse
 [5]: http://getvideostream.com
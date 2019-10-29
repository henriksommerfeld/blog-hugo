+++
author = "admin"
categories = ["Coding"]
date = "2016-10-13T17:00:14+00:00"
tags = ["Arduino","Hardware","Internet of Things"]
title = "My IoT Exploration – Part 1 – The Failure"
type = "article"
url = "/my-iot-exploration-part-1-the-failure/"

+++

Last Christmas I got an [Arduino][1] starter kit for present. It took me a long time to finally open the box and have an idea about what I should do with it. What I've found challenging about learning new stuff that I don't have an immediate use for, is the lack of a clear goal. Making an LED blink isn't all that exiting in my mind and even though I like the projects in the starter kit, I didn't do them until I had a project of my own figured out.

## My first project idea

The idea I got was to make a monitoring system for our aquarium at home. I defined the goal something like this:

> Measure values with sensors and upload it to a hosted service. Then show it as a graph on a web page.

I found the [Open Aquarium product package][2] and figured that it should be possible to get some interesting characteristics of the water quality. Temperature was a fine start, but it would be more cool and useful if I could get a pH reading as well. I found there was a kit for that too, the [Open Aquarium Aquaponics][3].

[The guide on the Cooking Hacks web site][4] is aiming for a fully automated fish tank. That was never my goal, as stated above. The guide also covers how to get the data to a web server and visualising it that way, but after a quick reading I found that this &#8220;solution&#8221; was rather silly. It includes setting up a PHP site that receives data through GET requests and puts it directly into a database. I wanted something cloud hosted that I could access without running a web server at home accessible from the outside.

After seeing the limited support for sending data directly from the Arduino to the outside in a secure way, I figured that I could probably send it to a more powerful device first, then upload it to the cloud. Passing serial data between devices was however, not an appealing option. I would basically have to come up with my own protocol to determine the start and end of a _&#8220;message&#8221;_ and so on. Ideally the box with the Arduino would be easy to stuff away, without too many cables or a computer near the tank. So I got a Wi-Fi module as well.

## The failure

After doing the projects in the Arduino starter kit, to get some familiarity with the basics, I got the products mentioned previously and started out.

The first insight was, that reading values of sensors is hard. Even though there are nice code libraries that does the job, there are other challenges. Reading temperature is fine, but other sensors such as pH, need to be calibrated and the values I got from this consumer-quality product was varying so much that I wouldn't be able to draw any conclusions from it. Then my wife, head of the aquarium, came home.

> &#8211; Wife: What's that?<br>
  &#8211; Me: A pH sensor for the aquarium<br>
  &#8211; Wife: It's huge — not in my aquarium!

One of the main purposes of our aquarium is aesthetics. After looking at the image in [the Open Aquarium guide][4] again, I smiled and saw a clear problem. _(In case the page or image is removed later, it's a fish tank polluted with sensors, cables, feeder, heater, cooling fan etc.)_ You would need a really big aquarium to have room for fish and plants after putting in all those gadgets.

The second problem was the Wi-Fi module I had. I was able to connect it to my home Wi-Fi by sending commands directly to it from my laptop, but to have it connect automatically was harder. There was not even a function in the Wi-Fi library for detecting connectivity, you would need to put in the delays of the right length between commands and hope that the connection was successful. I found [a forum thread][5] by someone who eventually got it working, but the hassle, including attaching and detaching the shields for every small adjustment to the code, just didn't make sense to me. At this point, I gave up and had to call it a failure.

{{<post-image image="arduino-3-1024x684.jpg" alt="Arduino with Wi-Fi module">}}
Arduino with Wi-Fi module
{{</post-image>}}

## Changing approach

After a while I realised that I had learned something, so maybe it wasn't a failure after all. I started to look into the Raspberry Pi and if I could re-define the project. The entire idea of monitoring the aquarium with all its inherited challenges (combining electronics and water for example), seemed bad. The usefulness wasn't there, we had the aquarium running stable for a long time already and involving that wasn't necessary for achieving the goal I had defined. So I decided to monitor temperature (and maybe some other stuff) in my home office instead. More about this later in an upcoming post ([My IoT Exploration – Part 2 – Raspberry Pi Sense HAT][6]).

 [1]: https://www.arduino.cc/
 [2]: https://www.cooking-hacks.com/open-aquarium-basic
 [3]: https://www.cooking-hacks.com/open-aquarium-aquaponics
 [4]: https://www.cooking-hacks.com/documentation/tutorials/open-aquarium-aquaponics-fish-tank-monitoring-arduino/
 [5]: https://www.cooking-hacks.com/forum/viewtopic.php?f=29&t=8576
 [6]: /my-iot-exploration-part-2-raspberry-pi-sense-hat/
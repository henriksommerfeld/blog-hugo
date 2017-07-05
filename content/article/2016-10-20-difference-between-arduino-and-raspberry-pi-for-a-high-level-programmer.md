+++
author = "admin"
categories = ["Coding"]
date = "2016-10-20T16:17:44+00:00"
tags = ["Arduino","Hardware","Raspberry Pi"]
title = "Difference between Arduino and Raspberry Pi for a High-Level Programmer"
type = "article"
url = "/difference-between-arduino-and-raspberry-pi-for-a-high-level-programmer/"

+++

Before I got an Arduino for Christmas I hadn't heard about it. I had heard about Raspberry Pi though, and I was told that it was roughly the same thing.

It's true that the two devices have some common characteristics, but to me the differences are fundamental. As someone who does high-level programming for a living, I am appealed by the idea of being able to read values from analogue sensors in my code, and the plethora of sensors available for the Arduino is impressive. I do however, want to do as little of that electronics and low-level coding as possible, so that I can get on to the interesting stuff — the applications that use that data in some way.

I should say that I'm not entirely scared of electronics. I had a summer job during my time at the university where I mounted vehicle computers for [Combat Vehicle 90][1], which included soldering, attaching circuits and loading the software and so on. But at that time I had instructions (though often quite bad) to follow and colleagues to ask.

Computers on the other hand, are something I've been playing with for most of my life. Since I've had home servers with FreeBSD, GNU/Linux, Mac OS X and Windows, that's familiar territory.

My conclusion is that using sensors is hard. They need to be accurate enough and many of them requires calibration, sometimes repeated calibrations every x unit of time. To do proper calibration of a pH sensor for example, you need liquids with different known pH values that you can match to the sensor's values you get from the code library. For gas sensors this will be even more cumbersome.

Also, many of the sensors I found when I started looking, are not intended for more than experimentation, i.e. connecting it to a breadboard with a mess of wires to connect it to the Arduino. Of course this is fine for when you are actually trying it out, but I had the goal of doing something "real" — something more rugged, without having custom circuits manufactured for me.

<figure class="image-border">    
    <img src="/images/6325347372_07f1d6846f_b.jpg">
    <figcaption>
        <h4>Messy Arduino setup</h4>
        <p>Photo by Gaël Chardon, <a href="https://www.flickr.com/photos/gael/6325347372/">published on Flickr</a> under <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC license</a></p>
    </figcaption>    
</figure>

So, short version:

> Arduino is a micro controller that you load a program on to. Raspberry Pi is a computer with a full operating system.

I guess the key is to have a good way of sending data between the two, so that you can use them both together. I found this to be a good comparison:

<http://www.digitaltrends.com/computing/arduino-vs-raspberry-pi/>

 [1]: https://en.wikipedia.org/wiki/Combat_Vehicle_90
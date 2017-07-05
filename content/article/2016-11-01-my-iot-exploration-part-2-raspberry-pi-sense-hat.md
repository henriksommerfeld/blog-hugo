+++
author = "admin"
categories = ["Coding"]
date = "2016-11-01T05:38:21+00:00"
tags = ["Hardware","Internet of Things","Raspberry Pi"]
title = "My IoT Exploration – Part 2 – Raspberry Pi Sense HAT"
type = "article"
url = "/my-iot-exploration-part-2-raspberry-pi-sense-hat/"

+++

Continuing my _Internet of Things_ journey from my earlier post [My IoT Exploration – Part 1 – The Failure][1], I got a Raspberry Pi with a _[Sense HAT][2]_. The Sense HAT has all the features I need, integrated in one shield: temperature, humidity and barometric pressure and a LED as a bonus. Given my goal that I wanted to push the data to a hosted service, I now had a much better foundation for succeeding with that. This post is about the first step – reading the sensors and some design decisions.

{{<figure src="/images/Sense-hat.jpg" class="image-border" alt="Raspberry Pi with Sense HAT" caption="Raspberry Pi with Sense HAT">}}

## Design decisions

I learned that Python is the preferred language for the Raspberry Pi and that the Sense HAT had a Python library, so I decided to stick with that (including the [NOOBS][3] Linux distribution). However, since I had no previous experience with Python and it is a whitespace significant language (which felt awkward to me), I decided to limit the Python code to the Sense HAT specific stuff. For the rest I will use NodeJS.

_I later found out that there is a [Windows IoT class library in C# for Sense HAT][4], so if that's more appealing to you, you could use Windows and C# instead. [Getting Started with Windows 10 IoT][5] could be a good start._ 

{{<figure src="/images/rpi_monitoring_components.png" link="/images/rpi_monitoring_components.png" alt="Sensor reading with Raspberry Pi" class="image-border limit-width">}}

## Installing stuff on the Pi

Before I can dive into the code I need to install some stuff on the Raspberry Pi.

### Install Sense HAT library

```
sudo apt-get update 
sudo apt-get install sense-hat
sudo reboot
```

### Developing and deploying

I don't have the Raspberry Pi connected to a screen, so I'll also install Samba (`sudo apt-get install samba samba-common-bin`), this is just a convenience thing for copying files. It also lets me edit the Python code directly from my Windows machine. Since this is all bound to one piece of physical hardware, I will not be setting up a sophisticated deployment procedure or anything similar, an SSH shell and some file copying will do.

## My first ever Python program

The Python program reads values from the sensors, shows a status message on the LED and sends it on to another service on localhost using HTTP POST (which will be covered in a future post). Since all of this is done on the same machine with no listening services against the Internet, I haven't bothered much with security. Conceptually the NodeJS piece could be on a separate machine, but that would of course require an authentication mechanism etc. The source code can be found in it's entirety at <i class="fa fa-github fa-2x"></i> <https://github.com/henriksommerfeld/rpi-monitoring>.

### Reading temperature

As I discussed in the previous post [Difference between Arduino and Raspberry Pi for a High-Level Programmer][7], reading sensors can be tricky. The Sense HAT has a design flaw when it comes to the temperature sensor – it's close to the CPU. It's also a noticeable difference if you use a case or not, so you have to fiddle a bit with the values until they make sense. Some googling led me to this formula (can't remember where, sorry). It reads the temperature from the pressure sensor which is further away from the CPU and subtracts the CPU temperature:

{{<highlight python>}}
def get_cpu_temperature():  
	full_temperature_string = os.popen('vcgencmd measure_temp').readline()  
	tempterature_string = (full_temperature_string.replace("temp=","").replace("'C\n",""))
	return (float(tempterature_string))

def get_ambient_temperature():
	cpu_temp = get_cpu_temperature()
	temperature_from_sensor = sense.get_temperature_from_pressure()
	ambient_temp = temperature_from_sensor - ((cpu_temp - temperature_from_sensor)/ 1.5)
	return ambient_temp

temperature = get_ambient_temperature()
{{</highlight>}}

### The LED

I'm using the LED as a basic status display, like this:

{{<figure src="/images/led_error.png" caption="Error. Things are not working." alt="LED Error" class="limit-width-200">}}

{{<figure src="/images/led_warning.png" caption="Warning. Reading sensors is working, Python program is not able to send data to NodeJS program." alt="LED Warning" class="limit-width-200">}}

{{<figure src="/images/led_ok.png" caption="OK. Everything is working fine." alt="LED OK" class="limit-width-200">}}

One more thing about the LED is worth mentioning. I found it helpful to clear the LED when terminating the program execution. I typically ran the python command from an SSH session when developing, and catching the _KeyboardInterrupt_ exception (Ctrl + C) made sure that the LED didn't stay on after terminating the program.

{{<highlight python>}}
def main():
  try:
    read_sensors()
  except(KeyboardInterrupt, SystemExit):
    screen.clear()
  except Exception as e:
    print(e)
    screen.show_error_message()
{{</highlight>}}

To conclude, at this stage we are reading sensor values and trying to send them off to another local service, which however, does not yet exist.

{{<figure src="/images/Sense-hat-warning.jpg" class="image-border" alt="Raspberry Pi Sense HAT showing warning message on LED">}}

Next step is described here: [My IoT Exploration – Part 3 – Sending Data to Cloud][8]

 [1]: /my-iot-exploration-part-1-the-failure/
 [2]: https://www.raspberrypi.org/products/sense-hat/
 [3]: https://www.raspberrypi.org/downloads/noobs/
 [4]: https://github.com/emmellsoft/RPi.SenseHat
 [5]: http://thinglabs.io/getting-started/win10iot/
 [7]: /difference-between-arduino-and-raspberry-pi-for-a-high-level-programmer/
 [8]: /my-iot-exploration-part-3-sending-data-to-cloud/
+++
author = "admin"
categories = ["Coding"]
date = "2016-11-09T08:48:02+00:00"
summary = "In part 3 of my IoT exploration I connect my Raspberry Pi to Azure IoT Hub and create a NodeJS app that relays data from my Python program to Azure."
tags = ["Internet of Things","NodeJS","Raspberry Pi","TypeScript"]
title = "My IoT Exploration – Part 3 – Sending Data to Cloud"
type = "article"
url = "/my-iot-exploration-part-3-sending-data-to-cloud/"

+++

This is my third post about exploring Internet of Things, previous posts can be found here:

  * [My IoT Exploration – Part 1 – The Failure][1]
  * [My IoT Exploration – Part 2 – Raspberry Pi Sense HAT][2]

To be able to see what my Raspberry Pi is monitoring when I'm not home, I need a hosted service that I can send my data to. I decided to go with [Microsoft Azure IoT Hub][3].

## Registering my Raspberry Pi in Azure IoT Hub

I used the Azure Portal to set up the IoT Hub service like this:

{{<post-image image="Create_hub.png" alt="Registering Azure IoT Hub in Azure Portal" lightbox="true" />}}

Once it was created I went back to the console to get a connection string for my Raspberry. This can be done from any computer, by the way.

```
npm install -g iothub-explorer
```

I copied the connection string to IoT Hub that can be found in the portal and created a connection string to my device (that I decided to call _RaspberrySenseHat_) like this.


```
iothub-explorer [Connection string to IoT Hub that you find in the portal] create RaspberrySenseHAT --connection-string
```

When this is done I have a connection string to the device, that I will use later.

{{<post-image image="creating-raspberry-connectionstring-smudged_cut.png" alt="Creating Raspberry connection string" lightbox="true" />}}

## Creating a data relay in NodeJS

The next step was to create a NodeJS application that should receive data from my Python program, do some optional logging and pass it on to Azure. I hadn't written a single application in NodeJS before, but I have done my fair share of JavaScript, so I figured I'd better use TypeScript for this to make sure I maximise the learning 🙂 I found [Tony Sneed's Yeoman Generator for TypeScript Projects Using Visual Studio Code][5], that was a really good starting point. It includes tasks in Gulp for building, running tests etc, so it's great if you're using [Visual Studio Code][6] (another tool I wanted to get familiar with).

My full implementation can be found in this GitHub project: [Receiving environmental data and pushing it to Azure IoT Hub][7]. The readme contains installation instructions, so I'm not going to repeat all of those here. I will however point out a few mistakes I made along the way.

## Deployment

One newbie mistake I made early on was to try to move the entire project folder from my Windows machine to the Raspberry Pi. This causes two problems, firstly the `node_modules` folder tends to be deeper than Windows can handle (moving or copying the folder). See [Why does the 260 character path length limit exist in Windows?][8]  Secondly, the Node modules should be built on the target machine. In this case I was even developing on a x64 Windows 10 machine and then running it on a Linux ARM machine, the Raspberry Pi.

{{<code json>}}
"devDependencies": {
  "browser-sync": "^2.11.0",
  "del": "^2.2.0",
  "es6-module-loader": "^0.17.10",
  "event-stream": "^3.3.2",
  "glob": "^6.0.4",
  "gulp": "^3.9.0",  
  "tslint": "^3.2.1",
  "tslint-stylish": "^2.1.0-beta",
  "typescript": "^2.0.3",
  "yargs": "^3.31.0"
},
"dependencies": {
  "azure-iot-device": "^1.0.13",
  "azure-iot-device-amqp": "^1.0.13",
  "azure-iot-device-amqp-ws": "^1.0.14",
  "azure-iot-device-http": "^1.0.14",
  "azure-iot-device-mqtt": "^1.0.13",
  "body-parser": "~1.0.1",
  "express": "^4.14.0"
}
{{</code>}}

To avoid this and also to avoid having to check everything into source control, pulling it down and building it locally for every single change, I looked more carefully at the dependencies. If you look at the _package.json_ file, there are _dependencies_ and _devDependencies_. Make sure that only the things needed to _run_ the application is listed in _dependencies_. Also, set the environment variable `NODE_ENV=production` in the target machine (the Raspberry Pi in this case) and make sure that _package.json_ is included in the build output folder (_dist_ in my project). Then you can copy the build output folder to the target machine and simply run `npm install`.

## Green light

At this point I'm successfully sending data to Azure and the LED on the Raspberry Pi shows a green light.

{{<post-image image="Sense-hat-ok.jpg" />}}

Next post: [My IoT Exploration – Part 4 – Presenting the Data][9]

 [1]: /my-iot-exploration-part-1-the-failure/
 [2]: /my-iot-exploration-part-2-raspberry-pi-sense-hat/
 [3]: https://azure.microsoft.com/en-gb/services/iot-hub/
 [5]: https://github.com/tonysneed/generator-tonysneed-vscode-typescript
 [6]: https://code.visualstudio.com
 [7]: https://github.com/henriksommerfeld/node-to-iot-hub#recieving-environmental-data-and-pushing-it-to-azure-iot-hub
 [8]: https://stackoverflow.com/questions/1880321/why-does-the-260-character-path-length-limit-exist-in-windows
 [9]: /my-iot-exploration-part-4-presenting-the-data/
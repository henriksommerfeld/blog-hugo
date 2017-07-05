+++
author = "admin"
categories = ["Coding"]
date = "2016-11-13T18:08:36+00:00"
tags = ["Azure IoT Hub","Internet of Things","NodeJS"]
title = "My IoT Exploration – Part 4 – Presenting the Data"
type = "article"
url = "/my-iot-exploration-part-4-presenting-the-data/"

+++

This is my fourth post about exploring Internet of Things, previous posts can be found here:

  * [My IoT Exploration – Part 1 – The Failure][1]
  * [My IoT Exploration – Part 2 – Raspberry Pi Sense HAT][2]
  * [My IoT Exploration – Part 3 – Sending Data to Cloud][3]

For the last piece of this project I pretty much followed the approach described in [Visualizing IoT Data with Web App][4]. Since I wanted to learn how to create and deploy Azure Web Apps, this was a good fit. The data going in to IoT Hub is passed on to Stream Analytics where I have a query that outputs data that I can read in my web app. This is the updated design sketch.

{{<figure src="/images/Office-Monitoring-Azure.png" link="/images/Office-Monitoring-Azure.png" class="image-border lightbox">}}

The query I have in Stream Analytics is really simple, just passing on the values it receives to an _Event Hub_. I guess I can do more cool things here later, but for now it's fine to just pass the data on so I can show it in near real time. I'm setting the _TumblingWindow_, the time interval for when Stream Analytics is outputting data, to match the interval that I'm sending data from my Raspberry Pi to IoT Hub. This is also very much a question of cost, the more data you push in and out of Azure, the more it will cost you. I might dig a bit further into the cost aspect in an upcoming post, but for now I conclude that this is sufficient for my hobby project. After all, the conditions hopefully won't change terribly fast in my home office.

{{<highlight tsql>}}
WITH ProcessedData as (
    SELECT      
        AVG(temperature) Temperature,
        AVG(humidity) Humidity,
        AVG(pressure) Pressure,
        System.Timestamp AS Timestamp
    FROM
        [HomeInput]
    GROUP BY
        TumblingWindow (second, 30)
)

SELECT * INTO [HomeOutput] FROM ProcessedData
{{</highlight>}}

Now it's time for some coding again and I'm doing this with NodeJS as in the guide [Visualizing IoT Data with Web App][4]. There is a template for NodeJS + Express to choose in the [Azure portal][6]. I first tried the command line route to provision the web site, but I found that the command created a bunch of stuff (like _DefaultAppServicePlan_) that I didn't ask for. I felt I had more control creating this through the portal. Since I'm using Socket.io (see the code on GitHub, link below), I also need to enable _Web sockets_ (which isn't on by default).

{{<figure src="/images/Enable-web-sockets.png" link="/images/Enable-web-sockets.png" class="image-border limit-width" alt="Enable Web Stockets in Azure Web App">}}

Since the app is reading the data from the event hub, I also need a connection string to it and store that somewhere. In Azure it's only a matter of adding an app setting in the same settings page as above.

{{<figure src="/images/Event-hub-connecitonstring.png" link="/images/Event-hub-connecitonstring.png" class="image-border limit-width" alt="Event hub connection string">}}

For development I have a json file that contains the connection string. The code first looks for the app setting and secondly for the config file. Just make sure you exclude that config file when you commit the project to source control.

{{<highlight javascript>}}
var getConnectionString = function(settings) {
    if (settings.OFFICE_MONITORING_CONNSTRING)
    {
        return settings.OFFICE_MONITORING_CONNSTRING;
    }
    else  {
        var configFilePath = path.resolve(__dirname, "config/azure.json");
        var configContent = fs.readFileSync(configFilePath, "utf8");
        var configContentJSON = JSON.parse(configContent);
        return configContentJSON.AzureConnectionString;
    }
};
{{</highlight>}}

> The entire code can be found in my GitHub project [Azure-IoT-Dashboard][9] <i class="fa fa-github fa-2x"></i>

For deployment I set up the web app to deploy directly from my GitHub project whenever I commit a change. This is also the reason I am only using JavaScript and CSS for this instead of TypeScript and SCSS. This allows for the deployment to be a simple copy operation. I noticed that about six seconds after I pushed changes from Visual Studio Code on my local machine to GitHub, the deployment was finished in Azure. I will probably add a compilation step to this as well later on, but for now this is sufficient.

{{<figure src="/images/office-monitoring-with-c3.png" link="/images/office-monitoring-with-c3.png" class="image-border" caption="Screenshot of the end result – Home office monitoring" alt="Screenshot of web page of Home office monitoring with C3">}}
  
So, here I have reached the end of this project. I read data from the Sense HAT on my Raspberry Pi with Python, send that data to a local NodeJS service written in TypeScript, then to Azure IoT Hub and finally (via Stream Analytics) visualising it on a web page. I'm using [the C3 JavaScript library][11] to create graphs for temperature, humidity and air pressure. Even though there are many things that can be improved here, I've learned a lot from this project and I've had great fun doing it. The end result can be seen at <http://office.sommerfeld.nu/> (can't guarantee it will be up forever).

 [1]: /my-iot-exploration-part-1-the-failure/
 [2]: /my-iot-exploration-part-2-raspberry-pi-sense-hat/
 [3]: /my-iot-exploration-part-3-sending-data-to-cloud/
 [4]: http://thinglabs.io/workshop/js/weather/visualize-iot-with-web-app/
 [6]: https://portal.azure.com/
 [9]: https://github.com/henriksommerfeld/Azure-IoT-Dashboard
 [11]: http://c3js.org/
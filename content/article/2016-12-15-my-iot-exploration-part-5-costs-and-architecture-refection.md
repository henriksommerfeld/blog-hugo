+++
author = "admin"
categories = ["Tooling","Coding"]
date = "2016-12-15T14:58:59+00:00"
tags = ["Azure IoT Hub","Internet of Things","Raspberry Pi"]
title = "My IoT Exploration – Part 5 – Costs and Architecture Refection"
type = "article"
url = "/my-iot-exploration-part-5-costs-and-architecture-refection/"

+++

Having run [my home office monitoring service][1] for more than a month, I can now reflect back on the project. Even though I have an MSDN subscription trough work with a bunch of Azure credit included to spend every month, I decided to use a _Pay-As-You-Go_ subscription for this project. I wanted to be sure that the services I used was available to me even if I would loose the MSDN subscription.

## Cost

The monthly bill from Microsoft was 851.98 SEK (90.11 EUR or 100.60 USD). 64% of it was spent on running the web site (Pricing Tier: Basic: 1 Small), 26% for Stream Analytics and 10% for Event Hub. The forecast for this month is 541.61 SEK (57.28 EUR or 63.96 USD), so probably the usage is lower now than when I was setting it up and posted the blog posts about it. This is still a bit much for a completely useless service built for learning purposes, but at least I know how to set it up now. Unfortunately there is no easy way to transfer the services between different Active Directory tenants, see [Move resources to new resource group or subscription][2], so I would need to set it up from scratch if I were to "move" the services to my MSDN subscription.

## Architecture

Looking at the architecture from the perspective of what this solution does, it's easy to claim that it's over-engineered. I think this is a good question to ask in any project: _Could this be simplified?_

{{<figure src="/images/Office-Monitoring-Azure.png" link="/images/Office-Monitoring-Azure.png" class="image-border">}}

For simply showing sensor data on a web page, I could have run a web server (preferably in Python) on the Raspberry Pi itself. Applying as many design patterns and new technologies as possible isn't necessary helping my clients at work. Having that said, this was a hobby project, so it's fine to apply some _Learning-Driven Development_.

 [1]: /my-iot-exploration/
 [2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-move-resources
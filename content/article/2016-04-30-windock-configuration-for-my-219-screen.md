+++
author = "admin"
categories = ["User perspective"]
date = "2016-04-30T16:59:15+00:00"
tags = ["Hardware","WinDock"]
title = "WinDock Configuration for my 21:9 Screen"
type = "article"
url = "/windock-configuration-for-my-219-screen/"

+++

Hi have recently bought an ultra-wide monitor for my desk at home, a [Dell U3415W][1]. I'm using it both for work as a coder and for my personal needs such as photo editing, web browsing and watching movies. I have previously used a dual monitor setup, so I wanted to find a way of organising windows to be used side-by-side in a productive manner.

{{<figure src="/images/2016-04-30_HPA_9723-1024x684.jpg" link="/images/2016-04-30_HPA_9723.jpg" class="image-border" caption="Dell U3415W Monitor, 34″ 3440×1440">}}

Of course Windows has had the feature to add two windows side-by-side built-in since Windows 7. With Windows 10 we now also have the annoying feature of splitting the screen in four (like the Windows logo in the image above), which sort of breaks the keyboard shortcuts (<i class="fa fa-fw"></i> + <i class="fa fa-arrow-left"></i> and <i class="fa fa-fw"></i> + <i class="fa fa-arrow-right"></i>) and is something I find useless unless you have a 4K monitor or higher.

But, to be able to use an ultra-wide monitor most effectively, I like to split the screen space into three columns. To make most use of this, it's even better if you can combine these thirds in any way you like, e.g. having one window occupying 2/3 and one window occupying 1/3 of the screen.

I use [WinDock][3] to achieve this and here's my configuration file. By dragging a window to the bottom I make it use 1/3 of the screen and by dragging it to the top I make it use 2/3 of the screen.

Ultra-wide WinDock profile.json
{{<highlight json>}}
{
   "name":"21:9 Profile",
   "rules":[
      {
         "dock":{
            "monitor":0,
            "values":[
               50,
               0,
               100,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"right",
            "type":"edge",
            "values":[
               0,
               100
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               0,
               0,
               50,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"left",
            "type":"edge",
            "values":[
               0,
               100
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               50,
               50,
               100,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"right",
            "type":"edge",
            "values":[
               50,
               100
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               0,
               0,
               67,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"top",
            "type":"edge",
            "values":[
               0,
               33
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               33,
               0,
               100,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"top",
            "type":"edge",
            "values":[
               67,
               100
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               0,
               0,
               100,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"top",
            "type":"edge",
            "values":[
               33,
               67
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               0,
               0,
               33,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"bottom",
            "type":"edge",
            "values":[
               0,
               33
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               33,
               0,
               67,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"bottom",
            "type":"edge",
            "values":[
               33,
               67
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               67,
               0,
               100,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"bottom",
            "type":"edge",
            "values":[
               67,
               100
            ]
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               50,
               0,
               100,
               50
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"top_left",
            "type":"corner"
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               0,
               0,
               50,
               50
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"top_right",
            "type":"corner"
         }
      },
      {
         "dock":{
            "monitor":0,
            "values":[
               0,
               50,
               50,
               100
            ]
         },
         "trigger":{
            "monitor":0,
            "pos":"bottom_right",
            "type":"corner"
         }
      }
   ]
}
{{</highlight>}}


 [1]: http://www1.euro.dell.com/uk/en/business/Peripherals/dell-u3415w-monitor/pd.aspx?refid=dell-u3415w-monitor&cs=ukbsdt1&s=bsd
 [2]: http://localhost/wp-content/uploads/2016/04/2016-04-30_HPA_9723.jpg
 [3]: http://www.ivanyu.ca/windock/
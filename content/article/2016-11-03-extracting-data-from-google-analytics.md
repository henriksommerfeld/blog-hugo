+++
author = "admin"
categories = ["Coding"]
date = "2016-11-03T21:27:30+00:00"
tags = ["Google Analytics"]
title = "Extracting Data from Google Analytics"
type = "article"
url = "/extracting-data-from-google-analytics/"

+++

In my current assignment we're investigating how we can use [Microsoft's Recommendations API][1] for providing recommended links on our web site, in a hopefully intelligent way. We need to feed the service with some usage data and since we use Google Analytics, we started to look at how we could extract data from there. This led me to the blog post [4 Ways to Export Your Google Analytics Data with R][2]. If you just want to try which parameters you can use and are only interested in a smaller set of data, this tool (web page) works fine: [Google Analytics Query Explorer][3]. In this case we needed more data, so I made an attempt with R, a language I had never heard of before.

  1. Download R binaries, <https://cran.rstudio.com/>.
  2. Download and install R Studio, <https://www.rstudio.com/products/rstudio/download/>.
  3. Modify the following code to fit your needs and run in in R Studio.

## The R code

I have commented out the stuff I ran the first time, but kept it for reference. This code extracts data in the specified date interval one day at a time and appends it to a CSV file. A thing we discovered is that we wanted the _ClientId_ out of Google Analytics to be able to see some correlation between sessions, but that it's freaking impossible to extract that unless you send it in as a custom dimension. This is what we have done for _dimension2_ (remove that from the query if you don't have it). See [Exposing ClientID in Google Analytics][4] and [User ID Reference][5] for more info on this.

{{<highlight R>}}
# Install this stuff the first time
#install.packages("devtools")
#install.packages("curl")
#install.packages("bitops")
#devtools::install_github("skardhamar/rga")
library(devtools)
library(curl)
library(rga)
#rga.open(instance = "ga") # run once to authenticate
id <- "79442828" # the view in Google Analytics
startDate <- as.Date("2016-01-01")
endDate <- as.Date("2016-10-20")
dateRange <- seq(from = startDate, to = endDate, by = "day")
for(dateIndex in seq_along(dateRange)) 
{
  currentDate <- dateRange[dateIndex]
  gaData <- ga$getData(id, batch = TRUE, walk = TRUE, start.date = currentDate, end.date=(currentDate + 1), 
                       metrics = "ga:visits", 
                       dimensions = "ga:pagePath,ga:dimension2,ga:date,ga:hour,ga:minute", 
                       filter = "ga:pagePath!@/products/pages/productdetails.aspx;ga:pagePath!@/pages/login.aspx;ga:pagePath!@/mypage;ga:pagePath!=/pages/default.aspx;ga:pagePath!@/_layouts/;ga:pagePath!~^\\/{1}[a-z]{2}[\\-]{1}[a-z]{2}\\/pages\\/default.aspx{1};ga:pagePath!~^\\/{1}[a-z]{2}[\\-]{1}[a-z]{2}$;ga:pagePath!~^\\/{1}[a-z]{2}[\\-]{1}[a-z]{2}[?]{1}\\S*", 
                       sort = "-ga:date,-ga:hour,-ga:minute")
  write.table(gaData, "C:/export/GA export.csv", sep = ",", col.names = F, append = T)
}
print("done")
{{</highlight>}}

I guess the most complicated part of this (at least for me) are the regular expressions used for filtering, but those are of course specific to our needs in this situation.

## Useful links

  * [4 Ways to Export Your Google Analytics Data with R][2]
  * [Core Reporting API &#8211; Reference Guide][7]
  * [Google Analytics Regular Expressions Cheat Sheet][8]
  * [Regular Expressions 101][9]

 [1]: https://www.microsoft.com/cognitive-services/en-us/recommendations-api
 [3]: https://ga-dev-tools.appspot.com/query-explorer
 [2]: http://www.lunametrics.com/blog/2015/11/23/export-google-analytics-data-with-r/
 [4]: https://www.en.advertisercommunity.com/t5/Google-Analytics-Tracking-Goals/Exposing-ClientID-in-Google-Analytics/td-p/482810
 [5]: https://support.google.com/analytics/answer/6205850
 [7]: https://developers.google.com/analytics/devguides/reporting/core/v3/reference
 [8]: https://www.cheatography.com/jay-taylor/cheat-sheets/google-analytics-regular-expressions/
 [9]: https://regex101.com/
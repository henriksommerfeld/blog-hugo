---
title: "Getting a Divorce From SharePoint 💔"
date: 2018-06-29T14:16:39+02:00
url: "getting-a-divorce-from-sharepoint"
draft: true
categories: ["Thoughts"]
tags: ["SharePoint"]
---

In my early days as a consultant this product from Microsoft called _SharePoint_ became popular and customers starting to ask for people who could work with it. As a junior, I jumped onboard and could soon call myself a SharePoint developer, one of the hottest thing in the IT consultant market at the time (around 2007). 

This specialisation got me into interesting development projects and I learned a lot. What was initially a hurdle (the horrible API), soon became familiar and an advantage for me compared to colleagues in the business that hadn't got the same exposure to the product. At this time me and SharePoint had a healthy relationship.

As time went by, I more and more missed the ability to take advantage of progress that was made in the industry. What was presented at development conferences didn't apply to my work, because I was stuck in this bubble called SharePoint, where special limitations applied. 

The combination of SharePoint's release cycles of about every third year and the goal to be backwards compatible with the Iron Age, was a bad recepie for developer experience. For the product team, this meant constantly re-inventing thier own wheels instead of using what others had already created, always resulting in slightly oval wheels (compare [Require.js][1] to SharePoint's [SP.SOD][2]). 

## Overpromising of Out-of-the-Box Features

When adding successfull sales efforts from Microsoft (at least here in the Nordic countries) for using SharePoint for public facing web sites and the SharePoint product team's neglection of standards for HTML, CSS and JavaScript, this gap between common best practices and how things had to be done in SharePoint, became even more frustrating. No feature seemed simple enough to prevent a really complicated implementation in SharePoint. Let me rant a bit...

### Themes

I remember attending a course where a Microsoft representative in real earnest claimed that a feature named _[Themes][5]_ was a good approach for branding a public facing internet site. You could just [upload a branded PowerPoint template][6] and this _theme_ feature would extract the colours and apply them to the site, fantastic 🙄 I tried uploading my current company's PowerPoint template to try it out, and of course it looked terrible. I cannot imagine even the smallest company thinking that using these themes would be good enough for a public web site. And if so, why not just use WordPress?

### Variations

SharePoint's way of supporting multi-language web sites is called _Variations_. The limitations of this feature, made the developers before me in my last SharePoint assignment, implement an entire separate translation flow in addition to what _Variations_ could do, to be able to support the business requirements. Variations also "break" every now and then, that's why there is something called _[variationsfixuptool][7]_. When you programmatically ask the system to give you all the _variations_ (languages) of a page, it gives you as many as it feels like (sometimes correct, sometimes not).

### HTML master pages

I mean, seriously? It was sold to our team as a format in which a design agency could deliver design to us. That is, in a [super-odd format][8] that no design agency has ever seen before.

### Display templates

Yet another weird format with large chunks of commented XML in an HTML file, this time for showing search results. Even [Microsoft's documentation page uses Notepad++ for editing the files][9], since using Visual Studio will mess up the files' indentation. As you can imagine, the debugging experience isn't exactly "great" 😕 Of course the web part used to show the search results didn't work for anonymous users (quite common on a public web site), so we had to do some strange hack to make _that_ work first. One of the best descisions we made in our team was to finally build our own web interface talking directly to the search API.

### Managed navigation

Having worked with _[Managed navigation][4]_ is another "interesing" experience, especially trying to apply it on an existing large web site. This is a way of trying to decouple the site structure from the URL and to hide the ugly `/pages/default.aspx` format. A deep site structure might have been created to achieve a certian URL, but that can cause a database migration to take several days (like when applying a service pack or cumulative update). The _Managed navigation_ API must also be one of the worst I have worked with. Reading a property can result in several database calls in the background, trashing performance completely. The admin GUI that the editors need to use is also...challenging. 

## Workaround-Driven Development (WDD)

All of the above adds up. At one time it struck me that I spent more time on workarounds to compensate for inflexible out-of-the-box features than it would have taken to write the thing from scratch. 

Even though SharePoint development has taken a very sane turn in the last couple of years with the birth of the [SharePoint Framework (SPFx)][3], that hasn't been reflected by the market need where I work. Dev jobs are still circling around old and heavily customised on-prem installations.

## Poor Developer Experience

In addition to the shortcomings mentioned above, I think the biggest drawback and frustration with developing on the SharePoint platform is the overall "heaviness" or "slowness". Being forced to have your custom assemblies in the GAC is just so cumbersum. Unit testing your code when you have to constantly copy your assembly to the GAC for the test runner to notice the change, alternatively remove it from the GAC and have a broken web site while testing, is slow. 

Despite SharePoint being such a success for Microsoft, the tooling for development has been quite bad before SPFx came along (which doesn't apply here). Seeing _Visual Studio (Not responding)™_ freezing with a message _"Communicating with SharePoint..."_ as soon as you try to open a file from Solution Explorer is devastating. Anyone who has experienced both this _and_ [Hot Module Replacement][10] can testify what big of a difference it makes to have a short feedback loop when writing code.

The overall "heaviness" also means you need a multi-kilo laptop with loads of RAM and disk space to run a local SharePoint farm in virtual machines.

{{<figure src="/images/heavy-ride.jpg" alt="Running SharePoint on a laptop" class="image-border" caption="Running SharePoint on a laptop">}}

## Brave New World

So, I finally descided to get a divorce from SharePoint. It will cost me a significant decrease in salary and all the uncertainties of jumping in to something where I will be a complete novice on the technology used, but I just had to do it. To spice it up a bit, I will also leave the consulting business and take a job at an IT department, with staff liability.

So, after my vacation I will join Academic Work as a team manager for an internal development team. At this point I'm feeling a bit scared of all I have to learn: React, Elasticsearch, managing staff, Docker, internal politics, DotNet Core, lot of Azure things etc. Heck, even Git isn't something I know properly. But I'm still convinced that I will grow both personally and professionally and become a better developer in the next comming years. 🤩

[1]: http://requirejs.org/
[2]: http://www.ilovesharepoint.com/2010/08/sharepoint-scripts-on-demand-spsod.html
[3]: https://docs.microsoft.com/en-gb/sharepoint/dev/spfx/sharepoint-framework-overview
[4]: https://blog.mastykarz.nl/5-managed-navigation-challenges-sharepoint-2013/
[5]: https://docs.microsoft.com/en-gb/sharepoint/dev/solution-guidance/use-composed-looks-to-brand-sharepoint-sites
[6]: https://www.youtube.com/watch?v=RvTyVFVkfII
[7]: https://docs.microsoft.com/en-gb/previous-versions/office/sharepoint-server-2010/dd789633(v=office.14)
[8]: https://docs.microsoft.com/en-gb/sharepoint/dev/general-development/how-to-convert-an-html-file-into-a-master-page-in-sharepoint
[9]: https://docs.microsoft.com/en-gb/sharepoint/search/understanding-how-item-display-templates-and-hit-highlighting-work
[10]: https://webpack.js.org/concepts/hot-module-replacement/
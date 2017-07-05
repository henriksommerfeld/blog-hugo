+++
author = "admin"
bfa_virtual_template = ["hierarchy"]
categories = ["Coding"]
date = "2014-11-16T17:05:57+00:00"
tags = ["CSS","Montezuma","Responsive design","WordPress"]
title = "Using a Responsive CSS Grid with Relative Measures"
type = "article"
url = "/using-a-responsive-css-grid-with-relative-measures/"

+++

When you build a web site on a [CMS][1] and a theme made by someone else you always have some limitations. For this blog I use WordPress and the [Montezuma theme][2], and this is how I customised the default CSS grid options to my liking.

{{<figure src="/images/montezuma-css-grid-options.png" alt="montezuma-css-grid-options" class="image-border">}}

These are the grid options you can choose from in version 1.2.4 of the Montezuma theme. Not bad at all, but if you want to use a responsive layout (and yes, you should) you have to choose between a fixed 960 px maximum width or use the 100% width option which can become ridiculous on large high resolution screens. So, what I did was to choose the 100% option and then add `max-width` to constrain the width. This was an easy way to achieve what I wanted with a minimal adjustment and have relative widths, which I really prefer in a CSS grid system.

Using _Chrome Developer Tools_ I identified the CSS rule that determines the page width.

{{<highlight css>}}
.row, .row5, .lw {
   width: 100%;
   margin: 0 auto;
}
{{</highlight>}}

Now the only remaining thing was to add a new rule with the same selector defining the max-width I found appropriate – which I did to in the content.css file like this.

{{<highlight css>}}
.row, .row5, .lw {
   max-width: 1220px;
}
{{</highlight>}}


 [1]: http://en.wikipedia.org/wiki/Content_management_system
 [2]: https://wordpress.org/themes/montezuma
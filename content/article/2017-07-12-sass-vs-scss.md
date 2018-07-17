+++
author = "admin"
categories = ["Coding"]
tags = ["CSS"]
date = "2017-07-12T11:03:44+00:00"
title = "Sass vs SCSS"
type = "article"
url = "/sass-vs-scss/"

+++

As I have worked more and more with CSS during the last year, both at work and with an updated version of this blog, I have come to the following conclusions regarding the Sass vs SCSS syntax. 

SCSS is the obvious default choice as it's a more natural extension of CSS and that you can simply rename an existing `.css` file. In a team with several developers focused more on server-side, it's usually easier to explain SCSS than Sass syntax.

When starting from scratch however, I have personally found Sass to be more enjoyable. It's easier to move rules around when you don't have to add and remove curly brackets (`{`) and I find it a bit more readable. That I'm using a Swedish keyboard where any bracket (curly or square) is a bit fiddly to type, might also contribute to this feeling that the indented style is faster.

The Sassy Way's old post [Sass vs. SCSS: which syntax is better?][1] has a good description about this rather irrelevant topic 🙂.

This is the `link.sass` file I currently have for general link styling on this blog (as an example).

{{<highlight css>}}
a
    color: $light-blue
    text-decoration: none
    transition: color, text-shadow 200ms, outline 60ms
    outline: none
    display: inline-block
    &:after
        display: block
        content: ""
        height: 2px
        width: 0%
        background-color: $orange
        transition: width 200ms ease
    &:visited
        color: $medium-blue
    &:focus, &:active, &:hover
        color: $dark-blue
        text-shadow: 0 0 1px transparentize($light-blue, 0.2)
        text-decoration: none
        outline: none
        &:after
            width: 100%
{{</highlight>}}
  
[1]: http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better
+++
author = "admin"
categories = ["Coding"]
date = "2017-06-03T06:50:51+00:00"
tags = ["Hugo","Tag cloud"]
title = "Hugo Tag Could"
type = "article"
url = "/hugo-tag-could/"

+++

I recently started to look at migrating this blog from WordPress to a [static site engine][1]. [Hugo][2] got my attention and I decided to try it out. One thing I have in WordPress is a tag cloud. I couldn't find an example of how to create one with varying font sizes in Hugo, so I tried creating my own. Hugo discussion forum topics [Weighted tag cloud][6] and [Tag Cloud][7] talk about this.

Hugo is written in [Go][3] and thus uses [Go templates][4]. Go is a language I haven't written a single line of code in, but I looked at how the tag cloud is implemented in WordPress and tried to steal the logic, see the function [`wp_generate_tag_cloud`][5]. Here is what I came up with:

_**Update 2017-07-03:** Code is updated to solve an issue that would cause a crash when all posts have the same number of tags (causing a division by 0). Thanks to [@MunifTanjim][8] in the Hugo discussion thread [Weighted tag cloud][6]._

{{<highlight go "linenos=inline">}}
{{- if gt (len .Site.Taxonomies.tags) 0 -}}
    {{- $fontUnit := "rem" -}}
    {{- $largestFontSize := 1.8 -}}
    {{- $smallestFontSize := 1.0 -}}
    {{- $fontSizeSpread := sub $largestFontSize $smallestFontSize -}}
    <!--<div>Font size unit: {{ $fontUnit }}</div>
    <div>Font min size: {{ $smallestFontSize }}</div>
    <div>Font max size: {{ $largestFontSize }}</div>
    <div>Font size spread: {{ $fontSizeSpread }}</div>-->

    {{- $maxCount := 1 -}}
    <!--<div>Max tag count: {{ $maxCount }}</div>-->

    {{- $minCount := 1 -}}
    <!--<div>Min tag count: {{ $minCount }}</div>-->

    {{- $countSpread := sub $maxCount $minCount -}}
    <!--<div>Tag count spread: {{ $countSpread }}</div>-->

    {{- $.Scratch.Set "sizeStep" 0 -}}
    {{- if gt $countSpread 0 -}}
        {{- $.Scratch.Set "sizeStep" ( div $fontSizeSpread $countSpread ) -}}
    {{- end -}}
    {{- $sizeStep := ( $.Scratch.Get "sizeStep" ) -}}
    <!--<div>Font step: {{ $sizeStep }}</div>-->

    <div class="widget">
        <div class="widget-title">Tags</div>
        <div class="tag-cloud-tags widget-content">
        {{- range $name, $taxonomy := $.Site.Taxonomies.tags -}} 
            {{- $currentTagCount := len $taxonomy.Pages -}}
            {{- $currentFontSize := (add $smallestFontSize (mul (sub $currentTagCount $minCount) $sizeStep) ) -}}
            <!--Current font size: {{$currentFontSize}}-->
            <a href="{{ "/tags/" | relLangURL }}{{ $name | urlize }}" aria-label="{{ $name }} ({{$currentTagCount}} posts)" style="font-size:{{$currentFontSize}}{{$fontUnit}}">{{- $name -}}</a>
        {{- end -}}
        </div>
    </div>
{{- end -}}
{{</highlight>}}

You can uncomment the commented lines for debugging. Also, if the tag keys instead of the tag _names_ are rendered, set `preserveTaxonomyNames = true` in your `config.toml` or  `preserveTaxonomyNames: true`  in your `config.yaml` file. This took a while for me as a beginner to figure out.

 [1]: https://www.staticgen.com/
 [2]: http://gohugo.io/
 [3]: https://golang.org/
 [4]: https://golang.org/pkg/text/template/
 [5]: https://core.trac.wordpress.org/browser/tags/4.7.3/src/wp-includes/category-template.php#L0
 [6]: https://discuss.gohugo.io/t/weighted-tag-cloud/3491
 [7]: https://discuss.gohugo.io/t/tag-cloud/6335
 [8]: https://discourse.gohugo.io/u/MunifTanjim
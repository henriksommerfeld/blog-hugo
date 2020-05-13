+++
author = "admin"
categories = ["Coding"]
date = "2017-02-12T21:46:47+00:00"
tags = ["Azure Media Player", "JavaScript"]
title = "Azure Media Player Full Screen Resizing Fix"
type = "article"
url = "/azure-media-player-full-screen-resizing-fix/"

+++

Lately I've been working on switching to [Azure Media Services][1] from another video platform on my customer's web site. I've found some challenges related to sizing of the player in different browsers with different playback methods (HTML5, Flash and Silverlight). Particularly the size of the player when exiting full screen mode has been flaky. I can't say for sure that this isn't the fault of the web site it lives on, but I don't see anything indicating that either.

The problem is that the player keeps the height of the entire screen after exiting full screen mode. Video height is by the way also handled "manually" (setting a known video height with JavaScript) when resizing the browser window at [Microsoft's demo site][2] at the time of writing this. I'm currently using version 1.8.1 of the player by the way.

## Solving the issue

There is great documentation of the player at <https://amp.azure.net/libs/amp/latest/docs/> where I found the **exitFullscreen** event. This is where I can manually set the correct height, which I get from the player itself once it's loaded, at the **loadedmetadata** event. We have an Angular v1 controller that does a few more things, but these are the relevant parts related to the issue.

### Part of Azure Media Player Angular v1 Controller
{{<code javascript "linenos=inline">}}
var playerOptions = {
    "techOrder": ["azureHtml5JS", "html5", "flashSS", "silverlightSS"],
    "logo": { enabled: false },
    "autoplay": $attrs.autoplay === "true",
    "controls": !($attrs.autoplay === "true" && $attrs.showcontrols === "false"),
    "width": "100%",
    "height": "auto",
    "poster": assets.ThumbnailUrl
}
var videoElementIdSelector = "#" + $attrs.videocontainerid;
var myPlayer = amp(videoElementIdSelector, playerOptions);

var subtitles = [];
var assetSubtitles = assets.Subtitles || [];
assetSubtitles.forEach(function (subtitle, i) {
    subtitles.push({
        kind: "subtitles", src: getSrc(subtitle.Src), 
		srclang: subtitle.SrcLang, label: subtitle.Title
    });
});

myPlayer.src({
    src: assets.Url,
    type: "application/vnd.ms-sstr+xml"
}, subtitles);

// AMP bug fix start
// Sometimes the video container doesn't get resized after existing fullscreen mode.
$(myPlayer).bind("loadedmetadata", function () {
    $scope.correctVideoHeight = $(videoElementIdSelector).height();
});

$(myPlayer).bind("fullscreenchange", function () {
    if (!myPlayer.isFullScreen()) {
        var videoContainer = $(videoElementIdSelector);
        if (videoContainer.height() !== $scope.correctVideoHeight) {
            videoContainer.height($scope.correctVideoHeight);
        }
    }
});
// AMP bug fix end
{{</code>}}

 [1]: https://azure.microsoft.com/en-gb/services/media-services/
 [2]: http://ampdemo.azureedge.net/azuremediaplayer.html
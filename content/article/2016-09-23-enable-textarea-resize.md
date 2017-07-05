+++
author = "admin"
categories = ["User prespective"]
date = "2016-09-23T10:10:21+00:00"
title = "Enable Textarea Resize"
type = "article"
url = "/enable-textarea-resize/"

+++

A web feature I liked when it came was the ability to resize textboxes. Especially multi-line textboxes (`<textarea></textarea>`) have a tendency to be too small and this feature really helps there. To my disappointment I find that many websites disable this feature to favour design at the expense of usability.

{{<figure src="/images/Script_editor-1024x548.png" link="/images/Script_editor.png" alt="SharePoint Script Editor Web Part" class="image-border" caption="Inappropriately sized textbox with disabled resizing">}}

To re-enable this I use the [Stylebot extension for Chrome][2]. I have added a rule to the global stylesheet (applies to all websites).
{{<highlight css>}}
textarea { resize: vertical; }
{{</highlight>}}

If you have a similar extension for other browsers, I'd like to hear about it. I tried to find one for Firefox, but the ones I found seemed to have been broken for a while, so I gave up on that.

 [1]: http://localhost/wp-content/uploads/2016/09/Script_editor.png
 [2]: https://chrome.google.com/webstore/detail/stylebot/oiaejidbmkiecgbjeifoejpgmdaleoha?utm_source=chrome-app-launcher-info-dialog
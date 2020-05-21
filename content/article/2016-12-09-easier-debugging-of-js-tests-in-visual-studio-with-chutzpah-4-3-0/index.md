+++
author = "admin"
categories = ["Coding"]
date = "2016-12-09T14:29:49+00:00"
tags = ["Chutzpah","Jasmine", "Unit testing", "JavaScript"]
title = "Easier Debugging of JS tests in Visual Studio with Chutzpah 4.3.0+"
type = "article"
url = "/easier-debugging-of-js-tests-in-visual-studio-with-chutzpah-4-3-0/"
ogimage = "Chutzpah-test-adapter-version.png"
+++

If you have a Visual Studio project that uses [Chutzpah][1] for JavaScript tests, things recently got a lot easier with a long-awaited update.

## Problem

When all tests pass with the Chutzpah test runner everything is fine, but when you need to debug a test, things haven't been as easy. Debugging the JS code in Visual Studio is something I never got working and never really cared about anyway. The best debugging tool for JavaScript is of course the web browser, but when selecting _Open in browser_ in Visual Studio, Chutzpah has served the HTML test page (Jasmine in my case) through the `FILE:///` protocol. If you use fixtures, json files or similar, you've had to run the web browser with disabled security.

{{<post-image image="chutzpah-open-in-browser.png" borderless="true" />}}

The path opened in the browser has looked something like this: `file:///C:/Workspaces/Development/Apps/CoolProject/JavascriptSpecs/_Chutzpah.32ac122b2d7b8f062865a46153b768fde2c181d4.test.html`

As a result of this more tests failed when I started debugging in the browser compared to what the test runner in Visual Studio complained about.

{{<post-image image="Chutzpah-running-over-file-protocol.png" borderless="true" />}}

## Solution

As of the 4.3.0 release of Chutzpah you can enable the tests to be served through `HTTP://` instead, but it isn't enabled by default. The `BrowserArguments` I've used to disable security can be removed. See [Matthew Manela's post][2] about it for configuration options.

{{<code json>}}
"Server": {
  "Enabled": true
},

"BrowserArguments": { 
  "chrome": "--allow-file-access-from-files --allow-file-access"
}
{{</code>}}

Now the _Open in browser_ opens a path similar to this: `http://localhost:39597/Workspaces/Development/Apps/CoolProject/JavascriptSpecs/_Chutzpah.35722df6731f3d62f68cbf6a873ca82068c8446e.test.html` and only the test that should fail, fails.

{{<post-image image="Chutzpah-running-over-http-protocol-one-error.png" borderless="true" />}}

So, make sure you have the latest version and enable the server mode in Chutzpah.json, then it's all good. Thank you Matthew for this great improvement!

{{<post-image image="Chutzpah-test-adapter-version.png" borderless="true" />}}

 [1]: https://github.com/mmanela/chutzpah/releases
 [2]: http://matthewmanela.com/blog/chutzpah-4-3-0-web-server-mode
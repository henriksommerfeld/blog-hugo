+++
author = "admin"
bfa_virtual_template = ["hierarchy"]
categories = ["Coding"]
date = "2013-04-07T21:41:14+00:00"
tags = ["Jasmine","JavaScript","Scripting","Unit testing"]
title = "A beginner’s experiences of unit testing Javascript"
type = "article"
url = "/a-beginners-experiences-of-unit-testing-javascript/"

+++

As someone working mostly with SharePoint server-side code, unit tests are something that requires quite some investment in time to get rolling with – and consequently not being done. Javascript is a different thing though. Since a big part of most projects using SharePoint is (or should be) done with Javascript, we should be testing that code. (Of course this applies to any system with a web interface, but I assume most of you that don’t have SharePoint in your CV’s are already doing this).

I want to share my experience from adding tests to a function written without tests in mind. In the code base I’m working with I found that we had a function that was called from a lot of places and wasn’t always working. It looked like this:

{{<highlight javascript "hl_lines=1 7 8">}}
MAN.getQueryVariable = function(variable, unescape) {
     var query = window.location.search.substring(1);
     var vars = query.split('&');
     for (var i = 0; i &lt; vars.length; i++) {
         var pair = vars[i].split('=');
         if (decodeURIComponent(pair[0]) == variable) {
             if (unescape)
                 return unescape(pair[1]);
             return decodeURIComponent(pair[1]);
         }
     }
     return null;
 };
{{</highlight>}}

The problem (the unescape parameter) was quite easy to spot, but I can’t say that the function's inner workings are immediately obvious to me. It has a good name though, so I understand what it does at the higher level. So I wanted to write some tests for the function without having to change it in a way that effected the callers.

I found out that the `unescape` function isn’t part of the Javascript language, but rather something that exists on the `window` object and thus constitutes a dependency. Like all dependencies we want to inject them into the function so that we can inject a faked object when testing. I also prefer to be explicit about where functions belong, i.e. using namespaces and referring to `window.unescape()` rather than just `unescape()`. So, here’s my slightly modified version ready for testing.

{{<highlight javascript>}}
// MAN = My Abbreviated Namespace
var MAN = MAN || {}

MAN.getQueryVariable = function (variable, useUnescape, optionalFakeWindow) {
    var windowInstance = optionalFakeWindow || window;
    var query = windowInstance.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i &lt; vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            if (useUnescape)
                return windowInstance.unescape(pair[1]);
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
};
{{</highlight>}}

I have found that I like [Jasmine][1] as my unit testing library for how the tests (or specs) are expressed and I also find the documentation to be in good shape. As the enthusiastic beginner I am in this area I might have ended up with a slightly overkill kind of test suite, considering the amount of test code compared to the amount of tested code. But hey, you got to start somewhere right? Here’s what I ended up with:

{{<highlight javascript>}}
describe("MAN", function () {
    describe("getQueryVariable()", function () {
        var fakeWindow;

        beforeEach(function () {
            fakeWindow = { location: { search: "?q=searchedValue&df=280010|290010|447|1100" }, unescape: function () { } };
        });

        it("should return null when requested parameter is not present in url", function () {
            var value = MAN.getQueryVariable("parametername", false, fakeWindow);

            expect(value).toBe(null);
        });

        it("should return null when no parameter is present in url", function () {
            fakeWindow.location.search = "";

            var value = MAN.getQueryVariable("parametername", false, fakeWindow);

            expect(value).toBe(null);
        });

        it("should return value when requested parameter is present in url", function () {
            var value = MAN.getQueryVariable("q", false, fakeWindow);
            expect(value).toBe("searchedValue");

            value = MAN.getQueryVariable("df", false, fakeWindow);
            expect(value).toBe("280010|290010|447|1100");
        });

        describe("window.unescape", function () {
            /* decodeURIComponent and window.unescape will in some cases return different results, 
            see example from http://www.w3schools.com/jsref/jsref_decodeuricomponent.asp
            "st%C3%A5le" will return "ståle" and "stÃ¥le" respectively               
            */
            beforeEach(function () {
                spyOn(fakeWindow, "unescape");
            });
            afterEach(function () {
                fakeWindow.unescape.reset();
            });

            it("should be used when requested", function () {
                var useUnEscape = true;
				var value = MAN.getQueryVariable("q", useUnEscape, fakeWindow);
                expect(fakeWindow.unescape).toHaveBeenCalled();
            });

            it("should not be used when not requested", function () {
                var useUnEscape = false;
				var value = MAN.getQueryVariable("q", useUnEscape, fakeWindow);
                expect(fakeWindow.unescape).not.toHaveBeenCalled();
            });
        });
    });
});
{{</highlight>}}

Now I’m at the point where I actually dare to change some stuff, and that’s where I want to be with code. If I make a mistake like in the original code, overriding an existing function with a parameter, my tests would tell me. So, the barrier to unit testing Javascript is indeed low and does not require expensive tools (I used Notepad++ and Chrome initially for this before I integrated it into our Visual Studio project). Green makes one happy, get started testing if you haven’t already! You can download this if you want to try it out: [js-tests_henrikpalm.se_2013-04-07.zip][2]

{{<post-image image="man-getqueryvariable-jasmine.png" alt="Passing unit tests with Jasmine" />}}

 [1]: http://pivotal.github.io/jasmine/
 [2]: /files/js-tests_henrikpalm.se_2013-04-07.zip
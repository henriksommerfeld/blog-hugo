---
title: Code Quality and Automated Tests for Legacy System
url: 
date: 2020-02-26T10:22:21+01:00
summary: 
tags: []
categories: [Coding]
ogimage: alex-motoc-P43VRz8fLWs-unsplash.jpg
draft: false
---

My team recently had a discussion trying to agree on a few rules of thumb for our ambition level regarding code quality and automated tests for our legacy systems. These systems are business-critical, but planned to be replaced in a Big Bang fashion.

{{<post-image image="alex-motoc-P43VRz8fLWs-unsplash.jpg" alt="Mainframe">}}
Photo by <a href="https://unsplash.com/@alexmotoc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
Alex Motoc</a>
{{</post-image>}}

One of my colleagues challenged our usual code of conduct of continuous improvement of code quality in regards to these systems. For a code base that has a set timeline for decommissioning, I agreed that we shouldn't strive to improve the code quality. This is especially true when we're talking about a code base that's fragile and where _any_ change is more or less risky.

Our mission is first and foremost to keep these systems running, second to fix high priority bug and where possible, make highly requested minor improvements. 

## Code quality

Our current code of conducts is something along these lines:
> Strive for a code quality that won't bite us later

Meaning, if we believe we will have to come back to a particular piece of code and make another change later – apply good practices so that we are nice to our future selves, but don't do any refactoring of surrounding code.

## Automated tests

For automated tests, we said the following:
> Write a test when we're fixing a bug if it's possible/reasonable

Stored proc. might not be worth it...

> Write tests where it's making development easier. 

This could be a validation function or some other non-trivial [pure function][1] where tests make the function easier to write. So even if the tests are never run again, it would still be worth the effort.

> Write tests that have as good pay off as possible 

An example is UI tests that can catch many possible errors in relation to the amount of test code. 

Samma som annars?

[1]: https://en.wikipedia.org/wiki/Pure_function
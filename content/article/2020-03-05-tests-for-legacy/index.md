---
title: Code Quality and Automated Tests for Legacy Systems
url: /code-quality-and-automated-tests-for-legacy-systems
date: 2020-03-09T14:22:21+01:00
summary: My team recently had a discussion trying to agree on a few rules of thumb for our ambition level regarding code quality and automated tests for our legacy systems. These systems are business-critical, but planned to be replaced in a Big Bang fashion.
description: My team recently had a discussion trying to agree on a few rules of thumb for our ambition level regarding code quality and automated tests for our legacy systems. These systems are business-critical, but planned to be replaced in a Big Bang fashion.
tags: [Testing, Code Quality]
categories: [Thoughts]
ogimage: alex-motoc-P43VRz8fLWs-unsplash.jpg
draft: false
---

My team recently had a discussion trying to agree on a few rules of thumb for our ambition level regarding code quality and automated tests for our legacy systems. These systems are business-critical, but planned to be replaced in a Big Bang fashion.

{{<post-image image="alex-motoc-P43VRz8fLWs-unsplash.jpg" alt="Mainframe">}}
Photo by <a href="https://unsplash.com/@alexmotoc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
Alex Motoc</a>
{{</post-image>}}

One of my colleagues challenged our usual code of conduct of continuous improvement of code quality in regards to these systems. For a code base that has a set timeline for decommissioning, I agreed that we shouldn't strive to improve the code quality. This is especially true when we're talking about a code base that's fragile and where _any_ change is more or less risky.

Our mission is first and foremost to keep these systems running, second to fix high priority bugs and where possible, make highly requested minor improvements. 

## Code quality

The code of conduct we came up with for these systems, is something along these lines:
> Strive for a code quality that won't bite us later

Meaning, if we believe we will have to come back to a particular piece of code and make another change later – apply good practices so that we are nice to our future selves, but don't do any refactoring of surrounding code. If adding another `if` statement solves the problem – do it and move on.

## Automated tests

For automated tests, we said the following:
> Write a test when we're fixing a bug, if it's reasonable

Creating an automated test or two as part of fixing a bug is great to avoid regressions later. But we also realise that for some systems it isn't worth the effort. This is when there are no existing tests, meaning no testing infrastructure in place. Some of our old systems have a lot of logic in _stored procedures_ in the database, and to add tests for that just doesn't make sense in our situation.

> Write tests where it's making development easier

The most obvious case for writing tests are when it helps development directly. This could be a validation function or some other non-trivial [pure function][1] where unit tests make the function easier to write. So even if the tests are never run again, it would still be worth the effort.

> Write tests that have as good pay off as possible 

An example of this is UI tests that can catch many possible errors in relation to the amount of test code. This is of course given that we already have a stable set of tests, we don't want to spend a lot of time troubleshooting flaky UI tests.

## Conclusion 🤷‍♂️
Is this just common sense or too vague to be useful? Maybe it's vague, but given the diversity of the systems we're talking about here, we couldn't find a way to make it more concrete without making it system specific. Doesn't this apply to all systems? Well, sort of. I think the only relevant difference is the amount of time we're willing to spend on improving existing code – and that amount of time is more of a gut feeling than a discrete number. But in any case, I think it's good we had the discussion and hopefully we can waste less time trying to improve code that will die fairly soon anyway.

[1]: https://en.wikipedia.org/wiki/Pure_function
---
title: 8 JavaScript Recommendations to a Struggling Student
url: /javascript-recommendations-to-a-struggling-student
date: 2020-05-30
description: My general advice to a student struggling with a web development assignment.
summary: I recently helpt a student struggling with a web development assignment. Not surprisingly, it wasn't one specific thing that wasn't working with a clear question on how to solve that specific problem. There were errors in the web browser console, long functions with wrong indentation that made it all hard to understand. 
tags: [JavaScript, Code Quality]
categories: [Coding]
ogimage: nesa-by-makers-IgUR1iX0mqM-unsplash.jpg
draft: false
---

I'm sure there are thousands of posts on this topic already, but since this turned out to be mostly general advice, I might as well publish it to save a few keystrokes if I get a similar request in the future.

## Context

I was recently asked for advice by a student struggling with his web development assignment from school. This was an exercise from the level below university – _high school_, _upper secondary school_, or whatever it's called in your country. 

I got a zip file with the assignment as a PDF file and the code in its current state where the student was stuck. Unsurprisingly, it wasn't one specific thing that wasn't working with a clear question on how to solve that specific problem. There were errors in the web browser console and long functions with wrong indentation that made it all hard to understand.

I've never been able to _"take a quick look"_ at a problem like this and give valuable feedback. To be able to give some helpful advice, I need to understand the assignment and see how far from a solution the current state is. In this case I ended up making my own implementation and then writing down my advice. We then had a screen sharing session walking through the problem step by step, until only some minor stuff remained to implement.

{{<post-image image="nesa-by-makers-IgUR1iX0mqM-unsplash.jpg" alt="woman and man sitting in front of monitor">}}
Photo by <a href="https://unsplash.com/@nesabymakers">
NESA by Makers</a>.
{{</post-image>}}

## My general advice

There was some specific advice I could give based on the assignment, but the general stuff was as follows.

### 1. Variable declarations
A variable should be declared, either with `var`, `let` or `const`, but avoid  
`var` – see https://hackernoon.com/why-you-shouldnt-use-var-anymore-f109a58b9b70. 

### 2. Naming

Giving _functions_ and _variables_ good names is one of the most difficult and most important things to get understandable code. Generally, I recommend using English names throughout. 

If it makes it easier for you to reason about the problem domain in your own language, then you might be better off using your native language, but if you do – use the whole alphabet (like umlauts) and not some crippled version of your language. Most importantly: be consistent. 

Here is a clear walkthrough of conventions you benefit from following: https://www.robinwieruch.de/javascript-naming-conventions

### 3. Indenting

Indenting is, just like naming, something that helps or hinders the brain when reading code. It might feel trivial, but it does make a difference, maybe to your grade on this exercise as well.

Code doesn't have to be pretty before it works, but wrong indentation can make you put something _inside_ instead of _outside_ a block (`{}`) – and just like that, 10 minutes is wasted on troubleshooting.

### 4. Short functions

Make sure your functions fit on the screen without scrolling. Especially if you have many levels of indentation, it's a sign you might be able to extract some of it into a new function, like the contents of an `if` statement or a `for` loop.

What I'm reaching for here isn't code aesthetics that will give bonus points. I assume you're only interested in getting it to work at this point, and _that's_ when these general things help _me_ proceed in the right direction.

### 5. Limit state manipulation

Use as few global variables (declared outside of any function) as possible and keep them in one place. Try to set them in as few places as possible. 

### 6. Baby steps

Keep the web browser developer tools (F12) open to spot errors in the console. If you have an error, stop what you're doing and fix the error. Save and test often.

Make sure you address _one_ issue at a time. Even if you're not "done" with the feature you're working on, you can watch your progress by adding `console.log(variable)` statements, inspecting the HTML in the browser or setting breakpoints and stepping through the code (debugging).

### 7. Backup when something works

Ideally you should use a version control system (like Git), but if you haven't been taught how to use that, you can always copy the code folder and give it a sensible name, whenever you've managed something to run like it should. It's just as easy to break something that worked before, as it's frustrating when it happens.

### 8. Google (verb)

If you know what you want to achieve, but not how to type it out – google it, we all do.

## Conclusion

Having gone through the assignment, solving it together with the student in a two-hour screen sharing session, I conclude that methodical problem-solving skills is the most important. Of course you have to know the basics of the programming language you're using and have an understanding of the assignment to be solved, but there are no shortcuts. 

The other obvious insight is that apart from my first JavaScript specific advice on variables, this applies to most of coding – not only most programming languages, but most of programming you will ever do in your career.

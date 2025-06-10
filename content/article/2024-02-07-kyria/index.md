---
title: Kyria to Solve My Keyboard Problems
url: /kyria-to-solve-my-keyboard-problems
date: 2024-02-11
description: How the Kyria solves my keyboard problems, hitting between keys and stretching weak fingers.
summary: Ever since I came to the conclusion to use a US keyboard for programming and built my first custom keyboard, I’ve tried to solve my weaknesses related to using the primary input device of my work. I’ve now settled on the Kyria from splitkb.com, and these are the problems it solves for me.
tags: [hardware, keyboard]
categories: [Tools]
ogimage: kyria-2-above.jpg
draft: false
---

Ever since I came to the conclusion to [use a US keyboard for programming][1]
and built my first custom keyboard, I've tried to solve my weaknesses related
to using the primary input device of my work. I've now settled on the *Kyria*
from [splitkb.com](https://splitkb.com/), and these are the problems it solves
for me.

## Hitting between keys

With a regular keyboard layout, my fingers often end up between two keys. I see
two reasons for this. First is the row staggering, which is difficult to ignore
once you've been made aware of its stupidity. Moving your hands sideways, top
left to bottom right, is strange.

{{<post-image image="row-staggering.jpg" alt="60% row staggered keyboard with drawn lines to illustrate how your fingers move when touch typing">}}
{{</post-image>}}

Second is the distance between the keys. On my current work laptop this isn't a
problem at all, but on external keyboards, the higher and more cone shaped the
key caps are, the more of a problem this is.

{{<post-images>}}
  {{<post-image image="xps-plus.jpg" alt="Closeup shot of Dell XPS Plus laptop keyboard without any space between the keys">}}
    <em>Dell XPS Plus keyboard</em>
  {{</post-image>}}
  {{<post-image image="mt3.jpg" alt="Closeup shot of MT3 keys on a row staggered keyboard with big space between the keys">}}
    <em>60% external keyboard with MT3 keycaps</em>
  {{</post-image>}}
{{</post-images>}}

## Stretching fingers

I've also found it hard to do proper touch typing on a regular keyboard. This
is most likely caused by a combination of the physical size of the keyboard,
the layout (like placement of Q and P on QWERTY), and how much force is
required to press a key. My little fingers are too weak to reach and press all
the intended keys with those fingers. Again, a laptop has less of these
problems than an external keyboard, but they still exist.

## Solutions

### No row staggering

Keeping the keys in straight vertical lines is the most important improvement
from the traditional keyboard for me personally, to be able to do touch typing.
I guess it's just easier for me to think about the keys' relative positions in
terms of "above" or "below", rather than "above and slightly left" or "below
and slightly right".

Related: [Ben Vallack's YouTube video: Conventional Keyboards Are STAGGERINGLY STUPID!][2]

### Split

The natural next step away from row staggering is an ortholinear layout. For me
this was the Planck. I learned a lot about layers to accommodate for fewer keys
on this keyboard, but trying to touch type felt cramped. Going back to a
regular keyboard felt almost the same, to a lesser extent.

{{<post-image image="planck.jpg" alt="The ortholinear 40% Planck keyboard">}}
<em>The Planck</em>
{{</post-image>}}

By splitting the keyboard, you eliminate the risk of using the "wrong" hand for
the wrong key, in terms of touch typing. You can also place the halves in
whatever position your wrists feel comfortable, distance between halves and
angle.

### Low profile

Low profile keys make it less likely to hit between them, as they both have a
larger surface and smaller gaps in between.

### Light switches

By using 20 gram switches I can use all of my fingers without getting sore
hands. On my latest Kyria I'm using slightly heavier (35 gram) switches where
I'm resting my four innermost fingers, to avoid pressing those keys
accidentally.

{{<post-image image="switches.jpg" alt="My Kyria keyboard without keycaps showing different switches for different keys" />}}

### Customisability

Being able to decide for yourself which keys should do what, is a great
advantage of almost all custom keyboards. This is all very personal and my
layout is by no means perfected. But having *Shift*, *Space*, *Backspace* and *Delete*
on my thumb keys is something I find useful. [Home row mods][3] also reduces
the need of moving my fingers horizontally and having a numpad is something I
prefer to stretching my fingers to reach another row of dedicated number keys.

{{<kyria-keymap-svg />}}

### Kyria specifics

What suites me particularly well with the Kyria is the hefty column staggering
and the amount of keys.

Most keyboards with column staggering don't do it enough for my taste. This is
useful as my fingers don't have the same length.

The Kyria also have a good amount of keys for my taste, 50. Not too few, not
too many. I don't use all of the keys often, but I have enough not to have to
resort to intricate layer switching.

{{<post-image image="kyria-2.jpg" alt="My Kyria rev2 keyboard with hand rests"
lightbox="true">}}
<em>My Kyria rev2</em>
{{</post-image>}}

## Possible further improvements

I'm still using QWERTY, which admittedly is one of the worst layouts. Changing
to something else is however a big undertaking and I've now come to a point
where I haven't had to think about my layout in a long time. This is something
I value, since chasing the optimal productivity can be a real productivity
killer.

Related: [Ben Vallack's YouTube video: What’s The Best Size & Style Of Keyboard For Learning Non-Qwerty Layouts][5]

The most likely next step if I were to try something other than the Kyria,
would probably be a concave keyboard where you put your hands in a "bowl", like
the [Kinesis 360][6], [Glove 80][7] or a [Dactyle-Manuform][8]. But, I've found something that
works for me and digging deeper into this keyboard rabbit hole would be for fun
rather than to solve a problem.

## Building the Kyria

A Kyria isn't something you buy pre-made from your nearest electronics store.
You order a kit with parts, and it's not exactly cheap, then you rig your
soldering station. But when you're done, you have a keyboard built just the way
you like it and you get to eat your *stroopwafle*.

{{<post-image image="soldering.jpg" alt="Soldering the Kyria rev3, showing a soldering iron and the Stroopwafel mini" />}}

## Not building the Kyria (Update)

Since I originally published this post, the [Halcyon Kyria][10] has been released. I would strongly recommend that version over the previous ones. It doesn't require you to solder and solves a bunch of issues as described in [Thomas Baart's Winter 2024 blog post][11]. To be honest, I never got my Kyria rev3 to work reliably (all keys). I had several {{<ESD />}} incidents, other family members unplugged the {{<TRRS />}} cable etc. I replaced parts, but finally just gave up. The Halcyon version uses USB-C instead of TRRS and comes pre-soldered.

A tip for anyone interested in a low-profile Kyria is to get convex key caps for the thumb keys. I find it a lot more comfortable.

{{<post-image image="convex.jpg" alt="Kyria with red convex thumb key caps" lightbox="true">}}
<em>The 5 closest keys, for which I use my thumb, are convex</em>
{{</post-image>}}

As final words I would like to emphasise the importance of spending some time
thinking about what might suite you, before buying anything. For the Kyria
there is [a printable sheet][9] to try out by placing your hands on a paper version
of the keyboard. I did this with a bunch of different keyboards before I made
my first purchase.

[1]: /use-a-us-keyboard-for-programming
[2]: https://youtu.be/Ho_CFfdsmc8?si=tnY1YUn-EaBI6A9r
[3]: https://precondition.github.io/home-row-mods
[5]: https://youtu.be/NNglKw4KSWE?si=60uuMY6lY9hcbL9j
[6]: https://kinesis-ergo.com/keyboards/advantage360/
[7]: https://www.moergo.com/collections/glove80-keyboards
[8]: https://github.com/tshort/dactyl-keyboard
[9]: https://docs.splitkb.com/hc/en-us/articles/360010627159-Can-I-try-the-Kyria-before-I-buy
[10]: https://splitkb.com/collections/keyboard-kits/products/halcyon-kyria
[11]: https://blog.splitkb.com/winter-2024/#what-we-learned

---
title: 'My Experience of the Glove80 Keyboard'
url: '/my-experience-of-the-glove80-keyboard'
date: 2025-08-21
draft: false
description: "These are my thoughts on the Glove80 keyboard as a first time user of a keywell keyboard. I'm mostly comparing it to my smaller Kyria and there are some things that makes me still prefer the Kyria, but I think it's a great keyboard that I could probably get used to using full-time."
summary: "These are my thoughts on the Glove80 keyboard as a first time user of a keywell keyboard. I'm mostly comparing it to my smaller Kyria and there are some things that makes me still prefer the Kyria, but I think it's a great keyboard that I could probably get used to using full-time."
tags: [keyboard,glove80]
categories: [tools]
ogimage: HESO1949.jpeg
---

{{<post-image image="HESO1948.jpeg" alt="My white Glove80 keyboard" />}}

## Why I bought it

My existing {{<DIY />}} keyboard, the [Kyria rev3][2], wasn't reliable and as a full-time remote worker I depend on my keyboard at home. I had been curious about keywell keyboards for a while, so I decided to go with the Glove80, as it was a pre-built keyboard with good enough reviews in the areas I care about. 

## Ergonomics

[The Glove80][1] gets praised for its ergonomics and I have to agree. That the keywell layout takes into account that the length difference of your fingers is greater when the fingers are stretched vs when they're bent, makes it very comfortable. The included writs rests are also very nice. 

Since I'm coming from a low profile keyboard with light switches, I found the Cherry Blossom switches very comfortable to use. 

My biggest issue with the physical layout is the thumb clusters. There are six thumb keys on each half divided into two rows with a hight difference. That means I can't move my thumbs between the upper and lower thumb key rows without moving my entire hand forwards or backwards. This works much better for me on my Kyria.

{{<post-images>}}
{{<post-image image="HESO1944.jpeg" alt="The thumb cluster of my Glove80 keyboard" lightbox="true" >}}
    <em>Glove80 thumb cluster</em>
  {{</post-image>}}
{{<post-image image="kyria-convex.jpg" alt="The thumb cluster of my Glove80 keyboard"  lightbox="true" >}}
    <em>Kyria thumb cluster</em>
  {{</post-image>}}
{{</post-images>}}

## Transitioning from a smaller keyboard

Coming from the smaller Kyria with 50 keys, the 80 keys on the Glove80 is also quite a big thing to adjust to. When you go from a traditional keyboard to a more niche one, it usually means fewer keys. The thinking then is that using layers reduces the need for more keys. With the Glove80 it's the other way around - with more keys you don't need as many layers. The keywell also makes reachability less of a problem than with a traditional keyboard. All of this is very much a question of what you get used to, but for me that still has the Kyria as a daily driver on my Linux machine for work and mainly use the Glove80 with my personal Mac, I have the tendency to hit keys unintentionally. With fewer keys I can stretch a finger to reach the row above the home row and know I will only hit the intended key, but with the Glove80 I have three rows above the home row (and two below), so I need more precision when typing.

Maybe it's a result of me being used to a smaller keyboard, but I still use home row mods and a numpad layer instead of the number row. I'd still say there is a use for the function key row that is a far finger stretch away, since you can place less common keys there, such as media keys, print screen or something more exotic.

## Portability

The keyboard comes with a carrying case, very nice! That's good for storing it when not used and can of course also be used for bringing it with you, but the size is like an extra bag. Even though it's light, it's not exactly portable.

{{<post-image image="glove80-case.jpeg" alt="Dell XPS 13 on top of the Glove80 case" >}}
  <em>Dell XPS 13 on top of the Glove80 case</em>
{{</post-image>}}

## Firmware

I appreciate that there is a graphical tool at https://my.glove80.com/, although it could improve in some areas.

Example: If you want a dedicated key for a double quote, of course I want it to have `"`  printed on the key in the visual layout, the result of pressing the key. I can do that by choosing the _DOUBLE_QUOTES_ key code in the editor, but it will warn me: _"[DEPRECATED] Use LS(SINGLE_QUOTE)"_. If I do as told the key will instead have `LS(')` printed on it. If I follow that advice/warning for all keys I have a visual layout of my keymap that doesn't tell me what pressing the keys do - very poor {{<UX />}}.

If you go for a more advanced layout, like [Sunak's](https://sunaku.github.io/moergo-glove80-keyboard.html) , it will say _CUSTOM_ on most keys. I have borrowed some of his ideas and would certainly recommend you take a look at his work for inspiration, but at least for me the complexity of such a layout is just too much to deal with.

Ideally I would appreciate a simpler way of building the firmware locally from my own git repo. Doing that looks way more complicated than I'm currently willing to dive into.

[My layout is here][3] and I have even added mouse support for fun, but have to conclude that that's too imprecise for any practical use.

## Connectivity

It uses Bluetooth to connect the two halves together and can connect to a computer through either Bluetooth or a USB cable. I guess there is a use case for a wireless connection if you want to use it with an iPad for example, but I haven't tried that and would also prefer a wired connection, at least have the option, between the halves. It has lost connection to the right half a few times, but it's not something I experience now, so maybe a firmware update has fixed it 🤷‍♂️

## Who is this for

For non-geeks that have a real ergonomic need, like suffering from {{<RSI />}}, I think this keyboard might be a good fit. You don't have to get into advanced layers and for regular typing I find it quite nice. Even arrow keys exist on the default keymap, which is quite uncommon in split keyboards. Where it falls short for me is the thumb cluster, but maybe that's a thing I would get used to if I would give this keyboard the daily practice I might need to appreciate it fully. Typing this text on it has actually felt quite nice.

[1]: https://www.moergo.com/
[2]: /kyria-to-solve-my-keyboard-problems#not-building-the-kyria-update
[3]: https://my.glove80.com/#/layout/user/e8a297d7-1ff2-4f1c-ac79-ee86065efdaf

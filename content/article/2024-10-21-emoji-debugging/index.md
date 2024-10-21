---
title: Emoji Debugging
url: /emoji-debugging
date: 2024-10-21T19:28:00+02:00
description: I realised that the debugging I do nowadays is exclusively “emoji debugging”, maybe better known as “printf() debugging”. Coming from C# development in Visual Studio, which has the best debugging experience I know, I find this works surprisingly well.
summary: I realised that the debugging I do nowadays is exclusively “emoji debugging”, maybe better known as “printf() debugging”. Coming from C# development in Visual Studio, which has the best debugging experience I know, I find this works surprisingly well.
tags: [debugging, logging, nodejs, javascript, typescript, dotnet]
categories: [Coding]
ogimage: bug.webp
ogimagenoborder: true
draft: false
---

I realised that the debugging I do nowadays is exclusively
"emoji debugging", maybe better known as _"printf() debugging"_. Coming from
[C#][4] development in Visual Studio, which has the best debugging experience I
know, I find this works surprisingly well.

{{<code javascript>}}
console.log('🥑')
console.dir(allCompanies, { depth: null })
...
console.log('🍋')
console.dir(filteredCompanies, { depth: null })
{{</code>}}

Using emojis makes it easy to recognise the log statements in a crowded log
output and a quick way to answer the questions _"Did we get here?"_ and _"How
does the relevant data look?"_

Using the same language for the front-end, it doesn't matter if I'm in a
[Remix][7] `action` or a client rendered component. [`console.dir`][6]
doesn't take an options argument in web browsers, but it isn't needed either,
so just skip it or accept the extra output.

I guess the main reason I've ended up here is that my local development is
based on [Docker Compose][1] where attaching to a process isn't the easiest,
especially from [Neovim][5]. The idea of doing the same for my teams C#
services is apparently not worth pursuing — mein Gott how complicated: [C#:
Printing all properties of an object [duplicate]][8]

So, if you're already console logging for figuring out what you've done wrong,
consider adding some emojis for a more efficient debugging experience! 🐛

[1]: https://docs.docker.com/compose/
[2]: https://www.typescriptlang.org/
[3]: https://nodejs.org/en
[4]: https://dotnet.microsoft.com/en-us/languages/csharp
[5]: https://neovim.io/
[6]: https://developer.mozilla.org/en-US/docs/Web/API/console/dir_static
[7]: https://remix.run/
[8]: https://stackoverflow.com/questions/852181/c-printing-all-properties-of-an-object

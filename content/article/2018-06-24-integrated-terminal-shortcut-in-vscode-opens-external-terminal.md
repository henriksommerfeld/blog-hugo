---
title: "Integrated Terminal Shortcut in VS Code Opens External Terminal"
url: "integrated-terminal-shortcut-in-vscode-opens-external-terminal"
date: 2018-06-24T05:46:00+01:00
categories: ["Administration"]
tags: ["ConEmu", "Cmder", "VS Code"]
---

For quite a while I've been slightly annoyed by the behaviour that the keyboard shortcut in Visual Studio Code didn't open the integrated terminal if I also had an external terminal open, it was switching to that one instead. 

Googling the problem didn't help me come closer to an explanation, which I suspected had to do with the language/keyboard specific nature of this issue. As you can see in the image below, the default keyboard shortcut to open the integrated terminal on my machine is `Ctrl + ö`.

{{<figure src="/images/vscode-integrated-terminal-shortcut.png" alt="Integrated terminal shortcut on my machine" class="image-border" caption="Integrated terminal shortcut on my machine">}}

Now when I was in the process of setting up [oh-my-posh][1] in [ConEmu][2] and playing with _[Quake style][3]_, I found an explanation. ConEmu/Cmder uses the same keyboard shortcut for _Minimize/Restore_ as VS Code does for its integrated terminal. Since ConEmu listens for this shortcut even when the program isn't active (in focus), it overrides the shortcut in VS Code.

{{<figure src="/images/conemu-minimize-restore-shortcut-before.png" alt="ConEmu keyboard shortcut settings with conflicting configuration" class="image-border" caption="ConEmu keyboard shortcut settings with conflicting configuration">}}

Changing the shortcut in ConEmu solves the problem. One annoyance less 😊

{{<figure src="/images/conemu-minimize-restore-shortcut-after.png" alt="ConEmu keyboard shortcut settings without conflicting configuration" class="image-border" caption="ConEmu keyboard shortcut settings without conflicting configuration">}}

[1]: https://github.com/JanDeDobbeleer/oh-my-posh/
[2]: https://conemu.github.io/
[3]: https://medium.com/@nuno.caneco/cmder-quake-style-e57601d1c07b/
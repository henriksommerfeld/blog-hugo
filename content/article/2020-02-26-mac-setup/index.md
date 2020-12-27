---
title: Settings for new MacBook Pro
url: /settings-for-new-macbook-pro
date: 2020-02-26T10:22:21+01:00
summary: I recently bought a new machine, a MacBook Pro 16", and this is my initial configuration. I'm documenting this for my future self so I have something to cherry-pick from if I will ever configure a new Mac from scratch. Some of these things might not be relevant in future versions of macOS or for future versions of myself, so I don't see a point in automating it.
description: I recently bought a new machine, a MacBook Pro 16", and this is my initial configuration.
tags: [macOS, Hardware]
categories: [Tooling]
ogimage: 2020-02-21_HPA_2383.jpg
draft: false
---

I recently bought a new machine, a MacBook Pro 16", and this is my initial configuration. I'm documenting this for my future self so I have something to cherry-pick from if I will ever configure a new Mac from scratch. Some of these things might not be relevant in future versions of macOS or for future versions of myself, so I don't see a point in automating it.

{{<post-image image="2020-02-21_HPA_2383.jpg" alt="MacBook Pro 16 inch with Roxxlyn slate skin">}}
My new MacBook Pro 16" with the <a href="https://roxxlyn.com/product/the-macbook-slate-skin-black-impact-3/">Roxxlyn slate skin made from real stone</a>.
{{</post-image>}}

## Changing machine name
By default my new machine had a very long name, which mostly becomes an issue with my bluetooth headset that speaks out the name of the devices it's connected to. This setting is under _Sharing_. I called this machine _BigMac_.

## Trackpad settings

I found two settings that improve the great trackpad on MacBooks.

### Enabling tap to click for trackpad
Enabling clicking by tapping on the trackpad rather than having to press it with force is an obvious thing I definitely want to change. Easy to find in _System Preferences_ -> _Trackpad_ -> _Point & Click_ -> _Tap to click_.

### Enabling three finger move of windows
The other trackpad change I make is to [enable moving windows with a three finger gesture][4]. I don't know why this isn't enabled by default and why it's buried so deep in the accessibility settings – very inaccessible.

1. System Preferences -> Accessibility -> Pointer Control -> Mouse & Trackpad -> Trackpad options... -> Enable dragging -> _three finger drag_
{{<post-image image="three-finger-drag.png" width="700" borderless="true" alt="Three finger window drag setting" />}}


## Installing applications
 I prefer to install as much as possible through [Homebrew][1]. I copied my old Brewfile to my home directory (`~/Brewfile`), made some adjustment and ran `brew bundle`.

I try to keep a fairly updated version of [my Brewfile in this gist][8], but this is the one I used now:

```
tap "github/gh"
tap "homebrew/bundle"
tap "homebrew/cask"
tap "homebrew/cask-drivers"
tap "homebrew/cask-versions"
tap "homebrew/core"
brew "bash"
brew "bat"
brew "cask"
brew "cowsay"
brew "exa"
brew "ffmpeg"
brew "git"
brew "gource"
brew "htop"
brew "hugo"
brew "node"
brew "nvm"
brew "tldr"
brew "trash"
brew "vcprompt"
brew "wget"
brew "yarn"
brew "youtube-dl"
brew "github/gh/gh"
cask "1password"
cask "1password-cli"
cask "adobe-creative-cloud"
cask "alfred"
cask "baretorrent"
cask "brackets"
cask "firefox"
cask "fork"
cask "inkscape"
cask "iterm2"
cask "kap"
cask "keka"
cask "logitech-options"
cask "menumeters"
cask "microsoft-edge"
cask "mullvadvpn"
cask "onedrive"
cask "overkill"
cask "rectangle"
cask "sensiblesidebuttons"
cask "soundflower"
cask "soundflowerbed"
cask "spotify"
cask "teamviewer"
cask "visual-studio-code"
cask "vlc"
```

## Touch Bar

The Touch Bar is probably my least favourite part of the MacBook Pro, maybe after the very low-quality web cam. I find most of the default configuration to aim for aiding non-tech savvy users with simple tasks. In most web browsers, the Touch Bar shows a big button that sets focus on the address bar.

{{<post-image image="touch-bar-web.png" width="650" borderless="true" />}}

To me this is a clear indication that it's made for those who don't know that ⌘ + L does the same. It _is_ possible to have the Touch Bar always show the Fn-keys, but for now I'll give it the benefit of the doubt.

### Replacing Siri with Screenshot

Since I don't use Siri, I replaced that button with the one for taking a screen shot. This is done by opening an app that supports the Touch Bar, such as Finder, and then in the menu bar go to _View_ -> _Customise Touch Bar_. Tapping the part you want to customise on the Touch Bar itself, opens those options.

{{<post-image image="touch-bar-customization.png" borderless="true" />}}

Once I did my first change, this is easy in the way Apple likes to think of their products. My new controls:
{{<post-image image="touch-bar.png" width="300" borderless="true" />}}

### Using function keys in Visual Studio Code

I find the function keys much more useful than anything else in [VS Code](https://code.visualstudio.com/), so I set an app specific rule for using the function keys, as shown below.

{{<post-image image="vs-code-fn-keys.png" width="650" borderless="true" />}}

And...look at this! We've gone full circle with the Touch Bar in VS Code:
{{<post-image image="f1-f12.png" borderless="true" />}}

## General desktop changes

There are a bunch of smaller changes I've done and I don't remember all of them, but here are a few.
* Show path and status bar in _Finder_
* Remove the _Stocks_ widget from _Notification Centre_. I find it astounding that an app for stock exchange rates is pre-installed and impossible to remove.

### Sorting in Finder

Default setting for Finder is apparently to show files in no particular order. To fix this to sort by name, that setting can be changed in the dialogue opened by ⌘J. This then only applies to the current folder, so to make it the default, there is a special button for that.
{{<post-image image="folder-settings.png" width="280" borderless="true" />}}

### Arrange windows

For a MacBook with a small screen, this might not be that useful, but with a larger display I find it really helpful. It's basically to enable the possibilities that has been in Windows for many years, like putting two windows next to each other. There are a number of applications that does this. I use [Rectangle][5] because it's free and [open source][6]. Though it is possible to align windows next to each other out-of-the-box as well, that involves precision clicking on the green maximise
button, so it doesn't count.

### Removing irrelevant search results

I use [Alfred](https://www.alfredapp.com/) for searching apps and files, but to remove irrelevant files from the results, you have to go into the Spotlight settings, under the _Privacy_ tab. I have these paths removed:

* ~/Code (which is where I clone all repos and where node_modules end up)
* ~/go (where Go stuff ends up)
* /System/Volumes/Data (nothing I'm looking for is here)

{{<post-image image="spotlight-exclude.png" width="650" borderless="true" />}}

## Keyboard navigation

To be able to use the keyboard in dialogue windows and such, you need to enable a setting because...I wish I knew.

_System Preferences_ -> _Keyboard_ -> _Shortcuts_ -> _Use keyboard navigation to move focus between controls_.

{{<post-image image="allow-keyboard.png" width="650" borderless="true" />}}


### Allow keyboard focus on links in Firefox

Using Firefox, there is an extra setting you have to do to be able to use keyboard navigation (moving focus to links).

In addition to the _All controls_ setting in macOS described above, you also have to type `about:config` in Firefox and create a setting with the key `accessibility.tabfocus` and set it to `true`, see [Stack Overflow question][9].

### Adding key bindings for external keyboard

I have the full size keyboard with numerical pad from Apple. What I found was that the keys that are called _Home_ and _End_ on other keyboards (not from Apple), don't do what I expect in a text file (moving the cursor to beginning or end of line).

To fix this I created the file `~/Library/KeyBindings/DefaultKeyBinding.dict` with the following content:
```
{
  "\UF729"  = moveToBeginningOfLine:;
  "\UF72B"  = moveToEndOfLine:;
  "$\UF729" = moveToBeginningOfLineAndModifySelection:;
  "$\UF72B" = moveToEndOfLineAndModifySelection:;
  "^@\UF701" = "noop:";
  "^@\UF702" = "noop:";
  "^@\UF703" = "noop:";
}
```

Each app needs a restart to make it take effect, see [Stack Exchange][7]. The "`noop`" settings [prevents the system from beeping when pressing ⌘⌃↓][10].

### Toggling integrated terminal focus in Visual Studio Code

A thing I have found useful is to be able to toggle focus between the editor and the integrated terminal in VS Code with the keyboard. There is currently no built-in shortcut for this, so I have added one. This is for _my_ keyboard (a Swedish one), but I think that's okay since most other shortcut descriptions on the web assumes an English keyboard. Showing and hiding the terminal is ⌘J, btw.

Keyboard shortcuts are accessed from _Code_ -> _Preferences_ -> _Keyboard Shortcuts [⌘K ⌘S]_. The commands are called _Terminal: Focus Terminal_ and _View: Focus Active Editor Group_. I use the lovely shortcut ⌘Ö for both of them (toggling) and the conditions are `!terminalFocus` and `terminalFocus` respectively.

{{<post-image image="vs-code-terminal-toggling.png" borderless="true" />}}

The resulting configuration in keybindings.json:
``` json
{
  "key": "cmd+[Semicolon]",
  "command": "workbench.action.terminal.focus",
  "when": "!terminalFocus"
},
{
  "key": "cmd+[Semicolon]",
  "command": "workbench.action.focusActiveEditorGroup",
  "when": "terminalFocus"
},
```

## Controlling sound volume on external display

I have an external Dell display that connects through HDMI. At first, all sound output through the display was at max volume. To adjust the volume, I had to dive into the fiddly settings on the display itself. By installing _Soundflower_ and _SoundflowerBed_, I can now control the volume with the built-in controls of macOS.

{{<post-image image="SoundflowerBed.png" width="700" alt="Using Soundflower Bed for manging sound">}}
Selecting my Dell display as sound output and being able to control volume with built-in macOS controls.
{{</post-image>}}

That's it, at least for now!


[1]: https://brew.sh/
[2]: https://support.apple.com/guide/mac-help/use-your-keyboard-like-a-mouse-mchlp1399/mac
[3]: https://roxxlyn.com/product/the-macbook-slate-skin-black-impact-3/
[4]: https://support.apple.com/en-us/HT204609
[5]: https://rectangleapp.com/
[6]: https://github.com/rxhanson/Rectangle
[7]: https://apple.stackexchange.com/questions/18016/can-i-change-the-behavior-of-the-home-and-end-keys-on-an-apple-keyboard-with-num
[8]: https://gist.github.com/henriksommerfeld/c7b6d59b19f89780b1a7e40ab2f6434b
[9]: https://stackoverflow.com/questions/11704828/how-to-allow-keyboard-focus-of-links-in-firefox
[10]: https://github.com/adobe/brackets/issues/2419

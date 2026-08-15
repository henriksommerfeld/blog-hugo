---
title: 'Pass as Password Manager'
url: '/pass-as-password-manager'
date: 2026-08-15
draft: false
description: "I have now used Pass, the standard unix password manager, for two and a halv years and I like it."
summary: Most people need a password manager. Mine is free, not dependent on any specific company and requires a bit of geekiness. I have now used Pass, the standard unix password manager, for two and a halv years and I like it.
tags: [passwordstore]
categories: [tools]
---

Most people need a password manager. Mine is
- Free
- Not dependent on any specific company
- Requires a bit of geekiness (has a technical barrier)

Okay, this isn't for everyone, but I have now used [pass][1] as my password
manager for two and a half years and I like it. I use it with on Linux, iOS and
macOS (haven't touched Windows or Andriod in years, so can't say how that
works).

In essence each password (or saved secret of any kind) is a
[GnuPG][2] (`.gpg`) encrypted text file on each device I use.
The `.gpg` files are stored in a git repository which is also how they are
"synced" between devices. This is not as polished as something from a
commercial password manager, but has worked really well for me these years.

## iPhone

[Pass for iOS][3] integrates well with the rest of iOS just like any other
password manager so it can pre fill passwords when you are prompted. The only
issue I have run into has been forgetting to manually sync the latest changes
to the phone before adding or changing a password. There is no automatic sync,
so you have to manually open the app and sync the latest changes. Solving a
merge conflict in the iPhone app is not really possible, but as long as you are
familiar with git and aware of this, it's not really a problem.

## Firefox and Chromium

For my web browsers I use
[Browserpass][4] which allow
me to use keyboard shortcuts to fill login forms and search my passwords. On
the Mac it's a bit more hassle since `PATH` is apparently not read in GUI
programs, so you have to add the path to the `gpg` binary in the plugin's
settings, but it's a one-time thing.

## Terminal

For the terminal I have done two things to aid my `pass` usage. First is to
show when I have local changes not pushed to the remote repository, like
a regular git prompt, but independent of my current working directory.
This reminds me I have to do `pass git push`

Function part of my custom prompt for ZSH:
``` zsh
pass_info() {
  local -a DIVERGENCES
  local NUM_AHEAD="$(git -C ~/.password-store log --oneline @{u}.. 2> /dev/null | wc -l | tr -d ' ')"
  if [ "$NUM_AHEAD" -gt 0 ]; then
    DIVERGENCES+=( "pass(${AHEAD//NUM/$NUM_AHEAD})" )
  fi
  local -a GIT_INFO
  [[ ${#DIVERGENCES[@]} -ne 0 ]] && GIT_INFO+=( "${DIVERGENCES}" )
  echo "${GIT_INFO}"
}
```

Function part of my custom prompt for FISH:
``` fish
function __pass_info
    set -l num_ahead (git -C ~/.password-store log --oneline '@{u}..' 2>/dev/null | wc -l | string trim)
    if test "$num_ahead" -gt 0
        printf ' pass('
        set_color red
        printf '%s↑' "$num_ahead"
        set_color normal
        printf ')'
    end
end
```

In addition to this I have a script to search my passwords,
[pass-fzf][5] and I have also used
the `pass` CLI to inject secrets into an app as a replacement for `.env` files
etc.

## Final words

It might be worth noting that the git repo should be kept private despite the GnuPG encryption if you don't want to tell the world _what_ you have passwords for, as the filenames reflect that. Of course you should also be familiar with git, but otherwise I guess you haven't read this far :-)

[1]: https://www.passwordstore.org/
[2]: https://gnupg.org/
[3]: https://mssun.github.io/passforios/
[4]: https://github.com/browserpass/browserpass-extension
[5]: https://github.com/henriksommerfeld/pass-fzf

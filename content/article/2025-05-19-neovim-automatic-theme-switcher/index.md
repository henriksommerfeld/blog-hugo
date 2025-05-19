---
title: 'Neovim Automatic Light/Dark Mode Switcher'
url: '/neovim-automatic-light-dark-mode-switcher'
date: 2025-05-19
draft: false
description: 'This is how I ended up switching between light and dark colour scheme in all running Neovim instances triggered by OS theme change.'
summary: 'This is how I ended up switching between light and dark colour scheme in all running Neovim instances triggered by OS theme change.'
tags: [neovim,text-editor,linux]
categories: [tools]
ogimage: light-dark.png
---

This is how I ended up switching between light and dark colour scheme in all running [Neovim][2] instances triggered by {{<OS />}} theme change. 

{{<post-image image="light-dark.png" alt="Screenshot showing partially light and partially dark theme" lightbox="true" />}}

## Background

I'm running [Sway][4] and use both a light and a dark theme that I switch between manually by typing `light` or `dark` in the terminal. I live in [Tmux][1], usually with a bunch of Neovim instances running, so I wanted those running instances to switch theme triggered by an outside event (OS theme change).

### My OS Theme Switching

Switching [GTK][3] theme works for all my applications that has a *"Use OS settings"* configuration option. All web browsers I use support this, so any website that respects `prefers-color-scheme: dark/light`  (like mine) will also update.

I have a `~/.theme` file that contains the value *light* or *dark* as a central place to store this setting.

My shell functions updates this file and sets the GTK theme and the theme of all applications that don't listen to the GTK settings.

``` zsh
# Function for switching to light mode, loaded from my .zshrc
function light () {
  echo 'light' > "$HOME/.theme"

  mkdir -p "$XDG_CONFIG_HOME/glow"
  echo 'style: "light"' > "$XDG_CONFIG_HOME/glow/glow.yml"

  if [ -f "$DOTFILES/gtk-3.0/settings-light.ini" ]; then
    #echo 'Configuring GTK light mode'
    ln -sfvT $DOTFILES/gtk-3.0/settings-light.ini $XDG_CONFIG_HOME/gtk-3.0/settings.ini >/dev/null
  fi

  if [ -f "$DOTFILES/waybar/style-light.css" ]; then
    #echo 'Configuring Waybar light mode'
    ln -sfvT $DOTFILES/waybar/style-light.css $XDG_CONFIG_HOME/waybar/style.css >/dev/null
  fi

  if [ -f "$DOTFILES/wofi/style-light.css" ]; then
    #echo 'Configuring Wofi light mode'
    ln -sfvT $DOTFILES/wofi/style-light.css $XDG_CONFIG_HOME/wofi/style.css >/dev/null
  fi

  if [ -f "$DOTFILES/wofi/style-light.widgets.css" ]; then
    #echo 'Configuring Wofi widget light mode'
    ln -sfvT $DOTFILES/wofi/style-light.widgets.css $XDG_CONFIG_HOME/wofi/style.widgets.css >/dev/null
  fi

  swaymsg reload

  pkill -usr1 zsh
  reload-tmux
}

function reload-tmux () {
  # If running inside tmux:
  # * Leave tmux (detach), run this script and attach again
  if [ -n "$TMUX" ]; then
    session_name=`tmux display-message -p '#S'`
    tmux detach -E "source $XDG_CONFIG_HOME/zsh/.zshrc && tmux attach -t $session_name"
  fi
}
```

## Switching Theme in Neovim

First I should mention that tried the [auto-dark-mode.nvim][6] plugin. For me it triggered seemingly randomly, but might work better on Mac or Windows.

By watching changes to my `~/.theme` file,  I now set colour scheme when that file changes. I found the Neovim plugin [fwatch.nvim][5] (thank you!) from which I took most of the code for my own [colorscheme.lua](https://www.lazyvim.org/plugins/colorscheme) file: 

``` lua
local theme_file_path = vim.fn.expand("$HOME/.theme")
local uv = vim.uv

local function read_file(path)
  local file = io.open(path, "r")
  if not file then
    return "dark"
  end
  local content = file:read("*line")
  file:close()
  return content
end

local function set_dark_mode()
  vim.api.nvim_set_option_value("background", "dark", {})
  vim.cmd([[colorscheme tokyonight-moon]])
end

local function set_light_mode()
  vim.api.nvim_set_option_value("background", "light", {})
  vim.cmd([[colorscheme onedark]])
end

local function watch_theme_change()
  local handle = uv.new_fs_event()

  local unwatch_cb = function()
    if handle then
      uv.fs_event_stop(handle)
    end
  end

  local event_cb = function(err)
    if err then
      error("Theme file watcher failed")
      unwatch_cb()
    else
      -- Important to wrap in schedule, otherwise error E5560
      vim.schedule(function()
        local theme = read_file(theme_file_path)
        if theme == "light" then
          set_light_mode()
          print("Switching to light mode 🌖")
        else
          set_dark_mode()
          print("Switching to dark mode 🌘")
        end
        unwatch_cb()
        watch_theme_change()
      end)
    end
  end

  local flags = {
    watch_entry = false, -- true = when dir, watch dir inode, not dir content
    stat = false, -- true = don't use inotify/kqueue but periodic check, not implemented
    recursive = false, -- true = watch dirs inside dirs
  }

  -- attach handler
  if handle then
    uv.fs_event_start(handle, theme_file_path, flags, event_cb)
  end

  return handle
end

local theme = read_file(theme_file_path)
watch_theme_change()

return {
  {
    "navarasu/onedark.nvim",
    opts = {
      style = theme,
      highlights = {
        -- https://github.com/navarasu/onedark.nvim/blob/master/lua/onedark/palette.lua
        -- https://github.com/navarasu/onedark.nvim/blob/master/lua/onedark/highlights.lua
        ["@punctuation.bracket"] = { fg = "$purple", fmt = "bold" },
        -- https://github.com/rcarriga/nvim-notify/blob/master/lua/notify/config/highlights.lua
        NotifyINFOTitle = { fg = "$dark_cyan" },
        NotifyINFOIcon = { fg = "$dark_cyan" },
      },
    },
  },
  {
    "folke/tokyonight.nvim",
    lazy = true,
    opts = { style = "moon" },
  },
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = theme == "light" and "onedark" or "tokyonight",
    },
  },
}
```

I like the approach of watching when a file changes, rather than polling some
setting (like the auto-dark-mode.nvim plugin does). It's robust and means no
unnecessary work. I usually have light mode in a light surrounding and dark
mode when it's darker around me, so it's nice to have a quick way of switching
the theme of everything.

[1]: https://github.com/tmux/tmux/wiki
[2]: https://neovim.io/
[3]: https://www.gtk.org/
[4]: https://swaywm.org/
[5]: https://github.com/rktjmp/fwatch.nvim
[6]: https://github.com/f-person/auto-dark-mode.nvim

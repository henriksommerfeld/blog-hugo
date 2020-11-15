---
title: Usability Learnings from Building a CLI
url: /usability-learnings-from-building-a-cli
date: 2020-11-15T20:34:00+02:00
description: How to address naming challenge with a multi-command CLI, example in oclif.
summary: From the past months of iterating on a CLI for managing micro services in our company, I've drawn some conclusions regarding usability. I'll describe the features of OCLIF we've used to address the challenges.
tags: [oclif]
categories: [Coding]
ogimage: oclif-cli.png
draft: false  
---

From the past months of iterating on a CLI for managing micro services in our company, I've drawn some conclusions regarding usability.

## The problem

As the number of commands, arguments and flags have grown, so has the risk of confusion. Naming things is not the easiest thing in our industry – should the command for creating a service be called **create**, **init** or **add**? Since it's [idempotent][1] (can be run multiple times), should it instead be called **ensure**?

After changing this back and forth, to ensure/create/add confusion, we sort of gave up and used aliases. 

## The solution

We use [Oclif][2] (The Open CLI Framework), which provides a few features we can use.

### Aliases

By using aliases, you don't have to think too hard on whether it's supposed to be get/set, show/edit or list/add/remove.

``` typescript
export default class UpstreamsShow extends Command {
  static aliases = ['upstreams:get', 'upstreams:list']
  static description = 'Show service upstreams'
  static usage = 'upstreams:show'
  static examples = [
    `$ aw upstreams:show -s hello-cats -e dev
Lists the upstream services for service 'hello-cats' in environment 'dev'.`,
    `$ aw upstreams:show
Lists the upstream services for current service (from repo). You will be prompted for environment.`,
  ]
  ...
}
```

### Help

By making sure all commands have a description, usage and possibly examples, `--help` becomes better. Examples are really good for commands with several arguments or flags. When using topics in Oclif, it's also helpful to add command descriptions in package.json as described on the [topics documentation page][3]

### Autocomplete

I also find [the autocomplete plugin][4] helpful, since you can just tab your way to the full command.

{{<html>}}
  <video style="max-width:100%" loop autoplay>
    <source src="oclif-cli.mp4" type="video/mp4">
  </video>
{{</html>}}

[1]: https://en.wikipedia.org/wiki/Idempotence
[2]: https://oclif.io/
[3]: https://oclif.io/docs/topics
[4]: https://github.com/oclif/plugin-autocomplete
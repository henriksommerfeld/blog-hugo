---
title: 'Tailscale to Remote Access Unifi Protect with Local Account'
url: '/tailscale-to-remote-access-unifi-protect-with-local-account'
date: 2025-07-10
draft: false
description: 'How I access Unifi Protect with a local account using Tailscale'
summary: 'I’ve been using Unifi Protect cameras ever since I got my Dream Wall in 2022 and one of its best characteristics is the independence of cloud services. With a UPS connected to the Dream Wall, my cameras can keep recording even when I lost power in the rest of the house.'
tags: [Network, Tailscale, Unifi, Home Assistant]
categories: [tools]
ogimage: local_consoles.png
---

I've been using [Unifi Protect cameras][2] ever since I got [my Dream Wall][1] in 2022 and one of its best characteristics is the independence of cloud services. With a {{<UPS />}} connected to the Dream Wall, my cameras can keep recording even when I lost power in the rest of the house.

Given that, I find it a bit strange that Ubiquiti pushes you to use a cloud account to the point of people having to ask on forums if it's even possible to use a local account.

## Cloud Account Slowness
I do have a cloud account and I would be fine with that if it worked nicely. With 2FA I hope it's secure enough and it's not a privacy concern that makes me favour a local account. When I log in to the Unifi Protect app on my iPhone using my cloud account, this is what it looks like. If I'm patient enough it might show my cameras eventually, but not always.

  {{<post-image image="protect_loading.png" alt="Screenshot of Unifi Protect iPhone app loading">}}
    <em>Loading for ages...</em>
  {{</post-image>}}

If I instead connect locally, it loads instantly.

{{<post-images>}}
  {{<post-image image="protect_without_ui_account.png" lightbox="true" alt="Screenshot of Unifi Protect iPhone app with 'Proceed without UI Account' highlighted">}}
  {{</post-image>}}
  {{<post-image image="protect_choose_manual_setup.png" lightbox="true" alt="Screenshot of Unifi Protect iPhone app with 'Manual setup' highlighted">}}
  {{</post-image>}}
  {{<post-image image="protect_manual_setup.png" lightbox="true" alt="Screenshot of Unifi Protect iPhone app entering 192.168.1.1 as address and a local username/password">}}
  {{</post-image>}}
{{</post-images>}}

## Remote Access with Local Account

The obvious limitation of using a local account is that it's _local_. But by using Tailscale on my phone or other device, I can reach my local network and my Unifi console at `192.168.1.1`. My Raspberry Pi that runs Home Assistant is on my tailnet and have _[Tailscale Subnet routers][3]_ enabled. That gives me access to both _Unifi Protect_, _Home Assistant_ and whatever else I find useful on my home network regardless of whether I'm home or not.

[1]: /my-unify-dream-wall
[2]: https://www.ui.com/physical-security
[3]: https://tailscale.com/kb/1019/subnets

+++
author = "admin"
bfa_virtual_template = ["hierarchy"]
categories = ["Tooling"]
date = "2013-01-21T14:30:06+00:00"
tags = ["VMWare Workstation"]
title = "VMware Workstation 9 User Hostility"
type = "article"
url = "/vmware-workstation-9-user-hostility/"

+++

The main reason I use VMware Workstation is the user-friendliness compared to Hyper-V or VirtualBox when using multiple machines in a common virtual network. Today I discovered a thing that could be made easier however. I'm mainly writing this for my own reference, if I stumble on the same thing sometime in the future, perhaps someone else does to.

I copied a group of virtual machines to a new disk and when I migrated them from an earlier version (7) I must have made some error, because the reference to the AD machine was still referring to the old disk. This was discovered when I had removed all the machines from the first disk where I now had other stuff occupying that space. VMware couldn't find the machine at the path it expected it to be at. Fair enough, must be a simple thing to change that path, right?

{{<figure src="/images/VMware_Workstation_9_problem.png" alt="VMware Workstation 9 File not found" caption="Could not open virtual machine. File not found.">}}

With the AD machine selected every option is greyed out, no prompt "would you like to browse for the file", nothing. So I started looking for a settings file, searched the registry for that incorrect path and finally I found it. This is how to fix the issue (I can think of more intuitive ways to support this in the product).

  1. Close VMware Workstation.
  2. Open `C:\Users\YourAccountName\AppDataRoaming\VMware\inventory.vmls` as a text file.
  3. Search the path from the error message (in my case `C:\VMImages\TIBP 2.0\TIBP - AD\TIBP - AD.vmx`) and change it to the correct path.
  4. Open VMware Workstation again and...voilà, it works! 😊

{{<figure src="/images/VMware_Workstation_9_fixed.png" alt="VMware Workstation 9 File found" caption="Could open virtual machine. File found.">}}
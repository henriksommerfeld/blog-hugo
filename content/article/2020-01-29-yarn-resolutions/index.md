---
title: "Yarn Resolutions to Fix Build Error With Multiple Versions of NPM Package"
url: 
date: 2020-01-29
summary: So, I upgraded Cypress from 3.7.0 to 3.8.2 and ran everything locally - no problems. But the build failed both in GitHub Actions and Netlify. I now had two conflicting versions. When using Yarn, this can be solved with Selective dependency resolutions, by adding the following to package.json
description: Shows that "resolutions" in package.json with Yarn can solve build errors with multiple versions of npm packages.
tags: [NodeJS]
categories: [Coding]
ogimage: 
draft: false
---

So, I upgraded [Cypress][3] from **3.7.0** to **3.8.2** and ran everything locally - no problems. 

But the build failed both in [GitHub Actions][4] and [Netlify][5] with the following messages:

```
7:07:06 PM: [3/4] Linking dependencies...
7:07:12 PM: [4/4] Building fresh packages...
7:07:16 PM: error /opt/build/repo/node_modules/@types/testing-library__cypress/node_modules/cypress: Command failed.
7:07:16 PM: Exit code: 1
7:07:16 PM: Command: node index.js --exec install
7:07:16 PM: Arguments:
7:07:16 PM: Directory: /opt/build/repo/node_modules/@types/testing-library__cypress/node_modules/cypress
7:07:16 PM: Output:
7:07:16 PM: Installing Cypress (version: 3.7.0)
7:07:16 PM: [18:07:13]  Downloading Cypress     [started]
7:07:16 PM: [18:07:13]  Downloading Cypress      0% 0s [title changed]
7:07:16 PM: failed during stage 'building site': Build script returned non-zero exit code: 1
```

Two things stuck out here: 
* It's types for **testing-library__cypress** that fails 
*  Cypress 3.7.0 is being downloaded for installation, even though I just upgraded to 3.8.2.

So, the types for [Cypress Testing Library][1] has a dependency to version 3.7.0 of [Cypress][3], but of course I only want one version of it. When using Yarn, this can be solved with [Selective dependency resolutions][2], by adding the following to `package.json`:

```
"resolutions": {
    "cypress": "3.8.2"
}
```

🎉 Success! 

I also learned that [Yarn has a _why_ command][6] that one can use to find out why a package is installed. `yarn why cypress` tells me this:

```
=> Found "cypress@3.8.2"
info Has been hoisted to "cypress"
info Reasons this module exists
   - Specified in "devDependencies"
   - Hoisted from "@testing-library#cypress#@types#testing-library__cypress#cypress"
```

[1]: https://testing-library.com/docs/cypress-testing-library/intro
[2]: https://yarnpkg.com/lang/en/docs/selective-version-resolutions/
[3]: https://www.cypress.io/
[4]: https://github.com/features/actions
[5]: https://www.netlify.com/
[6]: https://yarnpkg.com/lang/en/docs/cli/why/

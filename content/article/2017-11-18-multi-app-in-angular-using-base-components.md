---
title: "Code Sharing with Multi-app Angular Project Using Base Components"
url: "code-sharing-with-multi-app-angular-project-using-base-components"
date: 2017-11-18T11:51:22+01:00
categories: ["Coding"]
tags: ["Angular"]
---

I'm building a new version of a web shop in Angular that should be used on three different web sites for three of my client's subsidiary companies. In the current solution, everything but the CSS is common, even the HTML. That has proven to lack the necessary flexibility when the different subsidiaries have different needs and their design agencies are told that they are not allowed change the mark-up. Every change also has to be approved by all three subsidiaries, which takes time.

Since we're using the same REST API for all subsidiaries and the front-end logic should generally be the same, we don't want to create three separate Angular apps, since that would be a lot of code duplication. Code sharing with multiple apps in the same project isn't really top of mind in Angular.  `.angular-cli.json` supports the definition of multiple apps as described here: [stories multiple apps][1], but the Angular CLI still assumes one app named _app_, when generating a new component for example. By the way, I'm using Angular 5.0.1 at the time of writing this.

{{<highlight json>}}
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "project": {
    "name": "shopping"
  },
  "apps": [
    {
      "name": "subsidiary1-shopping",
      "root": "src",
      "outDir": "../../../dist/subsidiary1-shopping",
      "index": "subsidiary1/index.html",
      "main": "subsidiary1/main.ts",
      
      ...
    },
    {
      "name": "subsidiary2-shopping",
      "root": "src",
      "outDir": "../../../dist/subsidiary2-shopping",
      "index": "subsidiary2/index.html",
      "main": "subsidiary2/main.ts",

      ...
    }
  ]
  {...}
}
{{</highlight>}}

For services, pipes and plain classes code sharing isn't a problem since they can be defined at the project level and referenced in the respective app modules, but the _component logic_ is still bound to the component and we need to have different components to have different HTML and CSS for the different apps.

## Base components to the rescue

By creating base components at the project level that aren't rendered directly and don't have any mark-up or styling, we can create child components in the respective subsidiary apps that extends a base component and defines the template and CSS. 

{{<figure src="/images/base-component-angular-project-tree.png" link="/images/base-component-angular-project-tree.png" caption="Angular project tree (simplified)." alt="Angular project tree">}}

The base component contains all the logic and the corresponding spec file defines all the tests for the component and is therefore also shared code.

{{<highlight typescript>}}
@Component({
  selector: 'shopping-cart-base',
  template: ''
})
export class ShoppingCartBaseComponent implements OnInit, OnDestroy {
    // Shared component logic, hundreds of lines of code
    ...
}
{{</highlight>}}

The child component implemented by each subsidiary company (app), has an empty implementation and a single test case that only tests if the component can be created (what you get automatically when creating a component with Angular CLI). 

{{<highlight typescript>}}
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  animations: [fadeInAnimation, slideDownAnimation],
})
export class ShoppingCartComponent extends ShoppingCartBaseComponent {
  
}
{{</highlight>}}

If there is a need to have diverging logic as well, we can easily override the base component's property or method by simply defining it in the child component. Or if we want some additional logic in only one of the apps, that's just as easy by adding it to that app's child component. The best of both worlds!

[1]: https://github.com/angular/angular-cli/wiki/stories-multiple-apps

---
title: "Create Fake Backend with Node Express"
url: "create-fake-backend-with-node-express"
date: 2018-03-04T18:16:00+01:00
categories: ["Coding"]
tags: ["NodeJS", "JavaScript"]
---

The thing I'm most satisfied with in a long time is the introduction of a fake backend for my team's frontend development. When you have another system that you depend on and that you have no control over, it's always worth considering if that system can be replaced with a fake version for development. 

This is especially valuable when this backend system(s) is highly configurable and can be in a lot of different "states" that you cannot control. The web app we're currently building is a business-to-business web shop and orders need to be validated deep down in SAP. Which customers are allowed to pay by invoice and/or by credit card, their credit card limit, if they are allowed to place an order even when the credit card limit is exceeded, if they are allowed to return products, see order history or download invoices as PDF, delivery information and terms, discount rates, shipping costs etc, are all configurable settings. This can be set per country, customer and user. Some users can place products in the shopping cart, but are not allowed to send the order. I've found that the test environment for some countries are only available _"during office hours"_ and I had to ask what time zone they were referring to.

If we add the usual technical challenges such as VPN and corporate proxies, _localhost_ seems like an attractive place to host the "backend" during development.

The easiest way I found to create such a fake backend was with Node.js + Express. I chose to serve static json files with some additional logic so that you can add a product to the cart and get the updated active cart when you ask for it. In the code below you can see this behaviour when deleting the cart. But I don't have any persistence here, so restarting the app will always reset it to the same state. This means that I can go directly to the checkout route in my web UI without adding items to the cart (they are already there). Here are the benefits I see with this approach.

* Return all possible HTTP codes (or not respond at all)
* Live reload when changing response, independent of frontend
* Control exactly how many milli-seconds it takes to respond (spinners)
* Reproduce bugs with saved json response

## Return all possible HTTP codes (or not respond at all)
One thing that is otherwise cumbersome to test is how the frontend app behaves for different responses from the REST service. With this setup it's very easy to simulate a 403, 404, 500 or whatever. You can let the fake backend immediately return a 408 (timeout), the fastest possible timeout. You can stop the fake backend to see what the users will see it the backend service doesn't respond at all.

## Live reload when changing response, independent of frontend
By letting the fake backend utilise _live reload_ your changes to the fake backend code or any of the statically served json responses will immediately take effect on the next request it gets.

## Control exactly how many milli-seconds it takes to respond (spinners)
A general drawback with local development environments are that developers can overlook slowness of their application. Real users will not access your service against _localhost_ and thus have longer response times. By setting exactly how many milli-seconds it should take for your fake backend to respond, you can play around with spinners and loading messages to see that your app doesn't appear dead when a button is clicked.

## Reproduce bugs with saved json response
If I can reproduce a bug in any of our test environments, I don't have to replicate the same configuration with country, customer and user in my local environment against the test backend. Instead, since we're console logging all responses, see [Using Angular HTTP Interceptor for Logging][1], it's easy to right-click on a response in _Chrome Dev Tools_, copy it and save it as a json file that I can attach to the bug report. Then I or someone else on the team can dump that file into the fake backend and make the relevant service method respond with that data. We then have a situation where we can reproduce the bug as many times as we need without any external dependencies. 

## The code

So, here is the small sample of the fake backend we're using (all but three methods have been removed for brevity). 

{{<highlight javascript>}}
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) { setTimeout(next, 400) });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let activeCartFilePath = path.join(__dirname, 'json/active-shopping-cart.json');
let activeCartFile = fs.readFileSync(activeCartFilePath);
let activeCart = JSON.parse(activeCartFile);

app.get('/', function (req, res, next) {
    res.status(200).send('Welcome to the Mocked Shopping Service!. Look at app.js to see the available endpoints.');
});

app.get('/cart', function (req, res) {
    res.json(activeCart);
})

app.delete('/cart', (req, res) => {
    let emptyCartPath = path.join(__dirname, 'json/empty-cart.json');
    let emptyFile = fs.readFileSync(emptyCartPath);
    let emptyCart = JSON.parse(emptyFile);

    activeCart = emptyCart;
    res.sendStatus(200);
    //res.sendStatus(500);    
})

app.listen(54321);
{{</highlight>}}

As you can see above, I've set the fake backend to listen on port 54321 and to accept calls from any domain and port number. A parameter passed to the frontend project determines if this fake backend or a real one should be used. `app.js` is the file above, and below you have `package.json` where `nodemon` is used to achieve live reload. 

{{<highlight json>}}
{
  "name": "shopping-api-mock",
  "version": "1.0.0",
  "description": "Mocked API to use when developing frontend shopping in Angular",
  "scripts": {
    "start": "nodemon app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.3",
    "nodemon": "^1.11.0"
  }
}
{{</highlight>}}

[1]: /using-angular-http-interceptor-for-logging/ 
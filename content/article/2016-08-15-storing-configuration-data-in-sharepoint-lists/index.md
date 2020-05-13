+++
author = "admin"
categories = ["Coding"]
date = "2016-08-15T19:06:27+00:00"
tags = ["SharePoint", "JavaScript"]
title = "Storing Configuration Data in SharePoint Lists"
type = "article"
url = "/storing-configuration-data-in-sharepoint-lists/"

+++

I have stored settings in applications built on SharePoint in a number of ways over the years, including SharePoint lists, the property bag and even web.config. As I have done most of the recent development using AngularJS and also had the need to store and fetch configuration values beyond simple data types, I have start using another way of storing these settings.

By storing text files with json configuration objects in a document library I get a couple of benefits. First of all I do not need server access or super-high permissions, which is always good, but a must if we're talking about a cloud hosted solution. Secondly, I can have configuration beyond what I have usually used with SharePoint lists, where it has typically been booleans and integer values (like switching something on and off, setting number of items displayed in a listing etc.)

In a recent requirement I had to present users with the ability to choose a language if they belonged to specific countries during newsletter sign up. For some countries the newsletter was available in multiple languages, for most countries in one specific language and in English for the rest.

## Step one

I started out by creating a hard-coded object to figure out how it needed to look like. When everything was working I added a method to my service that fetches the configuration file from a document library in SharePoint named _Configuration_.

{{<code javascript>}}
// MAN = My Abbreviated Namespace
// Obviously I have stripped out other methods here
angular.module('MAN').service('newsSubscriptionService', ['$http', function ($http) {
  var service = {};

  service.getCountryLanguageSettings = function () {
    return $http({
      method: 'GET',
      url: "/configuration/newsletter-subscription-countries-languages.txt"
    });
  };    
  
  return service;
}]);
{{</code>}}

## Step two

I created a the document library _Configuration_ in SharePoint with the appropriate permissions. Since this isn't an especially user-friendly configuration format I restricted the write permissions to the dev team. The idea here is not to change these settings often, but rather to be able to do it without a deploy. Then I added the file with the configuration object, in this case an array with countries and their respective languages. Since SharePoint by default considers a lot of file extensions to be harmful (like .json and .config for example), I just made a txt file. This file is a bit longer in reality, but you get the point. Since English is the default language I do not store that.

{{<code json>}}
[
  {
    "CountryCode" : "de",
    "Languages": [
      { "Locale": "de-DE", "Title": "Deutsch" }
    ]
  },
  {
    "CountryCode" : "be",
    "Languages": [
      { "Locale": "nl-NL", "Title": "Nederlands" }
    ]
  },
  {
    "CountryCode" : "nl",
    "Languages": [
      { "Locale": "nl-NL", "Title": "Nederlands" }
    ]
  },
  {
    "CountryCode" : "lu",
    "Languages": [
      { "Locale": "nl-NL", "Title": "Nederlands" }
    ]
  },
  {
    "CountryCode" : "ch",
    "Languages": [
      { "Locale": "de-DE", "Title": "Deutsch" },
      { "Locale": "fr-FR", "Title":  "Français" },
      { "Locale": "it-IT", "Title":  "Italiano" }
    ]
  }
]  
{{</code>}}

As any good solution, this is far from rocket science, that's why I like it.
---
title: "Replacing Web Compiler With Node Sass"
url: "replacing-webcompiler-with-node-sass"
date: 2017-10-30T05:48:41+01:00
categories: ["Coding"]
tags: ["NodeJS", "CSS", "JavaScript"]
---

After a long time of unreliable results with [Web Compiler][1], especially in TFS, I decided to replace it with `node-sass`.

Web Compiler is an extension to Visual Studio that listens to changes in your `.scss` files (among others) and compiles them. It can also be configured to run as part of your TFS build. With our solution this has however been highly unreliable, where Web Compiler claims that files have been compiled, but the changes you made are not reflected in the resulting bundles. This has caused extra work in our team of about 15 developers, where a bug fix you made is overwritten by some other change and not included in the CSS bundle in the integration environment the next day.

Since I hadn't got the impression that this was a big issue for other team members in our local development environment, I decided to keep Web Compiler in Visual Studio and use its `compilerconfig.json` as configuration for which bundles to create. In reality we have quite a few more bundles for different parts of the application, so that was also a reason to keep the existing configuration.

{{<code json>}}
[
  {
    "outputFile": "Layouts/OurSolution/bundles/main.css",
    "inputFile": "Layouts/OurSolution/CSS/main.scss",
    "minify": {
      "enabled": true
    },
    "sourceMap": true
  },
  {
    "outputFile": "Layouts/OurSolution/CSS/bundles/fonts.css",
    "inputFile": "Layouts/OurSolution/CSS/fonts.scss",
    "minify": {
      "enabled": true
    },
    "sourceMap": true
  },
  {
    "outputFile": "Layouts/OurSolution/CSS/bundles/admin-pages.css",
    "inputFile": "Layouts/OurSolution/CSS/pages/admin-pages.scss",
    "minify": {
      "enabled": true
    },
    "sourceMap": true
  },
  {
    "outputFile": "SPIs/Styles/DesignArtifacts/css/print.css",
    "inputFile": "SPIs/Styles/DesignArtifacts/css/print.scss",
    "minify": {
      "enabled": true
    },
    "sourceMap": true
  }
]
{{</code>}}
_compilerconfig.json_

This is more of a quick hack than well-crafted code, but it has turned out to work great. Now I can rely on my changes to reach the integration and test environments after the next nightly deploy.

{{<code javascript>}}
let fs = require('fs');
let path = require('path');
let sass = require('node-sass');
let colors = require('colors/safe');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  });

let compilerConfigFilePath = path.resolve(__dirname, 'compilerconfig.json');
let compilerConfig = require(compilerConfigFilePath);

function addMinExtension(fileName) {
    return fileName.substr(0, fileName.lastIndexOf(".")) + ".min.css";
}

function parseConfigItem(item) {
    if (!item || !item.inputFile || !item.outputFile) {
        let invalidItem = (item && item.inputFile) || 'item';
        console.log(colors.warn("Ignoring invalid " + invalidItem + ' in ' + compilerConfigFilePath));
        return null;
    }

    return {
        'inputFile': item.inputFile,
        'outputFile': item.outputFile,
        'outputFileMinified': addMinExtension(item.outputFile),
    };
}

function saveFile(dataToSave, filePath, message, callback) {
    fs.unlink(filePath, (err) => {

        if (err && err.code !== 'ENOENT')
            throw err;

        let options = { flag : 'w' };
        fs.writeFile(filePath, dataToSave, options, (err) => {
            if (err) 
                console.log(colors.error(err));
            else {
                console.log(colors.info(message));
                callback && callback();
            }
        });
    });
}

function compileFile(file, minified) {
    if (!file)
        return;
    
    let outputStyle = minified ? 'compressed' : 'expanded';
    let sourceMap = minified;
    let sourceMapEmbed = !minified;
    let outputFileName = minified ? file.outputFileMinified : file.outputFile;

    let result = sass.render({
        file: file.inputFile,
        outputStyle: outputStyle,
        outFile: outputFileName,
        sourceMap: sourceMap, 
        sourceMapEmbed: sourceMapEmbed
    }, (error, result) => {
        if (error) {
            let errorToLog = error.formatted || error;
            console.log(colors.error(errorToLog));
        }
        else {
            let outputFilePath = path.resolve(__dirname, outputFileName);
            let compiledMessage = 'Saved compiled file ' + outputFileName;
            saveFile(result.css.toString(), outputFilePath, compiledMessage);
            
            if (result.map) {
                let mapFileName = outputFileName + '.map';
                let savedMessage = 'Saved map file ' + mapFileName;
                saveFile(result.map.toString(), mapFileName, savedMessage)
            }
        }});
}

let files = compilerConfig.map(x => parseConfigItem(x));

files.forEach((file) => {
    compileFile(file, false);
    compileFile(file, true);
});

{{</code>}}

[1]: https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler
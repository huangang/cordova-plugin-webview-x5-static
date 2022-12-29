#!/usr/bin/env node
var path = require('path');
var fs = require('fs');

module.exports = function (context) {
    var pluginDir = context.opts.plugin.dir,
        projectRoot = context.opts.projectRoot;

    // android platform available?
    if (context.opts.cordova.platforms.indexOf("android") === -1) {
        throw new Error("Android platform has not been added.");
    }

    var originalApplicationName;
    var manifestFile = path.join(projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    if (fs.existsSync(manifestFile)) {
        var manifestData = fs.readFileSync(manifestFile, 'utf8');
        // var reg = /<application[a-zA-Z0-9_"'.@$:=\\s]*>/gm;// 正则中中括号里的点号 匹配本身，不再是原有规则
        var regApp = /<application[^>]*>/gm;
        var regAppName = /android[ ]*:[ ]*name[ ]*=[ ]*"[.$\w]*"/g;
        var matchApp = manifestData.match(regApp);
        var matchAppName;
        if (matchApp && matchApp.length === 1) {
            matchAppName = matchApp[0].match(regAppName);
            if (matchAppName && matchAppName.length === 1) {
                var strs = matchAppName[0].split(/"/);
                if (strs && strs.length === 3) {
                    originalApplicationName = strs[1];
                }
            }
        }
        var filename = 'MainApplication.java';
        var pluginAppFilePath = path.join(pluginDir, 'platforms/android/src/com/huangang/cordova/x5/', filename);
        var AppFilePath = path.join(projectRoot, 'platforms/android/app/src/main/java/com/huangang/cordova/x5/', filename);
        var appClass = 'com.huangang.cordova.x5.MainApplication';
        if (originalApplicationName === appClass) {
            return;
        }
        if (originalApplicationName) {
            // found application in AndroidManifest.xml, change it and let our app extends it
            var data = fs.readFileSync(pluginAppFilePath, { encoding: 'utf-8' });
            data = data.replace(/extends android.app.Application {/gm, `extends ${originalApplicationName} {`);
            fs.writeFileSync(AppFilePath, data);
            var updateAppName = matchAppName[0].replace(/"[^"]*"/, `"${appClass}"`);
            var updateApp = matchApp[0].replace(regAppName, updateAppName);
            manifestData = manifestData.replace(regApp, updateApp);
        } else {
            // found no application in AndroidManifest.xml, create it
            manifestData = manifestData.replace(/<application/g, '<application android:name="' + appClass + '"');
        }
        fs.writeFileSync(manifestFile, manifestData, 'utf8');
    } else {
        throw new Error("AndroidManifest.xml is not exists.");
    }
};

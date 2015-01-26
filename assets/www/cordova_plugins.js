cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/net.orworks.cordovaplugins.cordovasqlite/www/cordovasqlite.js",
        "id": "net.orworks.cordovaplugins.cordovasqlite.cordovaSQLite",
        "clobbers": [
            "cordovaSQLite"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.ionic.keyboard": "1.0.3",
    "org.apache.cordova.console": "0.2.12",
    "org.apache.cordova.device": "0.2.13",
    "net.orworks.cordovaplugins.cordovasqlite": "1.5"
}
// BOTTOM OF METADATA
});
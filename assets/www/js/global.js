var myGlobal = {
    getQueryStringRegExp : function(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " ")); return "";
    },

    db : "file:///mnt/sdcard/sh3h_html/meterreading/data/main.cbj"
};
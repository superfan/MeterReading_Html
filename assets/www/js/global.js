var myGlobal = {
    getQueryStringRegExp : function(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " ")); return "";
    },

    db : "file:///mnt/sdcard/sh3h_html/meterreading/data/main.cbj",

    id : 10000,

    baseUrl : "http://128.1.2.106:8084/", //http://128.1.3.186:8084

    login : function(http, account, password, success, error) {
        var request = {
            method: 'POST',
            url: this.baseUrl + '/user.ashx',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-JSON-RPC': 'Login'
            },
            data: '{\"id\":' + (this.id++) + ',\"method\":\"' + 'Login' + '\",\"params\":'
                    + '{ "loginfo" : {"Account":"' + account + '","VerType":"Simple","Password":"' + password + '"} } }'
        };

        http(request).success(success).error(error);
    }
};
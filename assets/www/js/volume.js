angular.module('volume', ['ionic'])
.controller('VolumeCtrl', function($scope, $interval) {
    $scope.account = myGlobal.getQueryStringRegExp("account");
    $scope.volume = myGlobal.getQueryStringRegExp("volume");

    $scope.items = [];
    //  for (var i = 0; i < 1000; i++) {
    //    $scope.items.push('Item ' + i);
    //  }

    $scope.onBack = function() {
        window.history.back();
        /*for (var i = 0; i < 20; ++i) {
                    $scope.items[i] = {
                        xuhao : 1111,
                        cid : 222,
                        name :  333,
                        address : 444,
                        shangcicm : 5555,
                        bencicm : 666,
                        chaojiansl : 777,
                        chaobiaozt : 888
                    };
                }*/
    }

    var timeoutId;
    var data;

    function update() {
        $interval.cancel(timeoutId);
        $scope.items = data;
    }

    function onTaskSuccess(results) {
        data = new Array();
        for (var i = 0; i < results.length; ++i) {
            data[i] = {
                xuhao : results[i][0],
                cid : results[i][1],
                name :  results[i][2],
                address : results[i][3],
                shangcicm : results[i][4],
                bencicm : results[i][5],
                chaojiansl : results[i][6],
                chaobiaozt : results[i][7]
            };
        }

        $scope.items = data;

        timeoutId = $interval(function() {
            update(); // update DOM
        }, 0);
    }

    function onTaskFailure() {
        alert("failure to get the task!");
    }

    function onDBSuccess() {
        var sql = "select sj.I_CENEIXH, sj.S_CID, bk.S_KeHuMC, bk.S_DiZhi, sj.I_SHANGCICM, sj.I_BENCICM, sj.I_CHAOJIANSL, sj.S_ZHUANGTAIMC \
                   from CB_CHAOBIAOSJ sj, KG_BIAOKAXX bk \
                   where sj.S_CH = '" + $scope.volume + "' \
                   and sj.S_CID = bk.S_CID \
                   order by sj.I_CENEIXH";
        window.cordovaSQLite.execQueryArrayResult(sql,
            [],
            onTaskSuccess,
            onTaskFailure);
    }

    function onDBFailure() {
        alert("failure to open db!");
    }

    function onDeviceReady() {
        window.cordovaSQLite.openDatabase("file:///mnt/sdcard/sh3h/meterreading/data/main.cbj",
            0,
            onDBSuccess,
            onDBFailure);
    }

    document.addEventListener("deviceready", onDeviceReady, false);
});
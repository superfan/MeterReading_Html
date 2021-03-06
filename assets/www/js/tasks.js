angular.module('tasks', ['ionic'])
.controller('TasksCtrl', function($scope, $interval) {
    $scope.account = myGlobal.getQueryStringRegExp("account");

    $scope.items = [
    ];

    $scope.onBack = function() {
        window.history.back();
        /*for (var i = 0; i < 100; ++i) {
            $scope.items[i] = {
                        volume : 'a1',
                        year_month : 'a2',
                        period :  'a3',
                        count : '0/120'
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
                volume : results[i][0],
                year_month : results[i][1],
                period :  results[i][2],
                count : results[i][3] + "/" + results[i][4]
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
        var sql = "select S_CH, I_ZhangWuNY, S_CHAOBIAOZQ, I_YiChaoShu, I_ZongShu from CB_ChaoBiaoRW \
            where S_ChaoBiaoYBH = " + $scope.account;
        window.cordovaSQLite.execQueryArrayResult(sql,
            [],
            onTaskSuccess,
            onTaskFailure);
    }

    function onDBFailure() {
        alert("failure to open db!");
    }

    function onDeviceReady() {
        window.cordovaSQLite.openDatabase(myGlobal.db,
            0,
            onDBSuccess,
            onDBFailure);
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    //document.addEventListener("backbutton", function(){
    //}, false);
});
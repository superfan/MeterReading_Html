angular.module('login', ['ionic'])
.controller('LoginCtrl', function($scope) {
    var isOpened = false;

    $scope.user = {
        name: "",
        password: ""
    };

    $scope.onLogin = function() {
        if (isOpened) {
            var sql = "select * from user where Account = "
                        +  $scope.user.name + " and PassWord = " + $scope.user.password
            window.cordovaSQLite.execQuerySingleResult(sql,
                                [],
                                function(result) {
                                    //alert("555555555");
                                    location.href = "main.html";
                                },
                                function() {
                                    alert("name or password is not correct!!!");
                                });
        }
        else {
            alert("db is not opened!!!");
        }

        //alert("1234");
        /*if (window.loginModel.onLogin($scope.user.name, $scope.user.password)) {
            alert("success");
            location.href = "main.html";
        }
        else {
            alert("failure");
        }*/
        /*mydb.query("CREATE TABLE user (userName TEXT(50), PassWord TEXT(50), Account TEXT(50))",
            function(ret) {
                        if (ret.length == 0) {
                            alert("1111");
                        }
                        else {
                            alert("2222");
                        }
                    });*/
        /*var sql = "select * from user where Account = "
            +  $scope.user.name + " and PassWord = " + $scope.user.password;
        mydb.fetchAll(sql, function(ret) {
            if (ret.length == 0) {
                alert("1111");
            }
            else {
                alert("2222");
            }
        });*/
        //mydb.checkUser($scope.user.name, $scope.user.password);
    };

    function onDeviceReady() {
        window.cordovaSQLite.openDatabase("file:///mnt/sdcard/sh3h/meterreading/data/main.db", 0,
            function() {
                isOpened = true;
            },
            function() {
               isOpened = false;
            });
    }

    document.addEventListener("deviceready", onDeviceReady, false);
});

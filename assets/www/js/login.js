angular.module('login', ['ionic'])
.controller('LoginCtrl', function($scope, $http) {
    var isOpened = false;

    $scope.user = {
        name: "",
        password: ""
    };

    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    }

    $scope.onLogin = function() {
        checkConnection();
        function success(response) {
            if (response.result.success) {
                location.href = "main.html?account=" + $scope.user.name;
            }
            else {
                alert("name or password is not correct!!!");
            }
        }

        function error(response) {
            alert("name or password is not correct!!!");
        }

        myGlobal.login($http, $scope.user.name, $scope.user.password, success, error);


        /*var request = {
            id : 12345,
            method : 'Login',
            params : '{ "loginfo" : {"Account":"2134","VerType":"Simple","Password":"0000"} }'
        };

        callSync(request);*/

        /*if (isOpened) {
            var sql = "select * from user where Account = '"
                        +  $scope.user.name + "' and PassWord = '" + $scope.user.password + "'";
            window.cordovaSQLite.execQuerySingleResult(sql,
                                [],
                                function(result) {
                                    if (result != null) {
                                        location.href = "main.html?account=" + $scope.user.name;
                                    }
                                    else {
                                        alert("name or password is not correct!!!");
                                    }
                                },
                                function() {
                                    alert("name or password is not correct!!!");
                                });
        }
        else {
            alert("db is not opened!!!");
        }*/
    };

    function callSync(request) {
        /*$http.get("http://www.w3cschool.cc/try/angularjs/data/Customers_JSON.php")
            .success(function(response) {
            $scope.names = response;
        });*/
        var http = window.XMLHttpRequest ?
            new XMLHttpRequest() :
            new ActiveXObject('Microsoft.XMLHTTP');
        http.open('POST', 'http://128.1.3.186:8084/user.ashx', false);
        http.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
        http.setRequestHeader('X-JSON-RPC', request.method);
        //http.setRequestHeader('Access-Control-Allow-Origin', '*');
        http.send('{\"id\":' + request.id + ',\"method\":\"' + request.method + '\",\"params\":' + request.params + '}');
        if (http.status != 200) {
            throw { message : http.status + ' ' + http.statusText, toString : function() { return this.message; } };
        }
        var clockStart = new Date();
        var response = JSON.parse(http.responseText);
        response.timeTaken = (new Date()) - clockStart;
        response.http = { text : http.responseText, headers : http.getAllResponseHeaders() };
        return response;
    }

    /*function onDeviceReady() {
        window.cordovaSQLite.openDatabase(myGlobal.db, 0,
            function() {
                isOpened = true;
            },
            function() {
               isOpened = false;
            });
    }

    document.addEventListener("deviceready", onDeviceReady, false);*/
});

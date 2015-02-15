angular.module('main', ['ionic'])
.controller('MainCtrl', function($scope) {
    $scope.onQuit = function() {
        alert("quit");
    }

    $scope.account = myGlobal.getQueryStringRegExp("account");

});
angular.module('main', ['ionic'])
.controller('MainCtrl', function($scope) {

 $scope.onClick = function(obj) {
    var flag = true;
    if(flag){
        obj.style.backgroundColor = "red";
        flag = false;
    }else{
        obj.style.backgroundColor = "yellow";
        flag = true;
    }
 }
});
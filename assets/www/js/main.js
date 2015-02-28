angular.module('main', ['ionic'])
.controller('MainCtrl', function($scope) {
    $scope.onQuit = function() {
        alert("quit");
    }

    $scope.account = myGlobal.getQueryStringRegExp("account");

    $scope.onClick = function() {
        alert("abc");
    }
})
.directive('myClick', ['$document', function($document) {
  return function(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0;

    //element.children().css({
    //    border: '1px solid red'
    //});

    /*element.css({
     position: 'relative',
     border: '1px solid red',
     backgroundColor: 'lightgrey',
     cursor: 'pointer'
     //background-image: url('../img/ic_home_mytask.png')
    });*/

    element.on('click', function(event) {
        //element.children().css({
            /*position: 'relative',
            top: '10px',
            left: '10px',
            border: '1px solid blue'*/
        //    background: '#ff0000'
        //});
    });

    element.on('touchstart', function(event) {
        element.children().css({
            background: '#C0C0C0'
        });
        $document.on('touchend', touchend);
        $document.on('touchcancel', touchend);
    });

    function touchend() {
        element.children().css({
            background: '#ffffff'
        });
        $document.off('touchend', touchend);
        $document.off('touchcancel', touchend);
    }

    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
        element.children().css({
            background: '#C0C0C0'
        });
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
    }

    function mouseup() {
      element.children().css({
        background: '#ffffff'
      });
      $document.off('mousemove', mousemove);
      $document.off('mouseup', mouseup);
    }
  };
}]);
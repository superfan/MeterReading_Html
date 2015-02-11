angular.module('splash', ['ionic'])
.controller('SplashCtrl', function($scope) {
    /*function writeToFile() {
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFSForWrite, fail);
    }

    function gotFSForWrite(fileSystem) {
        fileSystem.root.getFile("CordovaSample.txt", {create: true, exclusive: false}, gotWriteFileEntry, fail);
    }

    function gotWriteFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        var userText = "abc";
        writer.seek(writer.length);
        writer.write('\n\n' + userText);
        writer.onwriteend = function(evt){
            alert("You wrote ' " + userText + " ' at the end of the file.");
        }
        //$('#userInput').val("");
    }

    function fail(error) {
        alert(error.code);
    }*/

    /*$scope.click = function() {
        myfile.createDirectory(myfile.folderConfig);
        myfile.createDirectory(myfile.folderUser);
        myfile.createDirectory(myfile.folderData);
        myfile.createDirectory(myfile.folderImages);
        myfile.createDirectory(myfile.folderConfig);
        myfile.createDirectory(myfile.folderConfig);
    };*/

    /*var progressbar = $('#progressbar'),
            max = progressbar.attr('max'),
            time = (1000/max)*5,
            value = progressbar.val();

        var loading = function() {
            value += 1;
            addValue = progressbar.val(value);

            $('.progress-value').html(value + '%');

            if (value == max) {
                clearInterval(animate);
            }
        };

        var animate = setInterval(function() {
            loading();
        }, time);*/
})
.directive('myProgress', ['$interval', function($interval) {
    function link(scope, element, attrs) {
        document.addEventListener("deviceready", function() {
            var timeoutId;
            var value = 0;
            var max = element.attr('max');

            function update() {
                value += 10;
                element.val(value);
                if (value == max) {
                    $interval.cancel(timeoutId);
                    location.href = "login.html";
                }
            }

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
              update(); // update DOM
            }, 1000);
        }, false);
    }

    return {
        link: link
    };
}]);

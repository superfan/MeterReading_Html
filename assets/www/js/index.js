(function() {
    var percent = 0;
    var interval = window.setInterval(timeCallback, 1000);
    function timeCallback() {
        percent += 10;
        if (percent <= 100) {
            //console.log('index_interval: ' + percent);
            document.getElementById("p-progressbar").style.width = percent + "%";
            //document.getElementById("p-progressbar").innerHTML = percent;
        }
        else {
            window.clearInterval(interval);
            //alert("ddd");
            location.href = "login.html";
        }
    }
})();

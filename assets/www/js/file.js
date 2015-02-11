var myfile = (function() {
    var data = null; //data need write
    var directory = null;
    var fileName = null; //default file name

    // create a directory if it is not existing
    function onDirectorySuccessCallback(newFile) {
        fileSystem.root.getDirectory(directory, {
            create : true,
            exclusive : false
        }, onDirectorySuccess, onDirectoryFail);
    }

    function onDirectorySuccess(newFile) {
        console.log("create a directory successfully!!!");
    }

    function onDirectoryFail(error) {
        console.log("failure to create a directory!!!");
    }


    // 获取目录，如果不存在则创建该目录
        function onFileSystemSuccess(fileSystem) {
            newFile = fileSystem.root.getDirectory(directory, {
                create : true,
                exclusive : false
            }, onDirectorySuccess, onFileSystemFail);
        }

    /**
    * 获取FileWriter对象，用于写入数据
    * @param fileEntry
    */
    function onFileSuccess(fileEntry) {
        fileEntry.createWriter(onFileWriterSuccess, onFileSystemFail);
    }

    /**
    * write data
    * @param writer
    */
    function onFileWriterSuccess(writer) {
        //	log("fileName="+writer.fileName+";fileLength="+writer.length+";position="+writer.position);
        writer.onwrite = function(evt) {//当写入成功完成后调用的回调函数
            console.log("write success");
        };

        writer.onerror = function(evt) {//写入失败后调用的回调函数
            console.log("write error");
        };

        writer.onabort = function(evt) {//写入被中止后调用的回调函数，例如通过调用abort()
            console.log("write abort");
        };

        // 快速将文件指针指向文件的尾部 ,可以append
        //	writer.seek(writer.length);
        writer.write(data);//向文件中写入数据
        //	writer.truncate(11);//按照指定长度截断文件
        //	writer.abort();//中止写入文件
    }


    function onFileSystemFail(error) {
        console.log("Failed to retrieve file:" + error.code);
    }

    return {
        folderRoot : "sh3h3/meterreading",
        folderConfig : folderRoot + "/config",
        folderUser : folderRoot + "/user",
        folderData : folderRoot + "/data",
        folderImages : folderRoot + "/images",
        folderSounds : folderRoot + "/sounds",
        folderUpdate : folderRoot + "/update",
        folderLog : folderRoot + "/log",

        /*writeToFile : function(data, directory, fileName) {
            this.data = data;
            this.directory = directory;
            this.fileName = fileName;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        },*/

        createDirectory : function(directory) {
            this.directory = directory;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onDirectorySuccessCallback, onFileSystemFail);
        }

    };
})();
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


    // ��ȡĿ¼������������򴴽���Ŀ¼
        function onFileSystemSuccess(fileSystem) {
            newFile = fileSystem.root.getDirectory(directory, {
                create : true,
                exclusive : false
            }, onDirectorySuccess, onFileSystemFail);
        }

    /**
    * ��ȡFileWriter��������д������
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
        writer.onwrite = function(evt) {//��д��ɹ���ɺ���õĻص�����
            console.log("write success");
        };

        writer.onerror = function(evt) {//д��ʧ�ܺ���õĻص�����
            console.log("write error");
        };

        writer.onabort = function(evt) {//д�뱻��ֹ����õĻص�����������ͨ������abort()
            console.log("write abort");
        };

        // ���ٽ��ļ�ָ��ָ���ļ���β�� ,����append
        //	writer.seek(writer.length);
        writer.write(data);//���ļ���д������
        //	writer.truncate(11);//����ָ�����Ƚض��ļ�
        //	writer.abort();//��ֹд���ļ�
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
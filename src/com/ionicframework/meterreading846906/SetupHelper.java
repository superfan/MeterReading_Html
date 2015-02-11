package com.ionicframework.meterreading846906;


import android.content.Context;
import android.content.res.AssetManager;
import android.os.Environment;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class SetupHelper {
    /**
     * 根目录
     */
    public static final String FOLDER_ROOT = "sh3h/meterreading";
    /**
     * www文件目录
     */
    public static final String FOLDER_WWW = FOLDER_ROOT + "/www";
    /**
     * 配置文件目录
     */
    public static final String FOLDER_CONFIG = FOLDER_ROOT + "/config";
    /**
     * 多用户配置文件目录
     */
    public static final String FOLDER_USER = FOLDER_ROOT + "/user";
    /**
     * 数据配置文件目录
     */
    public static final String FOLDER_DATA = FOLDER_ROOT + "/data";

    /**
     * 用户配置文件名
     */
    public static final String FILE_USER_CONFIG = "user.properties";

    /**
     * 用户登录信息文件名
     */
    public static final String FILE_USER_LOGIN = "login.properties";

    /**
     * 版本记录号
     */
    public static final String FILE_VERSION_UPDATE = "versions.properties";
    /**
     * 系统参数文件名
     */
    public static final String FILE_SYSTEM_CONFIG = "system.properties";

    /**
     * Map参数文件名
     */
    public static final String FILE_MAP_CONFIG = "map.properties";

    /**
     * 用户配置文件名
     */
    public static final String FILE_USER = "users.xml";
    /**
     * 在线用户配置文件名
     */
    public static final String FILE_ONLINE_USER = "online-users.xml";
    /**
     * 词语配置文件名
     */
    public static final String FILE_WORDS = "words.xml";

    /**
     * 图片存储目录
     */
    public static final String FOLDER_IMAGES = FOLDER_ROOT + "/images";
    /**
     * 声音存储目录
     */
    public static final String FOLDER_SOUNDS = FOLDER_ROOT + "/sounds";
    /**
     * 更新文件存储目录
     */
    public static final String FOLDER_UPDATE = FOLDER_ROOT + "/update";
    /**
     * 日志文件存储目录
     */
    public static final String FOLDER_LOG = FOLDER_ROOT + "/log";

    private Context _context = null;

    /**
     * SetupHelper构造函数
     *
     * @param context
     */
    // AssetManager am = null;
    public SetupHelper(Context context) {
        _context = context;
    }

    /**
     * 初始化系统目录、默认配置文件
     *
     * @return
     */
    public void initDefaultDirectoriesAndFiles() {
        try {
            File sdDir = Environment.getExternalStorageDirectory();
            File configDir = new File(sdDir, FOLDER_WWW);
            if (!configDir.exists()) {
                configDir.mkdirs();
                copyAssets("www", configDir.getPath());
            }



        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void copyAssets(String assetDir, String dir) {
        String[] files;
        try {
            // 获得Assets一共有几多文件
            files = _context.getAssets().list(assetDir);
        } catch (IOException e1) {
            return;
        }

        File mWorkingPath = new File(dir);
        // 如果文件路径不存在
        if (!mWorkingPath.exists()) {
            // 创建文件夹
            if (!mWorkingPath.mkdirs()) {
                // 文件夹创建不成功时调用
            }
        }

        for (int i = 0; i < files.length; i++) {
            try {
                // 获得每个文件的名字
                String fileName = files[i];
                // 根据路径判断是文件夹还是文件
                if (!fileName.contains(".")) {
                    if (0 == assetDir.length()) {
                        copyAssets(fileName, dir + fileName + "/");
                    }
                    else {
                        copyAssets(assetDir + "/" + fileName, dir + "/"
                                + fileName + "/");
                    }

                    continue;
                }

                File outFile = new File(mWorkingPath, fileName);
                if (outFile.exists()) {
                    outFile.delete();
                }

                InputStream in = null;
                if (0 != assetDir.length()) {
                    in = _context.getAssets().open(assetDir + "/" + fileName);
                }
                else {
                    in = _context.getAssets().open(fileName);
                }
                OutputStream out = new FileOutputStream(outFile);

                // Transfer bytes from in to out
                byte[] buf = new byte[1024];
                int len;
                while ((len = in.read(buf)) > 0) {
                    out.write(buf, 0, len);
                }

                in.close();
                out.close();
            }
            catch (FileNotFoundException e) {
                e.printStackTrace();
                String fileName = files[i];
                if (0 == assetDir.length()) {
                    copyAssets(fileName, dir + fileName + "/");
                }
                else {
                    copyAssets(assetDir + "/" + fileName, dir + "/"
                            + fileName + "/");
                }
            }
            catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}

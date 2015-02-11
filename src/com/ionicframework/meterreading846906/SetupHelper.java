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
     * ��Ŀ¼
     */
    public static final String FOLDER_ROOT = "sh3h/meterreading";
    /**
     * www�ļ�Ŀ¼
     */
    public static final String FOLDER_WWW = FOLDER_ROOT + "/www";
    /**
     * �����ļ�Ŀ¼
     */
    public static final String FOLDER_CONFIG = FOLDER_ROOT + "/config";
    /**
     * ���û������ļ�Ŀ¼
     */
    public static final String FOLDER_USER = FOLDER_ROOT + "/user";
    /**
     * ���������ļ�Ŀ¼
     */
    public static final String FOLDER_DATA = FOLDER_ROOT + "/data";

    /**
     * �û������ļ���
     */
    public static final String FILE_USER_CONFIG = "user.properties";

    /**
     * �û���¼��Ϣ�ļ���
     */
    public static final String FILE_USER_LOGIN = "login.properties";

    /**
     * �汾��¼��
     */
    public static final String FILE_VERSION_UPDATE = "versions.properties";
    /**
     * ϵͳ�����ļ���
     */
    public static final String FILE_SYSTEM_CONFIG = "system.properties";

    /**
     * Map�����ļ���
     */
    public static final String FILE_MAP_CONFIG = "map.properties";

    /**
     * �û������ļ���
     */
    public static final String FILE_USER = "users.xml";
    /**
     * �����û������ļ���
     */
    public static final String FILE_ONLINE_USER = "online-users.xml";
    /**
     * ���������ļ���
     */
    public static final String FILE_WORDS = "words.xml";

    /**
     * ͼƬ�洢Ŀ¼
     */
    public static final String FOLDER_IMAGES = FOLDER_ROOT + "/images";
    /**
     * �����洢Ŀ¼
     */
    public static final String FOLDER_SOUNDS = FOLDER_ROOT + "/sounds";
    /**
     * �����ļ��洢Ŀ¼
     */
    public static final String FOLDER_UPDATE = FOLDER_ROOT + "/update";
    /**
     * ��־�ļ��洢Ŀ¼
     */
    public static final String FOLDER_LOG = FOLDER_ROOT + "/log";

    private Context _context = null;

    /**
     * SetupHelper���캯��
     *
     * @param context
     */
    // AssetManager am = null;
    public SetupHelper(Context context) {
        _context = context;
    }

    /**
     * ��ʼ��ϵͳĿ¼��Ĭ�������ļ�
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
            // ���Assetsһ���м����ļ�
            files = _context.getAssets().list(assetDir);
        } catch (IOException e1) {
            return;
        }

        File mWorkingPath = new File(dir);
        // ����ļ�·��������
        if (!mWorkingPath.exists()) {
            // �����ļ���
            if (!mWorkingPath.mkdirs()) {
                // �ļ��д������ɹ�ʱ����
            }
        }

        for (int i = 0; i < files.length; i++) {
            try {
                // ���ÿ���ļ�������
                String fileName = files[i];
                // ����·���ж����ļ��л����ļ�
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

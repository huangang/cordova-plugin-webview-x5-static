package com.huangang.cordova.x5;

import android.util.Log;

import com.tencent.smtt.export.external.TbsCoreSettings;
import com.tencent.smtt.sdk.QbSdk;
import com.tencent.smtt.sdk.TbsListener;
import java.util.HashMap;

public class MainApplication extends android.app.Application {
    private static final String TAG = "TbsMainApplication";
    private boolean isInitTbs;
    private static final int REQUEST_CODE_CONTACT = 101;

    @Override
    public void onCreate() {
        super.onCreate();
        isInitTbs = QbSdk.canLoadX5(getApplicationContext());
        if (!isInitTbs) {
            FileUtils.copyAssets(getApplicationContext(), "046140_x5.tbs.apk",
                    FileUtils.getTBSFileDir(getApplicationContext()).getPath() + "/046140_x5.tbs.apk");
        }

        // 使用独立 ClassLoader, 需要在内核初始化之前
        HashMap<String, Object> map = new HashMap<>(2);
        map.put(TbsCoreSettings.TBS_SETTINGS_USE_SPEEDY_CLASSLOADER, true);
        map.put(TbsCoreSettings.TBS_SETTINGS_USE_DEXLOADER_SERVICE, true);
        QbSdk.initTbsSettings(map);

        boolean canLoadX5 = QbSdk.canLoadX5(getApplicationContext());

        if (canLoadX5) {
            return;
        }
        QbSdk.reset(getApplicationContext());

        QbSdk.setTbsListener(new TbsListener() {
            @Override
            public void onDownloadFinish(int i) {

            }

            @Override
            public void onInstallFinish(int i) {
                Log.e(TAG, "onInstallFinish: " + i);
                int tbsVersion = QbSdk.getTbsVersion(getApplicationContext());
                Log.e(TAG, "tbsVersion: " + tbsVersion);
            }

            @Override
            public void onDownloadProgress(int i) {

            }
        });
        QbSdk.reset(getApplicationContext());
        QbSdk.installLocalTbsCore(getApplicationContext(), 46140,
                FileUtils.getTBSFileDir(getApplicationContext()).getPath() + "/046140_x5.tbs.apk");

    }

}

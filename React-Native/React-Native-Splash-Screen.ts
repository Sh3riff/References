/////////////////////// Android ////////////////////////////
https://medium.com/android-news/change-splash-screen-in-react-native-android-app-d3f99ac1ebd1
-res\values\styles.xml

<resources>
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:windowDisablePreview">true</item>  //Here
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowActionBar">false</item>
        <item name="android:windowFullscreen">true</item>
        <item name="android:windowContentOverlay">@null</item>
        <item name="android:windowIsTranslucent">true</item>
        <item name="android:textColor">#000000</item>
    </style>
    <style name="SplashTheme" parent="AppTheme"> //here
        <item name="android:windowBackground">@drawable/splash_screen</item>  //here
    </style> //here
</resources>

-res\values\colors.xml

<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ur-color">#18be62</color>
 </resources>



- res/drawable

<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:drawable="@color/ur-color"/>

    <item>
        <bitmap
            android:gravity="center"
            android:src="@mipmap/ic_launcher"/>
    </item>

</layer-list>

- res/values/styles.xml

<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
    </style>
    <style name="SplashTheme" parent="AppTheme">
        <item name="android:windowBackground">@drawable/splash_screen</item>
    </style>
</resources>

- AndroidManifest.xml

<activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:theme="@style/SplashTheme"
      android:configChanges="keyboard|keyboardHidden|orientation|screenSize">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
</activity>

///////////////////////   ios  ////////////////////////////

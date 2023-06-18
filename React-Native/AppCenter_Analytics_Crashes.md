
# Appcenter Analytics & Crashes

A Quick Setup for [Appcenter](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native) Analytics & Crashes. 

## [SDK Setup](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#3-add-the-app-center-sdk-modules)

### Installation  
```
npm i appcenter appcenter-analytics appcenter-crashes
```

### [iOS Setup (Option 2 configuring-in-code)](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#3112-setting-appsecret-option-2-configuring-in-code)
  - Update AppDelegate.mm file
    ```
    // Add Imports
    #import <AppCenterReactNativeShared/AppCenterReactNativeShared.h>
    #import <AppCenterReactNative.h>
    #import <AppCenterReactNativeAnalytics.h>
    #import <AppCenterReactNativeCrashes.h>
    // Add Imports

    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
    {
      // Add Code before return
      NSString *appSecret = [RNCConfig envFor:@"APPCENTER_KEY_IOS"]; // From .env

      [AppCenterReactNativeShared setStartAutomatically:YES];
      [AppCenterReactNativeShared setAppSecret:appSecret];
      [AppCenterReactNative register];
      [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
      [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
      // Add Code before return
    }


    ```
  - Pod install & Rebuild
  - In you prefer [Option 1 Configuring AppCenter-Config.plist](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#3111-setting-appsecret-option-1-configuring-appcenter-configplist)

### [Android Setup (Option 2 configuring-in-code)](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#3122-setting-appsecret-option-2-configuring-in-code)
  - Modify the app's res/values/strings.xml to include the following lines
    ```
    <string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
    <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>
    ```
  - Import into MainActivity.java
    ```
    import com.microsoft.appcenter.AppCenter;  // add import
    import com.microsoft.appcenter.analytics.Analytics;  // add import
    import com.microsoft.appcenter.crashes.Crashes;  // add import

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      // BuildConfig.APPCENTER_KEY_ANDROID === APPCENTER_KEY_ANDROID from .env
      AppCenter.start(getApplication(), BuildConfig.APPCENTER_KEY_ANDROID, Analytics.class, Crashes.class);   // add this line
    }
    ```
  - In you prefer [Option 1 Configuring AppCenter-Config.json](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#3121-setting-appsecret-option-1-configuring-appcenter-configjson), also include step 1 above


## [AppCenter API](https://learn.microsoft.com/en-us/appcenter/sdk/other-apis/react-native)

  - Here are common AppCenter api. For more Info open the documentations
    ```
    import AppCenter from 'appcenter';

    await AppCenter.setLogLevel(AppCenter.LogLevel.VERBOSE);

    const installId = await AppCenter.getInstallId();

    AppCenter.setUserId("your-user-id");

    await AppCenter.setEnabled(false); // true or false

    await AppCenter.setNetworkRequestsAllowed(false);; // true or false

    const enabled = await AppCenter.isEnabled();

    AppCenter.getSdkVersion();
    ``` 


## [Analytics API](https://learn.microsoft.com/en-us/appcenter/sdk/analytics/react-native)

  - Here are common Analytics api. For more Info open the documentations
    ```
    import Analytics from 'appcenter-analytics';

    Analytics.trackEvent('Video clicked');

    // Optional Properties
    Analytics.trackEvent('Video clicked', { Category: 'Music', FileName: 'favorite.avi' });

    await Analytics.setEnabled(false); // true or false

    const enabled = await Analytics.isEnabled();
  
  - If you wish to collect analytics information for your app users but want to get user permission first update as follow
  - For IOS ios/YourAppName/AppDelegate.mm file
    ```
    // [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
    [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:false];

    ``` 
  - For android android/app/src/main/res/values/strings.xml file
    ```
    // <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>
    <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ENABLE_IN_JS</string>
    ``` 
  - Enable in JS
    ```
    await Analytics.setEnabled(true);
    ``` 
  - To Manage Session Manually [check docs](https://learn.microsoft.com/en-us/appcenter/sdk/analytics/react-native#manage-start-session)
    ```
    await Analytics.setEnabled(true);
    ``` 
  - Analytics Api Limits
    - 200 distinct event names.
    - 256 characters per event name
    - 20 properties per event
    - 125 characters per event property name and event property value.


## [Crashes API](https://learn.microsoft.com/en-us/appcenter/sdk/crashes/react-native)

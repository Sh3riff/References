
# React Native CodePush

A Quick Code Push setup to help skip the documentation. Kindly note that the [CLI Documentation](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/cli) contains more info that provided in ths summary.  
Look up the following as needed.
  - Releasing update
  - Patching Update Metadata
  - Promoting Updates
  - Rolling Back Updates
  - Viewing Release History
  - Clearing Release History
  - Code Signing e.t.c

## [CLI Setup](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/cli)
Global installation  
```
npm install -g appcenter-cli
```
Authentication 
```
appcenter login
```
Profile Listing 
```
appcenter profile list
```
Token 
```
appcenter tokens list
appcenter tokens delete <machineName>
```


## [SDK Setup](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-overview)

### Installation  
```
npm i react-native-code-push
```

### [iOS Setup (React Native >=0.60)](https://github.com/microsoft/react-native-code-push/blob/HEAD/docs/setup-ios.md)
  - pod install
    ```
    cd ios && pod install && cd ..
    ```
  - Update AppDelegate.mm
    ```
    #import <CodePush/CodePush.h> // Add at the top

    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"]; //replace this line
    return [CodePush bundleURL]; //with this line
    ```
  - Update Info.plist
    ```
    <key>CodePushDeploymentKey</key>
	<string>Your-codepush-deployment-key</string> //$(CodePushDeploymentKey_IOS)
    ```

### [Android Setup (React Native >=0.60)](https://github.com/microsoft/react-native-code-push/blob/HEAD/docs/setup-android.md)
  - android/settings.gradle
    ```
    include ':app', ':react-native-code-push'
    project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
    ```
  - android/app/build.gradle
    ```
    apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
    ```
  - MainApplication.java
    ```
    // 1. Import the plugin class.
    import com.microsoft.codepush.react.CodePush;
    public class MainApplication extends Application implements ReactApplication {
        private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
            // 2. Override the getJSBundleFile method to let
            // the CodePush runtime determine where to get the JS
            // bundle location from on each app start
            @Override
            protected String getJSBundleFile() {
                return CodePush.getJSBundleFile();
            }
        };
    }
    ```
  - strings.xml
    ```
    <resources>
        <string moduleConfig="true" name="CodePushDeploymentKey">DeploymentKey</string> // @string/ANDROID_CODEPUSH_KEY
    </resources>
    ```

## [SDK USAGE](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-plugin)

  - Basic usage (Wrap your root component with the codePush higher-order component)
    ```
    import {AppRegistry} from 'react-native';
    import codePush from 'react-native-code-push';
    import App from './App';

    AppRegistry.registerComponent(', () => codePush(App));
    ``` 
  - With Config ([Config APIs](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-api-ref))
    ```
    import {AppRegistry} from 'react-native';
    import codePush from 'react-native-code-push';
    import App from './App';

    let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

    AppRegistry.registerComponent(', () => codePush(codePushOptions)(MyApp));
    ``` 
  - Manual Update
    ```
    import codePush from 'react-native-code-push';
    // use this config to prevent in the root component auto check when app 
    //let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL};

    const handleUpdate = () => {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        });
    }
    ``` 

## [Releasing Updates](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-updates)

  - Release Command
    ```
    appcenter codepush release-react -a <ownerName>/<appName> --deployment-name <deploymentName> --mandatory -t <version>
    ``` 
  - [Release Update Tag](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/cli#releasing-updates)
    ```
    appcenter codepush release-react -a <ownerName>/<appName> -d <deploymentName> -t <targetBinaryVersion>
    [-t|--target-binary-version <targetBinaryVersion>]
    [-o|--output-dir]
    [-s|--sourcemap-output]
    [-c|--build-configuration-name <arg>]
    [--plist-file-prefix]
    [-p|--plist-file]
    [-g|--gradle-file]
    [-e|--entry-file]
    [--development]
    [-b|--bundle-name <bundleName>]
    [-r|--rollout <rolloutPercentage>]
    [--disable-duplicate-release-error]
    [-k|--private-key-path <privateKeyPath>]
    [-m|--mandatory]
    [-x|--disabled]
    [--description <description>]
    [-d|--deployment-name <deploymentName>]
    [-a|--app <ownerName>/<appName>]
    [--disable-telemetry]
    [-v|--version]
    ``` 
  - Manual Update
    ```
    import codePush from 'react-native-code-push';
    // use this config to prevent in the root component auto check when app 
    //let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL};

    const handleUpdate = () => {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        });
    }
    ``` 



## App Management
Create App  
```
appcenter apps create -d <appDisplayName> -o <operatingSystem>  -p <platform>
```
Create App Example 
```
appcenter apps create -d MyApp-Android -o Android -p React-Native
appcenter apps create -d MyApp-iOS -o iOS -p React-Native
```
List All Apps 
```
appcenter apps list
```
Set Current App 
```
appcenter apps set-current <ownerName>/<appName>
// By setting an app as the current app you no don't have to use the -a flag in other CLI commands.
// -a <ownerName>/<appName>
```
Get Current App 
```
appcenter apps get-current
```
App Deployments (Create)
```
appcenter codepush deployment add -a <ownerName>/<appName>
// Default are Staging and Production
appcenter codepush deployment add -a <ownerName>/<appName> <deploymentName>
```
App Deployments (Update)
```
appcenter apps update -n <newName> -a <ownerName>/<appName>
```
App Deployments (Delete)
```
appcenter apps delete -a <ownerName>/<appName>
```
App Deployments Info
```
appcenter codepush deployment list -a <ownerName>/<appName>
```
List Deployment Keys
```
appcenter codepush deployment list -a <ownerName>/<appName> --displayKeys
// --displayKeys or -k
```


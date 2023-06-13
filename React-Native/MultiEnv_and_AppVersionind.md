
# React Native Multi Environment and App Versioning

This help with running react natie in multiple environment like "dev", "uat", "prod" etc. It can also be used to bundle an app under different name or for different instances.

# Requirements
- Install [react-native-config](https://www.npmjs.com/package/react-native-config)
- create seperate .env for all you env & distances i.e .env, .env.dev etc
- Provide the following values and any other value you would be needing
    ```
    APP_NAME=App(dev)
    APP_ID=com.app.dev
    ENV=development
    MAJOR_VERSION=1
    MINOR_VERSION=0
    PATCH_VERSION=0
    ```

# IOS
For IOS update ios/ProjectName/Info.plist or Xcode info tab as follow
```
<dict>
	<key>CFBundleDisplayName</key>
	<string>$(APP_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(APP_ID)</string>
	<key>CFBundleName</key>
	<string>$(APP_NAME)</string>
	<key>CFBundleShortVersionString</key>
	<string>$(MAJOR_VERSION).$(MINOR_VERSION).$(PATCH_VERSION)</string>
	<key>CFBundleVersion</key>
	<string>$(MAJOR_VERSION).$(MINOR_VERSION).$(PATCH_VERSION)</string>
</dict>
```


# Android
### Multi Environment
- Open app gradle i.e android/app/build.gradle
- navigate to android -> defaultConfig
- comment out **applicationId "com.appdomain"** and replace with **applicationId project.env.get("APP_ID")** that is get the applicationId from .env
- include **resValue "string", "build_config_package", "com.appdomain"** below this would help reference the original app during build
- include **resValue "string", "app_name", project.env.get("APP_NAME")** that is get the app_name from .env
    ```
    // applicationId "com.appdomain"
    applicationId project.env.get("APP_ID")
    resValue "string", "build_config_package", "com.appdomain"
    resValue "string", "app_name", project.env.get("APP_NAME")
    ```
- replace com.appdomain with you applicationId
- finally comment out **<string name="app_name">App Name</string>** in res/values/strings.xml

### App versioning
- still in app gradle replace with the following lines
- **versionCode generateVersionCode()**
- **versionName generateVersionName()**
- Outside android create the following methods
    ```
    private Integer generateVersionCode() {
        return project.env.get("MAJOR_VERSION").toInteger() * 10000 + project.env.get("MINOR_VERSION").toInteger() * 100 + project.env.get("PATCH_VERSION").toInteger()
    }

    private String generateVersionName() {
        String versionName = "${project.env.get("MAJOR_VERSION")}.${project.env.get("MINOR_VERSION")}.${project.env.get("PATCH_VERSION")}"
        if(project.env.get("PRE_RELEASE") != null && !project.env.get("PRE_RELEASE").isEmpty()) {
            versionName = versionName + "-" + project.env.get("PRE_RELEASE")
        }
        return versionName
    }
    ```  

# How to Run
To run different env, prefix you regular command with the desired env file i.e
```
    ENVFILE=.env.development react-native run-ios
```
in place of
```
    react-native run-ios
```

# Env Command prefix
```
$ ENVFILE=.env.staging react-native run-ios           # bash
$ SET ENVFILE=.env.staging && react-native run-ios    # windows
$ env:ENVFILE=".env.staging"; react-native run-ios    # powershell
```

# References
- [App Versioning](https://enlear.academy/managing-configurable-versioning-in-react-native-876ef4b31c23)

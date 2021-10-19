### https://medium.com/@devesu/how-to-change-bundle-identifier-of-ios-app-and-package-name-of-android-app-within-react-native-app-4fbdd6679aa2

////////////////////////////////////////// ios //////////////////////////////////////////

xcode > general > identity > Bundle Identifier

////////////////////////////////////////// android //////////////////////////////////////////

- Navigate inside folder “/android/app/src/main /java/”
- Structure folder inside java folder based on our new package name e.g java/com/kwilax/kwimart
- Make sure MainActivity.java & MainApplication.java are both in the folder i.e kwimart
- Change package name in the following folder
  - MainActivity.java
  - MainApplication.java
  - /android/app/src/main/AndroidManifest.xml
  - /android/app/BUCK
    - android_build_config()
    - android_resource()
  - /android/app/build.gradle
    - default_config{
        applicationId "..."
      }

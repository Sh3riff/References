# Xcode 14.3 fail
This is was observed when migrating to silicon processor with xcode 13. Follow this steps
- Clean your ios using the below command
  ```
  cd ios && rm -rf Pods && rm -rf Podfile.lock && rm -rf *.xcworkspace && cd ..
  ```
- clean build i.e xcode -> Product -> Clean build Folder
- Clean Derived Data i.e xcode -> Settings -> Location -> "click arrow below Derived data and the project folder"
- Update Podfile
```
    post_install do |installer|
        react_native_post_install(installer)
        # NOTE: Change IPHONEOS_DEPLOYMENT_TARGET to 12.4.
        installer.pods_project.targets.each do |target|
            target.build_configurations.each do |config|
                config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.4'
            end
        end
        __apply_Xcode_12_5_M1_post_install_workaround(installer)
    end
```
- Pod Install
- start metro server
- npm run ios
- 
- An Older and trouble method is after pod install 
    - (change every instance of "IPHONEOS_DEPLOYMENT_TARGET = 11.0" to "IPHONEOS_DEPLOYMENT_TARGET = 12.4" in file ios/Pods/Pods.xcodeproj/project.pbxproj)

  

# Xcode 12 (deprecated) fail when older pods are installed so we fix it with a simple script @ the end of

Replace

  post_install do |installer|
    react_native_post_install(installer)
  end

With



  post_install do |installer|
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings.delete 'IPHONEOS_DEPLOYMENT_TARGET'
      end
    end
  end

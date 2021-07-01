Xcode 12 fail when older pods are installed so we fix it with a simple script @ the end of

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

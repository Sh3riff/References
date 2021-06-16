// https://www.djamware.com/post/5e83f1e7344bef67e448798c/react-native-tutorial-qrcode-scanner-app-for-android-or-ios

npm i react-native-camera
npm i react-native-qrcode-scanner
npm i react-native-permissions

// ./ios/ReactNativeQrcode/Info.plist
    <key>NSCameraUsageDescription</key>
    <string>Your message to user when the camera is accessed for the first time</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Your message to user when the microsphone is accessed for the first time</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Your message to user when the photo library is accessed for the first time</string>

// ./ios/Podfile
target 'ReactNativeBarcode' do
  # Permissions
  permissions_path = '../node_modules/react-native-permissions/ios'
  pod 'Permission-Camera', :path => "#{permissions_path}/Camera.podspec"

  # Pods for ReactNativeBarcode
  ...
end

// pod install

// ./android/app/src/main/AndroidManifest.xml
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general'
  }
}



<!--  --> 

import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';

const Scanner = ({scanHandler}: {scanHandler: (e: unknown) => void}) => {
  return (
    <QRCodeScanner
      showMarker={true}
      onRead={scanHandler}
      //   cameraType="front"
    />
  );
};

export default Scanner;

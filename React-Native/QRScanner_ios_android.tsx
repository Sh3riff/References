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

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';

const Scanner = () => {
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);

  const onSuccess = e => {
    setResult(e.data);
    setScan(false);
  };

  const startScan = () => {
    setScan(true);
    setResult();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            {result && (
              <View style={styles.sectionContainer}>
                <Text style={styles.centerText}>{result}</Text>
              </View>
            )}
            {!scan && (
              <View style={styles.sectionContainer}>
                <Button
                  title="Start Scan"
                  color="#f194ff"
                  onPress={startScan}
                />
              </View>
            )}
            {scan && (
              <View style={styles.sectionContainer}>
                <QRCodeScanner
                  reactivate={true}
                  showMarker={true}
                  ref={node => {
                    this.scanner = node;
                  }}
                  onRead={this.onSuccess}
                  topContent={
                    <Text style={styles.centerText}>Scan your QRCode!</Text>
                  }
                  bottomContent={
                    <TouchableOpacity
                      style={styles.buttonTouchable}
                      onPress={() => setScan(false)}>
                      <Text style={styles.buttonText}>Cancel Scan</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

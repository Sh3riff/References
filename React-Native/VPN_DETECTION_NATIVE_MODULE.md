
# [VPN detection guide for iOS and Android](https://blog.tarkalabs.com/the-ultimate-vpn-detection-guide-for-ios-and-android-313b521186cb)


## How to detect VPN usage in iOS (Swift)
```
    func isVPNConnected() -> Bool {
        let cfDict = CFNetworkCopySystemProxySettings()
        let nsDict = cfDict?.takeRetainedValue() as NSDictionary?
        let keys = nsDict?["__SCOPED__"] as? NSDictionary
        
        for key: String in keys?.allKeys as? [String] ?? [] {
            if (key.contains("tap") || key.contains("tun") || key.contains("ppp") || key.contains("ipsec") || key.contains("utun")) {
                return true
            }
        }
        
        return false
    }
```
In the above code snippet, [CFNetworkCopySystemProxySettings](https://developer.apple.com/documentation/cfnetwork/1426754-cfnetworkcopysystemproxysettings) is a low-level API that returns current internet proxy settings as a CFDictionary. You can cast this to an NSDictionary and check if any of the tunneling protocols, i.e., tap, tun, ppp, ipsec, utun are in use.


## How to detect VPN usage in Android (Kotlin)
```
    fun isVPNConnected(): Boolean {
        val connectivityManager = getSystemService(ConnectivityManager::class.java) as ConnectivityManager
        val activeNetwork = connectivityManager.activeNetwork
        val networkCapabilities = connectivityManager.getNetworkCapabilities(activeNetwork)

        return networkCapabilities?.hasTransport(NetworkCapabilities.TRANSPORT_VPN) ?: false
    }
```
[ConnectivityManager](https://developer.android.com/reference/android/net/ConnectivityManager) is an Android API to manage network connections. It provides methods to check the availability and status of network connections and request and configure network connections. You can use ConnectivityManager to get the network capabilities of the active network. You can then check if the VPN transport protocol is being used.


## How to detect VPN usage with Flutter (Dart)
```
    import 'dart:io';

    ///A class that contains static method of checking VPN connection
    class CheckVpnConnection {

    ///Returns true if device has VPN connection
    static Future<bool> isVpnActive() async {
        bool isVpnActive;
        List<NetworkInterface> interfaces = await NetworkInterface.list(
            includeLoopback: false, type: InternetAddressType.any);
        interfaces.isNotEmpty
            ? isVpnActive = interfaces.any((interface) =>
                interface.name.contains("tun") ||
                interface.name.contains("ppp") ||
                interface.name.contains("pptp"))
            : isVpnActive = false;
        return isVpnActive;
    }
    }
```
Similar to IOS Retrieve a list of network interfaces - a [NetworkInterface](https://api.flutter.dev/flutter/dart-io/NetworkInterface-class.html) represents an active network interface on the current system. You can then check if any of the interfaces have names that contain tun, ppp, and pptp, which are commonly used in VPN connections.


## How to detect VPN usage with React Native (using Native modules)

### Android Code
```
/// VPNModule.java


package com.yourpackagename; // Replace with your actual package name

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class VPNModule extends ReactContextBaseJavaModule {

    public VPNModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "VPNModule";
    }

    @ReactMethod
    public void isVPNConnected(Promise promise) {
        Context context = getReactApplicationContext().getApplicationContext();
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager == null) {
            promise.resolve(false);
            return;
        }

        Network activeNetwork = connectivityManager.getActiveNetwork();
        if (activeNetwork == null) {
            promise.resolve(false);
            return;
        }

        NetworkCapabilities networkCapabilities = connectivityManager.getNetworkCapabilities(activeNetwork);
        if (networkCapabilities == null) {
            promise.resolve(false);
            return;
        }

        promise.resolve(networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN));
    }
}
```


```
/// VPNPackage.java



package com.yourpackagename; // Replace with your actual package name

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class VPNPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new VPNModule(reactContext));
        return modules;
    }
}
```



```
/// Update MainApplication.java appropriately


package com.yourpackagename; // Replace with your actual package name

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.shell.MainReactPackage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.add(new VPNPackage()); // Add your custom package here
            return packages;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
```

### IOS Code
```
/// RCTVPNModule.m


#import "RCTVPNModule.h"
#import <React/RCTLog.h>
#import <NetworkExtension/NetworkExtension.h>

@implementation RCTVPNModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(isVPNConnected:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    BOOL isConnected = [self checkVPNConnection];
    resolve(@(isConnected));
}

- (BOOL)checkVPNConnection {
  CFDictionaryRef cfDict = CFNetworkCopySystemProxySettings();
  NSDictionary *nsDict = (__bridge NSDictionary*)cfDict;
  NSDictionary *keys = [nsDict valueForKey:@"__SCOPED__"];
  BOOL isConnected = NO;
  
  for (id key in keys) {
      if ([@"tap" isEqual: key] || [@"tun" isEqual: key] || [@"ppp" isEqual: key] || [@"ipsec" isEqual: key] || [@"ipsec0" isEqual: key] || [key containsString: @"utun"]) {
          isConnected = YES;
      } else {
          isConnected = NO;
      }
  }
  
  return isConnected;
}

@end
```

```
/// RCTVPNModule.h


#import <React/RCTBridgeModule.h>

@interface RCTVPNModule : NSObject <RCTBridgeModule>

@end

```


### React Native

```
import {NativeModules} from 'react-native';
const VPNModule = NativeModules.VPNModule;

VPNModule.isVPNConnected()
  .then((isConnected: boolean) => {
    console.log('Is VPN connected:', isConnected);
  })
  .catch((error: any) => {
    console.error('Error while checking VPN connection:', error);
  });

```

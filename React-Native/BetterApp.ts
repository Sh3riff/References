////////////////////////////////////////////////////////////////////////////////////

RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks

solution link :- https://stackoverflow.com/questions/67093549/how-can-i-solve-rctbridge-required-dispatch-sync-to-load-in-react-native-usin

 Open Your /ios/YourAppName/AppDelegate.m

#import "AppDelegate.h"

// ADD THIS
#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif
// TILL HERE

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

...
  RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                            moduleProvider:nil
                                             launchOptions:launchOptions];
// THIS CONDITION
#if RCT_DEV
  [bridge moduleForClass:[RCTDevLoadingView class]];
#endif
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Test"
                                            initialProperties:nil];
// TILL HERE
  ...
}

////////////////////////////////////////////////////////////////////////////////////
  
Hermes
  
https://reactnative.dev/docs/hermes

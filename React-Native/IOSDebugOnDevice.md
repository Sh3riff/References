
# Debugging IOS on Device

We would be using the [ios-deploy](https://www.npmjs.com/package/ios-deploy) package.

### Installation
```
brew install ios-deploy
```

### [Setup](https://reactnative.dev/docs/running-on-device?os=macos&platform=ios)
- Plug your ios device
- Open XCode > Product > Destination > Mange Run Destinations
- Register you device on the window open by the above Step

### Run Debug
- npx react-native run-ios --device
- npx react-native run-ios --device='Sheriff's Iphone'
- react-native run-ios --udid 'device id'

### List All devices
- xcrun xctrace list devices

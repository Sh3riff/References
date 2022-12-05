// https://webomnizz.com/change-status-bar-background-color-in-react-native/#background-color-for-android-device

import React from 'react';
import {View, SafeAreaView as RNSafeAreaView, StatusBar} from 'react-native';

type ISafeAreaView = {
  statusBarStyle?: 'light-content' | 'dark-content' | 'default';
  statusBarBackgroundColor?: string;
  backgroundColor?: string;
  children: React.ReactNode;
};

export const SafeAreaView = ({
  backgroundColor = '#ffffff',
  statusBarBackgroundColor = '#ffffff',
  statusBarStyle = 'default',
  children,
}: ISafeAreaView) => {
  const iosStatusStyle = {flex: 0, backgroundColor: statusBarBackgroundColor};
  const androidStatusStyle = {
    height: StatusBar.currentHeight,
    backgroundColor: statusBarBackgroundColor,
  };

  const mainAreaStyle = {flex: 1, backgroundColor};
  return (
    <>
      <RNSafeAreaView style={iosStatusStyle} />
      <RNSafeAreaView style={mainAreaStyle}>
        <View style={androidStatusStyle}>
          <StatusBar barStyle={statusBarStyle} />
        </View>
        {children}
      </RNSafeAreaView>
    </>
  );
};

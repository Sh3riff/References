
# React Navigation Quick Setup

A Quick guide to install React Navigation


## Installation

Install react-navigation, bottom-tabs and native stack navigator

```bash
  npm install @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/bottom-tabs @react-navigation/native-stack
```  
Install Pod
```bash
    npx pod-install ios
```  
Android MainActivity.java
```bash
    import android.os.Bundle; // Import at the top
    
    public class MainActivity extends ReactActivity {
    // ...
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }
    // ...
    }
```
    
## Usage/Examples  
Navigation Container

```react
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```  
[Bottom Tab Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)
```react
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```  

[Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator/)
```react
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
```  


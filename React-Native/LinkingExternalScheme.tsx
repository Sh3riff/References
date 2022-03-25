For Ios in Info.plist

<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>mailto</string>
		<string>tel</string>
	</array>

For android in AndroidManifest.xml

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.kwimart">

    ...
  
  
    <queries>
        <intent>
          <action android:name="android.intent.action.VIEW" />
          <data android:scheme="https"/>
        </intent>
        <intent>
          <action android:name="android.intent.action.VIEW" />
          <data android:scheme="mailto"/>
        </intent>
        <intent>
          <action android:name="android.intent.action.VIEW" />
          <data android:scheme="tel"/>
        </intent>
    </queries>
</manifest>

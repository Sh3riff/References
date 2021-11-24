///////////////// https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51 //////////////



///////////////////////////////////////  Debug APK  ///////////////////////////////////////

Prerequisite:
    react-native version > 0.58


How to generate one in 3 steps?

  Step 1: Go to the root of the project in the terminal and run the below command:
    react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
  
  Step 2: Go to android directory:
    cd android

  Step 3: Now in this android folder, run this command
    ./gradlew assembleDebug

  There! you’ll find the apk file in the following path:
    yourProject/android/app/build/outputs/apk/debug/app-debug.apk

  SimpleCMD:
    react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleDebug && cd ..



///////////////////////////////////////  Release APK  ///////////////////////////////////////


  Pre Step. Solving build duplicate error
    -  Create folder "fixAndroid" in the "android" folder of your project  
    -  Create file android-gradle-fix in the "fixAndroid" & add the code below

        doLast {
            def moveFunc = { resSuffix ->
                File originalDir = file("${resourcesDir}/drawable-${resSuffix}")
                if (originalDir.exists()) {
                    File destDir = file("${resourcesDir}/drawable-${resSuffix}-v4")
                    ant.move(file: originalDir, tofile: destDir)
                }
            }
            moveFunc.curry("ldpi").call()
            moveFunc.curry("mdpi").call()
            moveFunc.curry("hdpi").call()
            moveFunc.curry("xhdpi").call()
            moveFunc.curry("xxhdpi").call()
            moveFunc.curry("xxxhdpi").call()
        }

        // Set up inputs and outputs so gradle can cache the result

    -  Create file android-release-fix.js in the "fixAndroid" folder you created & add the code below

            const fs = require('fs')
            try {
                    var curDir = __dirname
                    var rootDir = process.cwd()

                    var file = `${rootDir}/node_modules/react-native/react.gradle`
                    var dataFix = fs.readFileSync(`${curDir}/android-gradle-fix`, 'utf8')
                    var data = fs.readFileSync(file, 'utf8')

                    var doLast = "doLast \{"
                    if (data.indexOf(doLast) !== -1) {
                        throw "Already fixed."
                    }

                    var result = data.replace(/\/\/ Set up inputs and outputs so gradle can cache the result/g, dataFix);
                    fs.writeFileSync(file, result, 'utf8')
                    console.log('Android Gradle Fixed!')
                } catch (error) {
                    console.error(error)
                }

    -  Add script to package.json scripts section
        
        "postinstall": "node ./android/fixAndroid/android-release-fix.js"

    -  This will find and insert content of “android-gradle-fix” file into node_modules/react-native/react.gradle.

    -  Run npm install & rm -rf android/app/src/main/res/drawable-* from the root of your project.




  Step 1. Generate a keystore
    You will need a Java generated signing key which is a keystore file 
    used to generate a React Native executable binary for Android. 
    You can create one using the keytool in the terminal with the following command.

      keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000

    Once you run the keytool utility, you’ll be prompted to type in a password. *Make sure you remember the password
    You can change your_key_name with any name you want, as well as your_key_alias.
    This key uses key-size 2048, instead of default 1024 for security reason.
  
  Step 2. Adding Keystore to your project
    Firstly, you need to copy the file your_key_name.keystore and paste it under the android/app directory in your React Native project folder.
    On Terminal:

      mv my-release-key.keystore /android/app

    You need to open your android\app\build.gradle file and add the keystore configuration. 
    There are two ways of configuring the project with keystore.

    - First, the common and unsecured way:

      android {
        ....
        signingConfigs {
          release {
          storeFile file('your_key_name.keystore')
          storePassword 'your_key_store_password'
          keyAlias 'your_key_alias'
          keyPassword 'your_key_file_alias_password'
          }
        }
        buildTypes {
          release {
            ....
            signingConfig signingConfigs.release
        }
      }
    }

    This is not a good security practice since you store the password in plain text.
    Instead of storing your keystore password in .gradle file, you can stipulate the build
    process to prompt you for these passwords if you are building from the command line.

    - First, the common and unsecured way:



    - Second, prompt for password with the Gradle build file. Secured way:

      android {
        ....
        signingConfigs {
          release {
          storeFile file('your_key_name.keystore')
          storePassword System.console().readLine("\nKeystore password:")
          keyAlias System.console().readLine("\nAlias: ")
          keyPassword System.console().readLine("\nAlias password: ")
          }
        }
        buildTypes {
          release {
            ....
            signingConfig signingConfigs.release
        }
      }
    }

  Step 3: Go to the root of the project in the terminal and run the below command:

    "cd android && ./gradlew bundleRelease && cd .."

  Step 4: You can find the generated APK at:
    at android/app/build/outputs/apk/app-release.apk

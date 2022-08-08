https://techblog.geekyants.com/adding-custom-fonts-a-complete-guide-react-native-060

- Adding font files to the assets/fonts folder (or any other folder of choice)

- Creating a configuration file i.e react-native.config.js in the project root and add the below snippet

////////////////////////////////
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
};
////////////////////////////////

- npx react-native-asset (npx react-native link)

- rebuild app

- Using fonts

////////////////////////////////
const styles = StyleSheet.create({
    fontText: {
      fontFamily: 'NunitoSans-Bold',
      fontSize: 20,
    },
});
////////////////////////////////

- Resolving the Issues with React Native vector-icons installation
  - Open in Xcode > Build Phases > Copy Bundle Resources. Then Remove all the vector icon files and re-run your app
  
................................................................................................................................
Fonts not functional on Android
There can be many reasons for your fonts not working on android:

  Some fonts don't work with the same font-family name format.
  Try changing your font-family name from NutinoSans-Bold to nutinosans_bold on android.
  You can also define font-family based on the Platform. Use the following code to achieve this:
  
  fonts: {
  ...Platform.select({
    ios: {
      OGMedium: 'OGBrother-Medium',
      NunitoBold: 'NunitoSans-Bold',
    },
    android: {
     OGMedium: 'ogbrother_medium',
     NunitoBold: 'NunitoSans-Bold',
    },
  }),
},


Sometimes fonts don't work on android because of the font-weight. Try removing that.

If your fonts are still not working, you need to remove the old font files from the assets/fonts folder
and replace them with the new files with the names in snake_case like ogbrother_medium and nutinosans_bold.
Try linking the files again after this

Sometimes fonts don't work with font-weight:"bold" . Try to replace this with a font value like font-weight:"700"

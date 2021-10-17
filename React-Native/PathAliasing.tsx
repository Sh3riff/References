https://koprowski.it/import-alias-in-react-native-and-vscode/
(Regular expression as an alias)

npm i babel-plugin-module-resolver // metro-react-native-babel-preset is now pre-installed

in .babelrc

module.exports = {
	...
  plugins: [
  	...
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '^~(.+)': './src/\\1', // Regex to match all files inside `./src` and map to ~ path
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],
  ],
};

tsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {"~*": ["./src/*"]}, 
  },
  "exclude": ["node_modules"]
}


///////////////////////////////////////////    OLD     //////////////////////////////////////////////////

https://mtateam.medium.com/how-to-use-import-aliases-with-react-native-and-vs-code-dadb246674c7

/////////////////////////////////////////////////////////////////////////////////////////////

npm i metro-react-native-babel-preset babel-plugin-module-resolver


/////////////////////////////////////////////////////////////////////////////////////////////

in .babelrc file (convert babelrc.js)

{
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "extensions": [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json"
        ],
        "alias": {
          "@navigation": "./src/navigation",
          "@components": "./src/components",
          "@assets": "./assets",
        }
      }
    ]
  ]
}

/////////////////////////////////////////////////////////////////////////////////////////////
tsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@navigation/*": ["./src/navigation/*"],
      "@components/*": ["./src/components/*"],
      "@assets/*": ["./assets/*"],
    }
  },
  "exclude": ["node_modules", "dist"]
}



/////////////////////////////////////////////////////////////////////////////////////////////
global.d.ts

declare module '@components';

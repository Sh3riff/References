// https://javascript.plainenglish.io/husky-lint-staged-on-a-react-typescript-project-automate-validation-before-submitting-your-code-8d388e63be70



npm i -D husky@4 lint-staged prettier @types/prettier


///////////////////////////////// package.json /////////////////////////////////
"scripts": {
  ...
  "test:noWatch":"npm run test -- --watchAll=false",
},
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "rules": {
      "@typescript-eslint/no-unused-vars": "error"
    }
},
"prettier": {
    "printWidth": 80,
    "useTabs": true,
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true,
    "jsxSingleQuote": false,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "arrowParens": "always"
},
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json}": [
      "eslint --fix"
    ],
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
      "prettier --write"
    ]
},
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test:noWatch"
    }
},
//////////////////////////////////////////////////////////////////////////////

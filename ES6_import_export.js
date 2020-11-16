///////////////// NAMED EXPORT //////////////

// imports
// ex. importing a single named export
import { MyComponent } from "./MyComponent";
// ex. importing multiple named exports
import { MyComponent, MyComponent2 } from "./MyComponent";
// ex. giving a named import a different name by using "as":
import { MyComponent2 as MyNewComponent } from "./MyComponent";
//ex. Import all the named exports onto an object:
import * as MainComponents from "./MyComponent";


// exports from ./MyComponent.js file
export const MyComponent = () => {}
export const MyComponent2 = () => {}


///////////////// DEFAULT EXPORT //////////////

// import
import MyDefaultComponent from "./MyDefaultExport";
// export
const MyComponent = () => {}
export default MyComponent;


///////////////// COMPARE //////////////

  - import X from "./x"                       => const X = require("./x")
  - import {X} from "./x"                     => const {X} = require("./x")
  - export { default as X } from './x';       => exports.X = require('./x');
  - export default X                          => module.exports = X
  - export const X =  {}                      => module.exports.X = {}

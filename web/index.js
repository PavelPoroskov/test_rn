// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './rncliapp/App';
// //import App from 'quotes';

// not recomended
// ReactDOM.render(<App />, document.getElementById('root'));


import React from 'react';
import { AppRegistry } from "react-native";
//import App from "./App";

//import App from './rncliapp/App';
import App from '../quotes-hooks/App';

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

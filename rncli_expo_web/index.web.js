import { AppRegistry } from 'react-native';
import App from './App';
//import App from '../quotes-hooks/src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
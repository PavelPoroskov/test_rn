/* Used by webpack, babel and eslint */

const { resolve } = require('path');

//const appDirectory = resolve( __dirname, 'rncliapp')
const appDirectory = resolve( __dirname, '../quotes-hooks')
//console.log(appDirectory)

const ar = [
  resolve( appDirectory, 'App' ),

  resolve( appDirectory, 'node_modules/react-navigation'),
  resolve( appDirectory, 'node_modules/@react-navigation'),
  resolve( appDirectory, 'node_modules/react-navigation-stack'),
  resolve( appDirectory, 'node_modules/react-navigation-drawer'),
  resolve( appDirectory, 'node_modules/react-navigation-tabs'),

  resolve( appDirectory, 'node_modules/react-native-gesture-handler'),

  resolve( appDirectory, 'node_modules/react-native-tab-view'),    
]
//console.log(ar)

module.exports = ar

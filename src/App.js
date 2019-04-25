/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import AboutScreen from './screans/About'
import QuotesScreen from './screans/Quotes'


const MainNavigator = createStackNavigator({
  About: {screen: AboutScreen},
  Quotes: {screen: QuotesScreen},
},
{
  initialRouteName: "About"
});

const App = createAppContainer(MainNavigator);

export default App;
import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { View, Text, StyleSheet } from 'react-native'

import AboutScreen from './screens/About'
import QuotesScreen from './screens/Quotes'
//import TabBarButtonComponent from './components/TabBarButtonComponent'

const MainNavigator = createBottomTabNavigator(
  {
    About: {
      screen: AboutScreen,
      navigationOptions: {
        title: 'О приложении',
        //tabBarButtonComponent: TabBarButtonComponent,
      },
    },
    Quotes: {
      screen: QuotesScreen,
      navigationOptions: {
        title: 'Котировки',
        //tabBarButtonComponent: TabBarButtonComponent,
      },
    },
  },
  {
    initialRouteName: 'About',
    //debug
    //initialRouteName: "Quotes",

    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'lightgrey',
      showIcon: false,
      // style: {
      //   //height: '10%',
      //   // borderColor: 'transparent',
      //   // shadowColor: 'transparent',
      //   backgroundColor: 'transparent',
      //   borderTopWidth: 0
      // },
      tabStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //color: 'blue',
        backgroundColor: 'blue',
      },
      labelStyle: {
        fontSize: 18,
      },
    },
  }
)

const AppContainer = createAppContainer(MainNavigator)

export default AppContainer

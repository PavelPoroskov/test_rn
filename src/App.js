/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
//import React, {useState, useEffect, useCallback} from 'react';
import {AppState} from 'react-native'
import {createStackNavigator, createAppContainer} from 'react-navigation';

import AboutScreen from './screans/About'
import QuotesScreen from './screans/Quotes'


const MainNavigator = createStackNavigator({
  About: {screen: AboutScreen},
  Quotes: {screen: QuotesScreen},
},
{
  //debug
  //initialRouteName: "About",
  initialRouteName: "Quotes"
});

const AppContainer = createAppContainer(MainNavigator);
//export default AppContainer;

// export default 
// class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

// const App = (props) => {
//   const [active, setActive] = useState((AppState.currentState === 'active'))
//   const [some, setSome] = useState(0)

// //   function _handleAppStateChange(nextAppState) {
// //     console.log(`nextAppState ${nextAppState}`)
// //     const newActive = (nextAppState === 'active')
// //     console.log(`newActive ${newActive}`)
// //     console.log(`active before ${active}`)
// //     console.log(`some before ${some}`)
// //     if (newActive !== active) {
// //       console.log(`Application iActive ${newActive}`)

// // //STRANGE: NOT CHANGE
// //       setActive(newActive)
// //       setSome(some + 1)
// //     }
// //     console.log(`active after ${active}`)
// //     console.log(`some after ${some}`)
// //   }
//   const _handleAppStateChange = useCallback((nextAppState) => {
//     console.log(`nextAppState ${nextAppState}`)
//     const newActive = (nextAppState === 'active')
//     console.log(`newActive ${newActive}`)
//     console.log(`active before ${active}`)
//     console.log(`some before ${some}`)
//     if (newActive !== active) {
//       console.log(`Application iActive ${newActive}`)

// //STRANGE: NOT CHANGE
//       setActive(newActive)
//       setSome(some + 1)
//     }
//     console.log(`active after ${active}`)
//     console.log(`some after ${some}`)
//   }, [] )

//   useEffect(() => {
//     AppState.addEventListener('change', _handleAppStateChange);

//     return () => {
//       AppState.removeEventListener('change', _handleAppStateChange);
//     }
//   }, [] )

//   return <AppContainer active00={active}/>;
// }

class App extends React.Component {
  state = {
    appIsActive: AppState.currentState === 'active',
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(`nextAppState ${nextAppState}`)
    const newActive = (nextAppState === 'active')
    console.log(`newActive ${newActive}`)
    console.log(`active before ${this.state.appIsActive}`)
    if (newActive !== this.state.appIsActive) {
      this.setState({appIsActive: newActive});
    }
    console.log(`active after ${this.state.appIsActive}`)
  };

  render() {
    return <AppContainer screenProps={this.state}/>;
  }
}

export default App

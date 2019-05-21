import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 4,
    borderTopColor: 'white',
    //backgroundColor: 'green',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // borderTopWidth: 4,
    // borderTopColor: 'transparent',
    // //borderTopColor: 'lightgrey',

    //paddingTop: 4,
    marginTop: 4,

    backgroundColor: 'blue',

    // borderTopWidth: 1,
    // borderTopColor: 'rgba(0, 0, 0, 0.3)',
  },
  centerFocused: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderTopWidth: 4,
    //borderTopColor: 'white',
    backgroundColor: 'blue',
    
    // borderTopWidth: 1,
    // borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,    
  },
})

class TabBarButtonComponent extends React.Component {
  render() {
    // console.log('tabBarButtonComponent')
    // console.log(this.props)

    // return (
    //   <View style={styles.center}>
    //     <TouchableWithoutFeedback >
    //       <View>
    //         {this.props.children}
    //       </View>
    //     </TouchableWithoutFeedback>
    //   </View>
    // )
    let focused = false
    React.Children.map( this.props.children, (ch) => {
      if (ch) {
        //console.log(ch)
        let focusedL = false
        ch.props.style.map( st => {
          //if ('color' in st) {
          if (st['color']) {
            focusedL = (st.color === 'white')
          }  
        })
        if (focusedL) {
          focused = true
        } 
      }
    })

    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
      >
        <View style={ focused ? styles.centerFocused: styles.center}>{this.props.children}</View>
      </TouchableWithoutFeedback>
    )
  }
}

export default TabBarButtonComponent

// //require
// const MainNavigator = createBottomTabNavigator(
//   {
//   },
//   {
//     tabBarOptions: {
//       style: {
//         backgroundColor: 'transparent',
//         borderTopWidth: 0, // require
//       },

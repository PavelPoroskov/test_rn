import React from 'react'
import { View, StyleSheet } from 'react-native'

import QuotesTableConnected from './QuotesTableConnected'

const styles = StyleSheet.create({
  fullHeight: {
//    height: '100%',
    flex: 1,
//  height: '90%',
  },
})

const QuotesScreen = props => (
  <View style={styles.fullHeight}>
    <QuotesTableConnected />
  </View>
)
// QuotesScreen.navigationOptions = {
//   title: 'Котировки'
// }

export default QuotesScreen

import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'

import QuotesTableConnected from './QuotesTableConnected'

const styles = StyleSheet.create({
  fullHeight: {
    //    height: '100%',
    flex: 1,
    //  height: '90%',
  },
})

const QuotesScreen = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.fullHeight}>
      <QuotesTableConnected />
    </View>
  </SafeAreaView>
)
// QuotesScreen.navigationOptions = {
//   title: 'Котировки'
// }

export default QuotesScreen

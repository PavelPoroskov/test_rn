import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  second: { flex: 0.5, justifyContent: 'center', alignItems: 'flex-start' },
})

const AboutScreen = props => (
  <View style={styles.center}>
    <View>
      <Text>The app show quotes for cryptocuurencies from poloniex.com.</Text>
      <View>
        <Text> </Text>
        <Text>It is a test task for react-native.</Text>
        <Text>Source: https://github.com/PavelPoroskov/test_rn</Text>
        <Text>Fulfilled Pavel Poroskov</Text>
      </View>
    </View>
  </View>
)

export default AboutScreen

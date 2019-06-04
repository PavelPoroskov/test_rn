import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  part1: { 
    flex: 1, 
    //backgroundColor: 'lightblue' 
  },
  part2: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'lightgreen' 
  },
  part3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'lightgray',
  },
  header: { fontSize: 24, textAlign: 'center' },
  bold: { fontWeight: 'bold', textAlign: 'center' },
})

const AboutScreen = props => (
  <View style={styles.container}>
    <View style={styles.part1} />
    <View style={styles.part2}>
      <Text style={styles.header}>
        The app show quotes for cryptocurrencies from poloniex.com.
      </Text>
      <View>
        <Text> </Text>
        <Text>It is a test task for react-native.</Text>
        <Text>Source: https://github.com/PavelPoroskov/test_rn</Text>
        <Text>Fulfilled Pavel Poroskov</Text>
      </View>
    </View>
    <View style={styles.part3}>
      <Text style={styles.bold}>Select tab Quotes to begin.</Text>
    </View>
  </View>
)

export default AboutScreen

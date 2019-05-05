import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    //justifyContent: 'flex-end',
    //backgroundColor: 'pink',
    //height: '20vh',

    //flex: 1,
    //height: '33%',
    //height: '50%',
    height: '60%',
  },
})

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large"/>
  </View>
)

export default Loading
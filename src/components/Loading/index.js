import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
  },
})

const Loading = () => (
  <View style={styles.container}>
    <Text>
      Loading...
    </Text>
  </View>
)

export default Loading
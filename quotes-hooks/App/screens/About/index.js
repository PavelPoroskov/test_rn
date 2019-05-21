import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

const AboutScreen = props => (
  <View style={styles.center}>
    <Text>About Screen</Text>
  </View>
)
// AboutScreen.navigationOptions = {
//   title: 'О приложении'
// }

export default AboutScreen

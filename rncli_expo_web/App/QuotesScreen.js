import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  fullHeight: {
    //    height: '100vh',
    height: '100%',
  },
})

export default class QuotesScreen extends React.Component {
  static navigationOptions = {
    title: 'Quotes',
  }
  render() {
    //console.log('render QuotesScreen')
    const { navigate } = this.props.navigation

    return (
      <View style={styles.fullHeight}>
        <Button title='Go to About' onPress={() => navigate('About')} />
        <View>
          <Text>QuotesScreen</Text>
        </View>
      </View>
    )
  }
}

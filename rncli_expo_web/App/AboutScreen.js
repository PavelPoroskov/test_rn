import React from 'react'
import { Button, View, Text } from 'react-native'

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Button title='Go to Quotes' onPress={() => navigate('Quotes')} />
        <View>
          <Text>AboutScreen</Text>
        </View>
      </View>
    )
  }
}

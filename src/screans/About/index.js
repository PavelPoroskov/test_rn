import React from 'react';
import {Button} from 'react-native';

export default
class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Quotes"
        onPress={() => navigate('Quotes')}
      />
    );
  }
}
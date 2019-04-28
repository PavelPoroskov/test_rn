import React from 'react';
import {View, Button} from 'react-native';

import QuotesTableConnected from './QuotesTableConnected';

export default
class QuotesScreen extends React.Component {
  static navigationOptions = {
    title: 'Quotes',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button
          title="Go to About"
          onPress={() => navigate('About')}
        />
        <QuotesTableConnected />
      </View>
    );
  }
}

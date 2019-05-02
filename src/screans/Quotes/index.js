import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

import QuotesTableConnected from './QuotesTableConnected';

const styles = StyleSheet.create({
  fullHeight: {
//    height: '100vh',
    height: '100%',
  },
})

export default
class QuotesScreen extends React.Component {
  static navigationOptions = {
    title: 'Quotes',
  };
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.fullHeight}>
        <Button
          title="Go to About"
          onPress={() => navigate('About')}
        />
        <QuotesTableConnected />
      </View>
    );
  }
}

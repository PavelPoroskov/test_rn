import React from 'react';
import {View, Button} from 'react-native';

import QuotesTable from '../../components/QuotesTable';

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
        <QuotesTable/>
      </View>
    );
  }
}
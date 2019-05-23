import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'

//import QuotesTableRow from './QuotesTableRow'
//import QuotesTableRow from './QuotesTableRowColor'
import QuotesTableRow from './QuotesTableRowPrev' // not use rn.Animated.addListener, low cpu usage

const styles = StyleSheet.create({
  dtable: {
    flexDirection: 'column',
    flex: 1,
  },
  dtable__hrow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  dtable__row__hcell_s: {
    flex: 1,
    alignItems: 'center',
  },
  dtable__row__hcell: {
    flex: 1,
    //alignItems: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  errorView: {
    backgroundColor: 'pink',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    //marginLeft: 10,
  },
})

const QuotesTableHeader = () => (
  <View style={styles.dtable__hrow}>
    <View style={styles.dtable__row__hcell_s}>
      <Text>Pair</Text>
    </View>
    <View style={styles.dtable__row__hcell}>
      <Text>Last</Text>
    </View>
    <View style={styles.dtable__row__hcell}>
      <Text>Highest Bid</Text>
    </View>
    <View style={styles.dtable__row__hcell}>
      <Text>Change %</Text>
    </View>
  </View>
)

const QuotesTableFlat = ({ arRows, error, info }) => (
  <View style={styles.dtable}>
    {info && <Text>{`requests ${info.countRequest}`}</Text>}
    <QuotesTableHeader />
    {error && (
      <View style={styles.errorView}>
        <Text style={styles.errorText}>Error</Text>
      </View>
    )}
    {arRows && (
      <FlatList
        ListEmptyComponent={() => <Text>Empty result</Text>}
        data={arRows}
        renderItem={({ item }) => (
          <QuotesTableRow oRow={item} key={item.pair} />
        )}
      />
    )}
  </View>
)

export default QuotesTableFlat

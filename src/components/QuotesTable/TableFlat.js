import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  dtable: {
    flexDirection: 'column',
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

  dtable__row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  dtable__row__cell_s: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 1,
    //backgroundColor: 'bisque',
  },
  dtable__row__cell: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 4,
    //backgroundColor: 'aqua',
  },
  errorView: {
    backgroundColor: 'pink',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10,
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

const QuotesTableRow = ({ oRow }) => (
  <View style={styles.dtable__row}>
    <View style={styles.dtable__row__cell_s}>
      <Text>{oRow['pair']}</Text>
    </View>
    <View style={styles.dtable__row__cell}>
      <Text>{oRow['last']}</Text>
    </View>
    <View style={styles.dtable__row__cell}>
      <Text>{oRow['highestBid']}</Text>
    </View>
    <View style={styles.dtable__row__cell}>
      <Text>{oRow['percentChange']}</Text>
    </View>
  </View>
)

// const Rows = ({ arRows }) => (
//   <FlatList
//     data={arRows}
//     renderItem={({ item }) => <QuotesTableRow oRow={item} key={item.pair} />}
//   />
// )

const QuotesTableFlat = ({ arRows, oDebug, error, info }) => (
  <View style={styles.dtable}>
    {info && <Text>{`requests ${info.countRequest}`}</Text>}
    {error && (
      <View style={styles.errorView}>
        <Text style={styles.errorText}>Error</Text>
      </View>
    )}
    <QuotesTableHeader />
    {arRows && (
      <FlatList
        data={arRows}
        renderItem={({ item }) => (
          <QuotesTableRow oRow={item} key={item.pair} />
        )}
      />
    )}
  </View>
)

export default QuotesTableFlat

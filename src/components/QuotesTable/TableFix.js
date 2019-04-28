import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  dtable: {
    flexDirection: 'column',
  },
  dtable__hrow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
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
      <Text>Change %</Text>
    </View>
    <View style={styles.dtable__row__hcell}>
      <Text>High 24hr</Text>
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
      <Text>{oRow['percentChange']}</Text>
    </View>
    <View style={styles.dtable__row__cell}>
      <Text>{oRow['high24hr']}</Text>
    </View>
  </View>
)

const QuotesTable = ({arRows, oDebug, error, info}) => (
  <View style={styles.dtable}>
    <View>
      <Text>
        {info && `requests ${info.countRequest}`}
        {error}
      </Text>
    </View>
    <QuotesTableHeader />
    {arRows.map(oRow => (
      <QuotesTableRow oRow={oRow} key={oRow.pair} />
    ))}
  </View>
)

export default QuotesTable

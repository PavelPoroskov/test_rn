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

// //good
// const QuotesTable0 = () => (
//   <View style={styles.dtable}>
//     <View style={styles.dtable__row} key={1}>
//       <View style={styles.dtable__row__cell}>
//         <Text>String 22</Text>
//       </View>
//       <View style={styles.dtable__row__cell}>
//         <Text>String 23</Text>
//       </View>
//     </View>
//     <View style={styles.dtable__row} key={2}>
//       <View style={styles.dtable__row__cell}>
//         <Text>String 32</Text>
//       </View>
//       <View style={styles.dtable__row__cell}>
//         <Text>String 33</Text>
//       </View>
//     </View>
//   </View>
// )

    // {arColumns.map(oColumn => (
    //   <View style={styles.dtable__row__hcell} key={oColumn.header}>
    //     <Text>{oColumn.header}</Text>
    //   </View>
    // ))}
const QuotesTableHeader = ({ arColumns }) => (
  <View style={styles.dtable__hrow}>
    {arColumns.map( (oColumn, ind) => (
      <View style={ind ? styles.dtable__row__hcell : styles.dtable__row__hcell_s} key={oColumn.header}>
        <Text>{oColumn.header}</Text>
      </View>
    ))}
  </View>
)

const QuotesTableRow = ({ arColumns, oRow }) => (
  <View style={styles.dtable__row}>
    {arColumns.map( (oColumn, ind) => (
      <View style={ind ? styles.dtable__row__cell : styles.dtable__row__cell_s} key={oColumn.header}>
        <Text>{oRow[oColumn.field]}</Text>
      </View>
    ))}
  </View>
)

const QuotesTable = ({ arColumns, arRows }) => (
  <View style={styles.dtable}>
    <QuotesTableHeader arColumns={arColumns} />
    {arRows.map(oRow => (
      <QuotesTableRow arColumns={arColumns} oRow={oRow} key={oRow.pair} />
    ))}
  </View>
)

export default QuotesTable

import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'

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

  dtable__row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  dtable__row__cell_s: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 4,
    //backgroundColor: 'bisque',
  },
  dtable__row__cell: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 4,
  },
  dtable__row__cell_last: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 4,
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
  // cell: {
  //   flex: 1,
  //   //alignItems: 'flex-end',
  //   //marginRight: 4,
  //   //backgroundColor: 'aqua',
  //   marginLeft: 4,

  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',

  //   overflow: 'hidden',
  // },
  // cell_last: {
  //   flex: 1,
  //   //alignItems: 'flex-end',

  //   //marginRight: 4,
  //   paddingLeft: 4,
  //   //backgroundColor: 'aqua',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  // },
  // cell_left: {
  //   flex: 1,
  //   //minWidth: 10,
  // },
  // cell_right: {
  //   overflow: 'hidden',
  //   //whiteSpace: 'nowrap',
  //   //textOverflow: 'ellipsis',
  // },
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
      <Text>{oRow['key']}</Text>
    </View>
    <View style={styles.dtable__row__cell}>
      <Text numberOfLines={1} ellipsizeMode={'clip'}>{oRow['last']}</Text>
    </View>
    <View style={styles.dtable__row__cell}>
      <Text numberOfLines={1} ellipsizeMode={'clip'}>{oRow['highestBid']}</Text>
    </View>
    <View style={styles.dtable__row__cell_last}>
      <Text numberOfLines={1} ellipsizeMode={'clip'}>{oRow['percentChange']}</Text>
    </View>
  </View>
)

// const QuotesTableRow = ({ oRow }) => (
//   <View style={styles.dtable__row}>
//     <View style={styles.dtable__row__cell_s}>
//       <Text>{oRow['key']}</Text>
//     </View>
//     <View style={styles.cell}>
//       <View style={styles.cell_left}></View>
//       <View style={styles.cell_right}>
//         <Text>{oRow['last']}</Text>
//       </View>
//     </View>
//     <View style={styles.cell}>
//       <View style={styles.cell_left}></View>
//       <View style={styles.cell_right}>
//         <Text>{oRow['highestBid']}</Text>
//       </View>
//     </View>
//     <View style={styles.cell_last}>
//       <View style={styles.cell_left}></View>
//       <View style={styles.cell_right}>
//         <Text>{oRow['percentChange']}</Text>
//       </View>
//     </View>
//   </View>
// )

// //to show last items of list
// const ListFooterComponent = (props) => (
//   <View>
//     <View>
//       <Text></Text>
//     </View>
//     <View>
//       <Text></Text>
//     </View>
//     <View>
//       <Text></Text>
//     </View>
//     <View>
//       <Text></Text>
//     </View>
//     <View>
//       <Text></Text>
//     </View>
//     <View>
//       <Text></Text>
//     </View>
//     <View>
//       <Text></Text>
//     </View>
//     <View>
//       <Text></Text>
//     </View>
//     <View>
//       <Text></Text>
//     </View>
//   </View>
// )
//         ListFooterComponent={ListFooterComponent}

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

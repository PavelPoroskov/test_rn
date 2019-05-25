import React from 'react'

import { Text, View, StyleSheet, Animated } from 'react-native'

const styles = StyleSheet.create({
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
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  },
  nochange: {
  },
})

const debugKey = 'BTC_EOS'

const initState = { key: null, last: null, highestBid: null, percentChange: null, changed: false, row: {} };

class QuotesTableRow extends React.PureComponent {
  state = {
    value: new Animated.Value(0),  
  }

  componentDidMount() {
    Animated.timing(                  
      this.state.value,            
      {
        toValue: 1,                   
        duration: 10000,              
      }
    ).start();                        
  }

//  if (prevRow && !colors.changed) {
  //let prevRendRow = colors.row
  //if (prevRow && !(oRow.last == prevRendRow.last && oRow.highestBid == prevRendRow.highestBid && oRow.percentChange == prevRendRow.percentChange)) {
  if (prevRow && oRow !== colors.row) {
    let oUpdate = {}
    let cPlus = 0
    let cMinus = 0
    if (prevRow.last < oRow.last) {
      oUpdate['last'] = styles.green
      oUpdate['key'] = styles.green
      cPlus++
    }else if (oRow.last < prevRow.last) {
      oUpdate['last'] = styles.red
      oUpdate['key'] = styles.red
      cMinus++
    }
    if (prevRow.highestBid < oRow.highestBid) {
      oUpdate['highestBid'] = styles.green
      cPlus++
    }else if (oRow.highestBid < prevRow.highestBid) {
      oUpdate['highestBid'] = styles.red
      cMinus++
    }
    if (prevRow.percentChange != oRow.percentChange) {
      if (0 < oRow.percentChange) {
        oUpdate['percentChange'] = styles.green
        cPlus++
      }else if (oRow.percentChange < 0) {
        oUpdate['percentChange'] = styles.red
        cMinus++
      }
    }
    if (0 < cPlus) {
      if (!oUpdate['key']) {
        oUpdate['key'] = styles.green
      }
      oUpdate['row'] = oRow
      dispatch({ type: "colors-update", payload: oUpdate });
    }else if (0 < cMinus) {
      if (!oUpdate['key']) {
        oUpdate['key'] = styles.red
      }
      oUpdate['row'] = oRow
      dispatch({ type: "colors-update", payload: oUpdate });
    }
  }


  render() {
    const oRow = this.props.oRow
    if (oRow['key']===debugKey) {
      //console.log(`render QuotesTableRow ${oRow['key']} ${tAnimValue}`)
      console.log(`render QuotesTableRow ${oRow['key']}`)
      console.log(`   ${oRow['last']} ${oRow['highestBid']} ${oRow['percentChange']}`)
    }

    return (
      <View style={styles.dtable__row}>
        <View style={styles.dtable__row__cell_s}>
          <Text style={colors.key}>{oRow['key']}</Text>
        </View>
        <View style={styles.dtable__row__cell}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={colors.last}
          >
            {oRow['last']}
          </Animated.Text>
        </View>
        <View style={styles.dtable__row__cell}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={colors.highestBid}
          >
            {oRow['highestBid']}
          </Animated.Text>
        </View>
        <View style={styles.dtable__row__cell}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={colors.percentChange}
          >
            {oRow['percentChange']}
          </Animated.Text>
        </View>
      </View>
    )
  }
}

export default QuotesTableRow

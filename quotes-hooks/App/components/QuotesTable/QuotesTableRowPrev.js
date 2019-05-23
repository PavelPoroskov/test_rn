import React, { useReducer, useEffect, useRef } from 'react'

import { Text, View, StyleSheet } from 'react-native'

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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
//const debugKey = 'BTC_EOS'

const initState = { key: null, last: null, highestBid: null, percentChange: null, changed: false, row: {} };

function reducer(state, action) {

  switch (action.type) {
    case "colors-reset":
      return initState; // { session: true, loading: true, data: null, error: null }
    case "colors-update":
      //return { ...state, session: false, loading: false, data: null };
      return { ...state, ...action.payload, changed: true };
    default:
      throw new Error(`QuotesTableRow/reducer: unknown action.type ${action.type}`);
  }
}

function useTimer(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

const QuotesTableRow = ({ oRow }) => {
  const [colors, dispatch] = useReducer(reducer, initState)
  const prevRow = usePrevious(oRow)

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

  useTimer( () => {
    dispatch({ type: "colors-reset" });
  }, colors.changed ? 5000 : null )


  // // //700-->400 : [700, 600, 500, 400]
  // // const tAnimValue=`${Math.round(animValue._value/100)*100}`
  // if (oRow['key']===debugKey) {
  //   //console.log(`render QuotesTableRow ${oRow['key']} ${tAnimValue}`)
  //   console.log(`render QuotesTableRow ${oRow['key']} ${color}`)
  //   console.log(`   ${oRow['last']} ${oRow['highestBid']} ${oRow['percentChange']}`)
  // }
  // // //console.dir(animValue)

  return (
    <View style={styles.dtable__row}>
      <View style={styles.dtable__row__cell_s}>
        <Text style={colors.key}>{oRow['key']}</Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={colors.last}
        >
          {oRow['last']}
        </Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={colors.highestBid}
        >
          {oRow['highestBid']}
        </Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={colors.percentChange}
        >
          {oRow['percentChange']}
        </Text>
      </View>
    </View>
  )
}

//export default QuotesTableRow

function areEqual(prevProps, nextProps) {
  const prevRow = prevProps.oRow
  const nextRow = nextProps.oRow

  return (
    nextRow.last == prevRow.last &&
    nextRow.highestBid == prevRow.highestBid &&
    nextRow.percentChange == prevRow.percentChange
  )
}

export default React.memo(QuotesTableRow, areEqual)

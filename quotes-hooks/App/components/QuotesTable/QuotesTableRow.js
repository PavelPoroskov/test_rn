import React, { useState, useEffect, useRef } from 'react'

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
})
  // const [animValue, setAnimValue] = useState(new Animated.Value(700))
  //       toValue: 400, // Animate to opacity: 1 (opaque)

const QuotesTableRow = ({ oRow }) => {
//  const [animValue, setAnimValue] = useState(new Animated.Value(700))
  const [fontWeight, setFontWeight] = useState('400')
  const refIsSecondUpdate = useRef(false);
  const oAnimated = useRef(null);

  useEffect(() => {

    if (refIsSecondUpdate.current) {
      //console.log('start Animated.timing')
      //oAnimated.current = 
      oAnimated.current.addListener( value => {
        //const tAnimValue=`${Math.round(value.value/100)*100}`
        const tAnimValue = 420 < value.value ? '700' : '400'
        //console.dir(value)
        //console.log(`oAnimated.current.addListener ${value.value} ${tAnimValue}`)
        setFontWeight(tAnimValue)
      })

      Animated.timing(
        // Animate over time
        oAnimated.current, // The animated value to drive
        {
          toValue: 400, 
          duration: 5000, // Make it take a while
        }
      ).start()

    }
    if (!refIsSecondUpdate.current) {
      refIsSecondUpdate.current = true
    }

    return () => {
      if (oAnimated.current) {
        oAnimated.current.stopAnimation()
      }
      oAnimated.current = new Animated.Value(700)
      //setFontWeight('700')
    }

  }, [oRow.last, oRow.highestBid, oRow.percentChange] )

  // //700-->400 : [700, 600, 500, 400]
  // const tAnimValue=`${Math.round(animValue._value/100)*100}`
  // if (oRow['key']==='BTC_DCR') {
  //   //console.log(`render QuotesTableRow ${oRow['key']} ${tAnimValue}`)
  //   console.log(`render QuotesTableRow ${oRow['key']} ${tAnimValue} ${animValue._value}`)
  //   console.log(`   ${oRow['last']} ${oRow['highestBid']} ${oRow['percentChange']}`)
  // }
  // //console.dir(animValue)

  return (
    <View style={styles.dtable__row}>
      <View style={styles.dtable__row__cell_s}>
        <Animated.Text style={{ fontWeight }}>{oRow['key']}</Animated.Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={{ fontWeight }}
        >
          {oRow['last']}
        </Animated.Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={{ fontWeight }}
        >
          {oRow['highestBid']}
        </Animated.Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={{ fontWeight }}
        >
          {oRow['percentChange']}
        </Animated.Text>
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

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
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  },
  nochange: {
  },
})

//const debugKey = 'BTC_EOS'

const QuotesTableRow = ({ oRow }) => {
//  const [animValue, setAnimValue] = useState(new Animated.Value(700))
  const [color, setColor] = useState(styles.nochange)
  const refIsSecondUpdate = useRef(false);
  const oAnimated = useRef(null);

  useEffect(() => {

    if (refIsSecondUpdate.current) {
      //console.log('start Animated.timing')
      //oAnimated.current = 
      oAnimated.current.addListener( value => {


        //const tAnimValue=`${Math.round(value.value/100)*100}`
        let newColor = styles.nochange
        if (500 <= value.value && value.value <= 5450) {
          newColor = 0 < oRow.percentChange ? styles.green : styles.red  
        }
        // //console.dir(value)
        // if (oRow['key']===debugKey) {
        //   console.log(`oAnimated.current.addListener ${value.value} ${newColor}`)
        // }
        setColor(newColor)
      })

      Animated.timing(
        // Animate over time
        oAnimated.current, // The animated value to drive
        {
          toValue: 5500, 
          duration: 5500, // Make it take a while
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
      oAnimated.current = new Animated.Value(1)
      //setFontWeight('700')
    }

  }, [oRow.last, oRow.highestBid, oRow.percentChange] )

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
        <Animated.Text style={color}>{oRow['key']}</Animated.Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={color}
        >
          {oRow['last']}
        </Animated.Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={color}
        >
          {oRow['highestBid']}
        </Animated.Text>
      </View>
      <View style={styles.dtable__row__cell}>
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode={'clip'}
          style={color}
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

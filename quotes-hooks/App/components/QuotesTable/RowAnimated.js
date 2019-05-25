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
})

function color2arr10( _str ) {
  const str = _str.split('(#')[1]
  const sR = str.slice(0,2)
  const sG = str.slice(2,4)
  const sB = str.slice(4,6)

  return [ parseInt(sR, 16), parseInt(sG, 16), parseInt(sB, 16) ]
}

let sColor16 = 
//'chartreuse (#7fff00)' // light
//'forestgreen (#228b22)' // dark
//'green (#008000)' // dark
//'greenyellow (#adff2f)' // light
//'lawngreen (#7cfc00)' // light
//'lime (#00ff00)' 
//'limegreen (#32cd32)'
//'mediumspringgreen (#00fa9a)' // no 
//'springgreen (#00ff7f)' // no
//'yellowgreen (#9acd32)' // no
//'royalblue (#4169e1)'
//'mediumblue (#0000cd)'
'blue (#0000ff)'

const [ clR, clG, clB ] = color2arr10( sColor16 ) 

const oInterpolateGrow = {
  inputRange: [0, 500, 5000, 5500],
  outputRange: [
    'rgb(0, 0, 0)',
    `rgb(${clR}, ${clG}, ${clB})`,
    `rgb(${clR}, ${clG}, ${clB})`,
    'rgb(0, 0, 0)',
  ],
  extrapolate: 'calm',
}
const oInterpolateNoChange = {
  inputRange: [0, 5500],
  outputRange: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)'],
  extrapolate: 'calm',
}
const oInterpolateReduce = {
  inputRange: [0, 500, 5000, 5500],
  outputRange: [
    'rgb(0, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 0)',
  ],
  extrapolate: 'calm',
}

class RowAnimated extends React.PureComponent {
  state = {
    animValue: new Animated.Value(0),
    animParams: {
      key: oInterpolateNoChange,
      last: oInterpolateNoChange,
      highestBid: oInterpolateNoChange,
      percentChange: oInterpolateNoChange,
    },
  }

  render() {
    const oRow = this.props.oRow
    const animValue = this.state.animValue
    const animParams = this.state.animParams

    return (
      <Animated.View style={styles.dtable__row}>
        <View style={styles.dtable__row__cell_s}>
          <Animated.Text
            style={{
              color: animValue.interpolate(animParams['key']),
            }}
          >
            {oRow['key']}
          </Animated.Text>
        </View>
        <View style={styles.dtable__row__cell}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={{
              color: animValue.interpolate(animParams['last']),
            }}
          >
            {oRow['last']}
          </Animated.Text>
        </View>
        <View style={styles.dtable__row__cell}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={{
              color: animValue.interpolate(animParams['highestBid']),
            }}
          >
            {oRow['highestBid']}
          </Animated.Text>
        </View>
        <View style={styles.dtable__row__cell}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={{
              color: animValue.interpolate(animParams['percentChange']),
            }}
          >
            {oRow['percentChange']}
          </Animated.Text>
        </View>
      </Animated.View>
    )
  }

  componentDidMount() {
    this._restartAnimation()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.oRow !== prevProps.oRow) {
      this._restartAnimation()
    }
  }

  _restartAnimation = () => {
    const oUpdate = this.props.oUpdate

    // const cUpdates = Object.keys(oUpdate).reduce( (acc, key) => (acc + (oUpdate[key] < 0 ? 1 : oUpdate[key])), 0 )
    // if (cUpdates == 0) {
    //   return
    // }
    if (oUpdate['key'] == 0) {
      return
    }

    //start animation
    let animParams = {
      key: oInterpolateNoChange,
      last: oInterpolateNoChange,
      highestBid: oInterpolateNoChange,
      percentChange: oInterpolateNoChange,
    }
    Object.keys(animParams).forEach(key => {
      if (oUpdate[key] !== 0) {
        animParams[key] =
          oUpdate[key] < 0 ? oInterpolateReduce : oInterpolateGrow
      }
    })

    this.state.animValue.stopAnimation()

    this.setState(
      {
        animValue: new Animated.Value(0),
        animParams,
      },
      () => {
        Animated.timing(this.state.animValue, {
          toValue: 5500,
          duration: 5500,
        }).start()
      }
    )
  } 
}

export default RowAnimated

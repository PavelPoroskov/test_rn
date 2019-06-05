import React from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'

const styles = StyleSheet.create({
  dtable__row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    //backgroundColor: 'lightcyan',
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

const colorDefault = 'black'
const colorUp = 'blue'
const colorDown = 'red'
const colorBackgrUp = 'rgb(230,230,250)'
const colorBackgrDown = 'rgb(255,228,225)'

// const oInterpolateUp = {
//   inputRange: [0, 1],
//   outputRange: [
//     'rgba(230,230,250,0)',
//     'rgba(230,230,250,1)',
//   ],
//   extrapolate: 'calm',
// }
// const oInterpolateDown = {
//   inputRange: [0, 1],
//   outputRange: [
//     'rgba(255,228,225,0)',
//     'rgba(255,228,225,1)',
//   ],
//   extrapolate: 'calm',
// }

class RowAnimated extends React.PureComponent {
  state = {
    animValue: new Animated.Value(0),
    animParams: {
      key: colorDefault,
      last: colorDefault,
      highestBid: colorDefault,
      percentChange: colorDefault,
    },
    backgroundColor: null,
  }

  render() {
    const oRow = this.props.oRow
    const animValue = this.state.animValue
    const animParams = this.state.animParams
    const backgroundColor = this.state.backgroundColor

    if (__DEV__) {
      // //render row from second page
      // if (oRow['key']==='XMR_LTC') {
      //   console.log(`render Row`) 
      //   console.log(oRow) 
      // }
    }

    return (
      <View style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        backgroundColor: backgroundColor ? backgroundColor : 'transparent'
      }}>
        <View style={styles.dtable__row__cell_s}>
          <Animated.Text
            style={{
              color: animParams['key'],
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
              color: animParams['last'],
              opacity: animParams['last'] === colorDefault ? 1 : animValue,
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
              color: animParams['highestBid'],
              opacity: animParams['last'] === colorDefault ? 1 : animValue,
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
              color: animParams['percentChange'],
              opacity: animParams['last'] === colorDefault ? 1 : animValue,
            }}
          >
            {oRow['percentChange']}
          </Animated.Text>
        </View>
      </View>
    )
  }

  // componentDidMount() {
  //   this._restartAnimation()
  // }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.oRow !== prevProps.oRow) {
      this._restartAnimation()
    }
  }
  componentWillUnmount() {
    //this.state.animValue.stopAnimation()

    if (this.animSequence) {
      this.animSequence.stop()
    }
  }
  _restartAnimation = () => {
    const oUpdate = this.props.oUpdate

    let animParams = {
      key: colorDefault,
      last: colorDefault,
      highestBid: colorDefault,
      percentChange: colorDefault,
    }

    //start animation
    Object.keys(animParams).forEach(key => {
      if (oUpdate[key] !== 0) {
        animParams[key] =
          oUpdate[key] < 0 ? colorDown : colorUp
      }
    })

    //this.state.animValue.stopAnimation()
    if (this.animSequence) {
      this.animSequence.stop()
    }

    this.setState(
      {
        animValue: new Animated.Value(0),
        animParams,
        // backgroundColor: 0 < oUpdate['key'] ? oInterpolateUp : oInterpolateDown,
        backgroundColor: 0 < oUpdate['key'] ? colorBackgrUp : colorBackgrDown,
      },
      () => {

        this.animSequence = Animated.sequence([

          Animated.timing( this.state.animValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.delay(4499)

        ])

        this.animSequence.start( this._onStopAnimation )

      }
    )
  } 
  _onStopAnimation = () => {
    let animParams = {
      key: colorDefault,
      last: colorDefault,
      highestBid: colorDefault,
      percentChange: colorDefault,
    }

    this.setState({
      animParams,
      backgroundColor: null,
    })
  }
}

export default RowAnimated

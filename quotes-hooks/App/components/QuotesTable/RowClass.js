import React from 'react'

import RowAnimated from './RowAnimated'

function areEqual(prevRow, nextRow) {
  return (
    nextRow.last == prevRow.last &&
    nextRow.highestBid == prevRow.highestBid &&
    nextRow.percentChange == prevRow.percentChange
  )
}

class Row extends React.Component {
  // state = {

  //   prevRow: null,
  // }
  prevRow = null
  //nRowRepeat = 0
  prevRowCleared = true

  // static getDerivedStateFromProps(props, state) {
  //   if () {

  //   }

  //   return null
  // }
  shouldComponentUpdate(nextProps, nextState) {
    const isEquel = areEqual(this.props.oRow, nextProps.oRow)
    //return !isEquel

    // render first time) animation and color changes
    // render second time) clear color
    //return !isEquel || (isEquel && this.nRowRepeat < 1)
    return !isEquel || (isEquel && !this.prevRowCleared)

    //return false
  }
  render() {
    const oRow = this.props.oRow
    const prevRow = this.prevRow

    // if (oRow.key === 'BTC_ETC') {
    //   console.log(`render ${oRow.key} ${oRow['last']} ${oRow['highestBid']} ${oRow['percentChange']} `)
    // }    
    let oUpdate = { 'key': 0, 'last': 0, 'highestBid': 0, 'percentChange': 0 }
    //if (this.nRowRepeat === 0) {
    if (prevRow) {
      let cPlus = 0
      let cMinus = 0
      if (prevRow.last < oRow.last) {
        oUpdate['last'] = +1
        oUpdate['key'] = +1
        cPlus++
      } else if (oRow.last < prevRow.last) {
        oUpdate['last'] = -1
        oUpdate['key'] = -1
        cMinus++
      }
      if (prevRow.highestBid < oRow.highestBid) {
        oUpdate['highestBid'] = +1
        cPlus++
      } else if (oRow.highestBid < prevRow.highestBid) {
        oUpdate['highestBid'] = -1
        cMinus++
      }
      if (prevRow.percentChange != oRow.percentChange) {
        if (0 < oRow.percentChange) {
          oUpdate['percentChange'] = +1
          cPlus++
        } else if (oRow.percentChange < 0) {
          oUpdate['percentChange'] = -1
          cMinus++
        }
      }
      if (0 < cPlus) {
        if (!oUpdate['key']) {
          oUpdate['key'] = +1
        }
      } else if (0 < cMinus) {
        if (!oUpdate['key']) {
          oUpdate['key'] = -1
        }
      }
    }
    //}

    return <RowAnimated oRow={oRow} oUpdate={oUpdate} />
  }
  componentDidMount() {
    this.prevRow = this.props.oRow
    //this.nRowRepeat = 1
    this.prevRowCleared = true
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (areEqual(this.prevRow, this.props.oRow)) {
      //this.nRowRepeat = this.nRowRepeat + 1
      this.prevRowCleared = true
    } else {
      this.prevRow = this.props.oRow
      //this.nRowRepeat = 0
      this.prevRowCleared = false
    }
  }
}

export default Row

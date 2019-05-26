import React, { useEffect, useRef } from 'react'

import RowAnimated from './RowAnimated'


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const QuotesTableRow = ({ oRow }) => {
  const prevRow = usePrevious(oRow)

  let oUpdate = { 'key': 0, 'last': 0, 'highestBid': 0, 'percentChange': 0 }
  if (prevRow) {
    let cPlus = 0
    let cMinus = 0
    if (prevRow.last < oRow.last) {
      oUpdate['last'] = +1
      oUpdate['key'] = +1
      cPlus++
    }else if (oRow.last < prevRow.last) {
      oUpdate['last'] = -1
      oUpdate['key'] = -1
      cMinus++
    }
    if (prevRow.highestBid < oRow.highestBid) {
      oUpdate['highestBid'] = +1
      cPlus++
    }else if (oRow.highestBid < prevRow.highestBid) {
      oUpdate['highestBid'] = -1
      cMinus++
    }
    if (prevRow.percentChange != oRow.percentChange) {
      if (0 < oRow.percentChange) {
        oUpdate['percentChange'] = +1
        cPlus++
      }else if (oRow.percentChange < 0) {
        oUpdate['percentChange'] = -1
        cMinus++
      }
    }
    if (0 < cPlus) {
      if (!oUpdate['key']) {
        oUpdate['key'] = +1
      }
    }else if (0 < cMinus) {
      if (!oUpdate['key']) {
        oUpdate['key'] = -1
      }
    }
  }

  return <RowAnimated oRow={oRow} oUpdate={oUpdate} />
}

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

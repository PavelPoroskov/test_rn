import React from 'react';
import {withNavigationFocus} from 'react-navigation';

import {useIntervalRequest} from '../../api/hooks';

import QuotesTable from '../../components/QuotesTable';
import Loading from '../../components/Loading';
import config from '../../config';

// const arColumns = [
// //  { header: 'Id', field: 'id' }, // 177
//   { header: 'Pair', field: 'pair' }, // BTC_ARDR
//   { header: 'Last', field: 'last' }, // "0.00001233"
//   { header: 'Change %', field: 'percentChange' }, // "-0.00323362"
//   { header: 'High 24hr', field: 'high24hr' }, // "0.00001284"
//   // { header: 'highest Bid', field: 'highestBid' }, // "0.00001232"
//   // { header: 'Low 24hr', field: 'low24hr' }, // "0.00001217"
//   // { header: 'Lowest Ask', field: 'lowestAsk' }, // "0.00001244"
//   // { header: 'Base Volume', field: 'baseVolume' }, // "1.32654954"
//   // { header: 'Quote Volume', field: 'quoteVolume' }, // "106300.27248140"
//   // { header: 'Frozen', field: 'isFrozen' }, // "0"
// ]

// const arRows = [
//   { pair: "BTC_BCN", "id":7,"last":"0.00000016","lowestAsk":"0.00000017","highestBid":"0.00000016","percentChange":"-0.05882352","baseVolume":"5.57883460","quoteVolume":"34681969.16538664","isFrozen":"0","high24hr":"0.00000017","low24hr":"0.00000016"},
//   { pair: "BTC_BTS", "id":14,"last":"0.00001010","lowestAsk":"0.00001015","highestBid":"0.00001010","percentChange":"0.03377686","baseVolume":"4.56320351","quoteVolume":"457393.66362199","isFrozen":"0","high24hr":"0.00001017","low24hr":"0.00000971"},
//   { pair: "BTC_BURST", "id":15,"last":"0.00000089","lowestAsk":"0.00000090","highestBid":"0.00000089","percentChange":"-0.01111111","baseVolume":"1.72702138","quoteVolume":"1921455.78849734","isFrozen":"0","high24hr":"0.00000093","low24hr":"0.00000087"},
//   { pair: "BTC_CLAM", "id":20,"last":"0.00160536","lowestAsk":"0.00160535","highestBid":"0.00160064","percentChange":"0.01831283","baseVolume":"2.49594385","quoteVolume":"1571.12612429","isFrozen":"0","high24hr":"0.00161400","low24hr":"0.00156003"},
//   { pair: "BTC_DASH", "id":24,"last":"0.02066003","lowestAsk":"0.02074872","highestBid":"0.02066003","percentChange":"-0.00772446","baseVolume":"19.49193374","quoteVolume":"938.82853785","isFrozen":"0","high24hr":"0.02099999","low24hr":"0.02043013"},
//   { pair: "BTC_DGB", "id":25,"last":"0.00000208","lowestAsk":"0.00000209","highestBid":"0.00000208","percentChange":"0.00000000","baseVolume":"11.86427805","quoteVolume":"5568070.94031877","isFrozen":"0","high24hr":"0.00000220","low24hr":"0.00000207"},
//   { pair: "BTC_DOGE", "id":27,"last":"0.00000048","lowestAsk":"0.00000048","highestBid":"0.00000047","percentChange":"0.02127659","baseVolume":"54.43132979","quoteVolume":"113739425.06041349","isFrozen":"0","high24hr":"0.00000049","low24hr":"0.00000046"},
//   { pair: "BTC_GAME", "id":38,"last":"0.00001943","lowestAsk":"0.00001963","highestBid":"0.00001943","percentChange":"-0.01620253","baseVolume":"0.18317022","quoteVolume":"9158.68706994","isFrozen":"0","high24hr":"0.00002040","low24hr":"0.00001914"},
// ]
const fnLimit = (oResult) => {
  let newResult = []

  let limit = 10
  //stupid error
  //for (let key of oResult) {
  for (let key in oResult) {
    let newRow = { pair: key, ...oResult[key] }
    newResult.push(newRow)

    limit--
    if (limit <= 0) {
      break
    }
  }

  return newResult
}

const QuotesTableConnected = (props) => {
  
  //this.props.isFocused ? 5000 : null
  // this.props.isFocused => request every 5sec
  // not this.props.isFocused => not request

  //const [loading, data, error, info] = useIntervalRequest( config.URL, 5000, result => Object.keys(result).map( key => ({ pair: key, ...result[key] }) ) )
  const [loading, data, error, info] = useIntervalRequest( config.URL, props.isFocused ? 5000 : null , fnLimit )
  //console.log(`loading ${loading}, error ${error}`)

  if (!data) {
    if (loading) {
      return <Loading/>
    }
  }
//  return <QuotesTable arColumns={arColumns} arRows={data} error={error} info={info}/>
  return <QuotesTable arRows={data} error={error} info={info}/>
}

export default  withNavigationFocus(QuotesTableConnected)

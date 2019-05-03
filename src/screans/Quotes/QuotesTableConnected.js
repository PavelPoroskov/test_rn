import React from 'react';
import {withNavigationFocus} from 'react-navigation';

//import {useRepeatRequest, useAppIsActive} from '../../api';
import {useRepeatRequestReducer as useRepeatRequest, useAppIsActive} from '../../api';
//import {useRepeatRequestWhenActive} from '../../api';
import QuotesTable from '../../components/QuotesTable';
import Loading from '../../components/Loading';

import config from '../../config';

const QuotesTableConnected = (props) => {
  
  //it work, but
  const appIsActive = useAppIsActive()
  const [loading, data, error, info] = useRepeatRequest( appIsActive && props.isFocused, config.URL, 5000, config.transformResult )
  console.log(`QuotesTableConnected/loading ${loading}`) 

  // //it (custom hook inside custom hook) work, but 
  // const [loading, data, error, info] = useRepeatRequestWhenActive( props.isFocused, config.URL, 5000, config.transformResult )
  // console.log(`QuotesTableConnected`) 

  if (loading) {
    console.log('QuotesTableConnected: render Loading')
    return <Loading/>
  }
  if ( !(data || error) ) {
    return null
  }
  return <QuotesTable arRows={data} error={error} info={info}/>
}

export default withNavigationFocus(QuotesTableConnected)

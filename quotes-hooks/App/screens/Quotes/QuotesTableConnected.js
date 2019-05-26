import React from 'react';
import {withNavigationFocus} from 'react-navigation';

import {useRepeatRequest, useAppIsActive} from '../../api';

import QuotesTable from '../../components/QuotesTable';
import Loading from '../../components/Loading';

import config from '../../config';


const QuotesTableConnected = React.memo( (props) => {
  
  const appIsActive = useAppIsActive()
  const [loading, data, error, info] = useRepeatRequest( appIsActive && props.isFocused, config.URL, 5000, config.transformResult )
  //console.log(`render QuotesTableConnected ${info.countRequest}`) 

  if (loading) {
    return <Loading/>
  }
  if ( !(data || error) ) {
    return null
  }
  if (__DEV__) {
    console.log(`render QuotesTable ${info.countRequest}`) 
  }
  return <QuotesTable arRows={data} error={error} info={info}/>
})

//before: first_render, second_render, render_after_request-success 
//use React.memo() to not render second_render

export default withNavigationFocus(QuotesTableConnected)

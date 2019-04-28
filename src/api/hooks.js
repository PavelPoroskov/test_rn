
import React, { useState, useEffect, useRef } from 'react';

// from
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
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
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function useIntervalRequest( _URL, _delay, fnTransform ) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const [countRequest, setCountRequest] = useState(0)

  const fnRequest = async () => {
    try {
      //setLoading(true)
      console.log('before fetch')
      setCountRequest(countRequest + 1)

      const result = await fetch(_URL)
      console.log('after fetch')
      let newData = await result.json()
      if (fnTransform) {
        newData = fnTransform(newData)
      }

      setData(newData)
      setLoading(false)
      setError(null)
    }catch (err) {
      setLoading(false)
      setError(err)
    }
  }  

  if (countRequest === 0) {
    //only first time, else cpu loading to 32%
    fnRequest()    
  }
  useInterval( fnRequest, _delay )

  let oDebug = {
    countRequest
  }
  return [
    loading,
    data,
    error,

    oDebug,
    //null,
  ]
}


export {
  useInterval,
  useIntervalRequest,
}
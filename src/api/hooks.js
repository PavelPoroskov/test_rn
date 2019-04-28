
import { useState, useEffect, useRef } from 'react';

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

function useIntervalRequest_v0( _isOn, _URL, _delay, fnTransform ) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // const [countRequest, setCountRequest] = useState(0)
  // const [prevIsOn, setPrevIsOn] = useState(false)
  const savedCountRequest = useRef(0);
  const savedPrevIsOn = useRef(false);

  const fnRequest = async () => {
    try {
      //setLoading(true)
      //console.log('before fetch')
      //setCountRequest(countRequest + 1)
      savedCountRequest.current = savedCountRequest.current + 1

      const result = await fetch(_URL)
      //console.log('after fetch')
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

  //option 1: before render?
  //if (!!prevIsOn.current !== !!_isOn) {
  if (savedPrevIsOn.current !== _isOn) {
    //setPrevIsOn(_isOn)
    savedPrevIsOn.current = _isOn
    if (_isOn) {
      //1)only first time, else cpu loading to 32%
      //2) on resume ( !prevIsOn && _isOn )

      // if show spinner on resume
      //setLoading(true)
      //setData(null)

      //setError(null)

      fnRequest()    
    }
  }
  // // option 2: after render, not need "savedPrevIsOn.current"
  // useEffect(() => {
  //   if (_isOn) {
  //     //1)only first time, else cpu loading to 32%
  //     //2) on resume ( !prevIsOn && _isOn )

  //     // if show spinner on resume
  //     //setLoading(true)
  //     //setData(null)

  //     //setError(null)

  //     fnRequest()    
  //   }
  // }, [_isOn]);

  // _isOn : do request
  // !_isOn : stop to request
  const delay = _isOn ? _delay : null
  useInterval( fnRequest, delay )

  let oDebug = {
    countRequest: savedCountRequest.current
  }
  return [
    loading,
    data,
    error,

    oDebug,
    //null,
  ]
}


//option
function useRunIntervalRun( isOn, asCallback, delay ) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = asCallback;
  }, [asCallback]);


  useEffect( () => {
    // Set up the interval.
    async function runTurnOnIntervals() {
      async function tick() {
        if (isOn) {
          await savedCallback.current();
        }
      }
      if (isOn) {
        await tick()
        //OR await tick()

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }
    //runTurnOnIntervals()
    return runTurnOnIntervals() // promise
  }, [isOn]);
}

function useIntervalRequest( _isOn, _URL, _delay, fnTransform ) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const savedCountRequest = useRef(0);

  const fnRequest = async () => {
    try {
      //setLoading(true)
      //console.log('before fetch')
      //setCountRequest(countRequest + 1)
      savedCountRequest.current = savedCountRequest.current + 1

      const result = await fetch(_URL)
      //console.log('after fetch')
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

  useRunIntervalRun( _isOn, fnRequest, _delay )

  let oDebug = {
    countRequest: savedCountRequest.current
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
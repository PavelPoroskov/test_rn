import { useReducer, useEffect, useRef } from 'react'

function fetchLimit(URL, msLimit) {
  let timeoutId
  const timer = new Promise(resolve => {
    timeoutId = setTimeout(resolve, msLimit, { timeout: true })
  })

  return Promise.race([fetch(URL), timer]).then(response => {
    if (response.timeout) {
      throw 'Connection timed out'
    }

    clearTimeout(timeoutId)
    return response
  })
}

const initState = { loading: true, data: null, error: null }

function reducer(state, action) {
  switch (action.type) {
    case 'session-begin':
      return initState;
    case 'session-end':
      return { ...state, data: null };
    case 'request-success':
      return { ...state, loading: false, data: action.payload };
    case 'request-error':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error();
  }
}

function useRepeatRequest(isOn, URL, delay, fnTransform) {
  //console.log('useRepeatRequest/begin')
  const [state, dispatch] = useReducer( reducer, initState ) // spinner on only first screen open

  const savedCountRequest = useRef(0)

  async function fnRequest() {
    if (!isOn) {
      return
    }

    savedCountRequest.current = savedCountRequest.current + 1

    try {
      //setLoading(true)
      //console.log(`before fetch ${savedCountRequest.current}`)
      //const result = await fetch(URL)
      const result = await fetchLimit(URL, 1500 )
      //console.log(`after fetch ${savedCountRequest.current}`)
      if (!isOn) {
        return
      }

      let newData = await result.json()
      if (!isOn) {
        return
      }

      if (fnTransform) {
        newData = fnTransform(newData)
      }
      if (!isOn) {
        return
      }

      console.log('Success')
      dispatch({ type: 'request-success', payload: newData })
    } catch (err) {
      //console.log(`catch error fetch ${savedCountRequest.current}`)
      console.log(err)

      dispatch({ type: 'request-error', payload: err })
    }
  }

  useEffect(() => {
    if (isOn) {
      console.log('FOCUS On')
      //spinner on every return
      //  --:show old data before spiner
      dispatch({ type: 'session-begin' })
      savedCountRequest.current = 0
      // setData(null)

      fnRequest()
      let id = setInterval(fnRequest, delay)
      return () => clearInterval(id)
    }else{
      console.log('FOCUS oFF')
      dispatch({ type: 'session-end' })
    }
    // eslint-disable-next-line
  }, [isOn])

  let info = {
    countRequest: savedCountRequest.current,
  }


  //console.log('useRepeatRequest/return')
  const {loading, data, error} = state
  return [
    loading,
    data,
    error,

    info,
    //null,
  ]
}



export default useRepeatRequest

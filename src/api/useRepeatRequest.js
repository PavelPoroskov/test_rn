import { useState, useEffect, useRef } from 'react'

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

function useRepeatRequest(isOn, URL, delay, fnTransform) {
  //console.log('useRepeatRequest/begin')
  const [state, setState] = useState(initState) // spinner on only first screen open

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
      setState({ loading: false, data: newData, error: null })
    } catch (err) {
      //console.log(`catch error fetch ${savedCountRequest.current}`)
      console.log(err)

      setState({ loading: false, data: state.data, error: err })
    }
  }

  useEffect(() => {
    if (isOn) {
      console.log('FOCUS On')
      //spinner on every return
      //  --:show old data before spiner
      setState(initState)
      savedCountRequest.current = 0
      // setData(null)

      fnRequest()
      let id = setInterval(fnRequest, delay)
      return () => clearInterval(id)
    }else{
      console.log('FOCUS oFF')
      setState({ loading: state.loading, data: null, error: state.error })
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

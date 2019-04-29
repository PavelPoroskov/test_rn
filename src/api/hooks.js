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

function useIntervalRequest(isOn, URL, delay, fnTransform) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

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

      setData(newData)
      setLoading(false)
      setError(null)
    } catch (err) {
      //console.log(`catch error fetch ${savedCountRequest.current}`)
      //console.log(err)

      setLoading(false)
      setError(err)
    }
  }

  useEffect(() => {
    if (isOn) {
      fnRequest()
      let id = setInterval(fnRequest, delay)
      return () => clearInterval(id)
    }
    // eslint-disable-next-line
  }, [isOn])

  let oDebug = {
    countRequest: savedCountRequest.current,
  }
  return [
    loading,
    data,
    error,

    oDebug,
    //null,
  ]
}

export { useIntervalRequest }

import { useState, useEffect, useRef } from 'react'

function useIntervalRequest(isOn, URL, delay, fnTransform) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const savedCountRequest = useRef(0)

  const fnRequest = async () => {
    if (!isOn) {
      return
    }

    try {
      //setLoading(true)
      savedCountRequest.current = savedCountRequest.current + 1

      const result = await fetch(URL)
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

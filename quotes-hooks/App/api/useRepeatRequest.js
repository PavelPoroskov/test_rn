import { useReducer, useEffect, useRef, useMemo } from 'react'

function fetchLimit(URL, msLimit) {
  let timeoutId
  const timer = new Promise(resolve => {
    timeoutId = setTimeout(resolve, msLimit, { timeout: true })
  })

  return Promise.race([fetch(URL), timer]).then(response => {
    if (response.timeout) {
      throw new Error('Connection timed out')
    }

    clearTimeout(timeoutId)
    return response
  })
}

const initState = { loading: true, data: null, error: null }

function reducer(state, action) {
  switch (action.type) {
    case 'session-begin':
      return initState // { session: true, loading: true, data: null, error: null }
    case 'session-pause':
      return { ...state, loading: false, data: null }
    case 'request-success':
      return { ...state, loading: false, data: action.payload, error: null }
    case 'request-error':
      return { ...state, loading: false, error: action.payload }
    default:
      throw new Error(
        `useRepeatRequest/reducer: unknown action.type ${action.type}`
      )
  }
}

function useRepeatRequest(isOn, URL, delay, fnTransform) {
  const [state, dispatch] = useReducer(reducer, initState) // spinner on only first screen open
  const savedCountSessionRequest = useRef(0)

  useEffect(() => {
    let ignore = false

    async function fnRequest() {
      savedCountSessionRequest.current = savedCountSessionRequest.current + 1

      try {
        const result = await fetchLimit(URL, 1500)
        let newData = await result.json()
        if (fnTransform) {
          newData = fnTransform(newData)
        }
        if (!ignore) {
          dispatch({ type: 'request-success', payload: newData })
        }
      } catch (err) {
        console.log(err)
        if (!ignore) {
          dispatch({ type: 'request-error', payload: err })
        }
      }
    }

    if (isOn && delay) {
      dispatch({ type: 'session-begin' })
      savedCountSessionRequest.current = 0

      fnRequest()
      let idInterval = setInterval(fnRequest, delay)
      return () => {
        ignore = true
        clearInterval(idInterval)
      }
    } else {
      dispatch({ type: 'session-pause' })
    }
  }, [isOn, delay, URL, fnTransform])

  const result = useMemo(() => {
    const { loading, data, error } = state

    let info = null
    if (__DEV__) {
      info = {
        countRequest: savedCountSessionRequest.current,
      }
    }

    return [
      loading,
      data,
      error,
      info, //null,
    ]
  }, [state])

  return result
}

export default useRepeatRequest

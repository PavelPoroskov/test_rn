import useAppIsActive from './useAppIsActive'
//import { AppState } from 'react-native'

import { useState, useEffect, useRef } from 'react'

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

function useRepeatRequestWhenActive(isOn, URL, delay, fnTransform) {
  const appIsActive = useAppIsActive()
//   const [appIsActive, setActive] = useState(AppState.currentState === 'active')

//   useEffect(() => {
//     const _handleAppStateChange = (nextAppState) => {
//       //console.log(`_handleAppStateChange ${nextAppState}`)
//       const newActive = (nextAppState === 'active')
//       //console.log(`newActive ${newActive}`)
//       //console.log(`active ${active17}`)
// //      if (newActive != active) {
//         //console.log(`AppIsActive set to ${newActive}`)
//         setActive(newActive)
// //      }
//       //console.log(`after`)
//     }

//     //console.log(`subscribe`)
//     AppState.addEventListener('change', _handleAppStateChange)

//     return () => {
//       //console.log(`unsubscribe`)
//       AppState.removeEventListener('change', _handleAppStateChange)
//     }
//   }, [] )


  const [loading, setLoading] = useState(true) // spinner on only first screen open
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
      console.log(`before fetch ${savedCountRequest.current}`)
      //const result = await fetch(URL)
      const result = await fetchLimit(URL, 1500 )
      console.log(`after fetch ${savedCountRequest.current}`)
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

      console.log('setData(newData)')
      setData(newData)
      if (loading) {
        console.log('setLoading(false)')
        setLoading(false)
      }
      if (error) {
        console.log('setError(null)')
        setError(null)
      }
    } catch (err) {
      //console.log(`catch error fetch ${savedCountRequest.current}`)
      console.log(err)

      setLoading(false)
      setError(err)
    }
  }

  useEffect(() => {
    if (isOn && appIsActive) {
      console.log('FOCUS On, set Loading=true')
      //spinner on every return
      //  --:show old data before spiner
      setLoading(true) 
      savedCountRequest.current = 0
      // setData(null)

      fnRequest()
      let id = setInterval(fnRequest, delay)
      return () => clearInterval(id)
    }else{
      console.log('FOCUS oFF, setData=null')
      setData(null)
    }
  }, [isOn, appIsActive, delay])

  // let oDebug = {
  //   countRequest: savedCountRequest.current,
  // }
  console.log('return from hook')
  return [
    loading,
    data,
    error,

    //oDebug,
    null,
  ]
}

export default useRepeatRequestWhenActive


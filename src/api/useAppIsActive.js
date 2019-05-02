import { useState, useEffect } from 'react'
import { AppState } from 'react-native'

function useAppIsActive() {
  const [active17, setActive] = useState(AppState.currentState === 'active')

  useEffect(() => {
    const _handleAppStateChange = (nextAppState) => {
      console.log(`_handleAppStateChange ${nextAppState}`)
      const newActive = (nextAppState === 'active')
      //console.log(`newActive ${newActive}`)
      //console.log(`active ${active17}`)
//      if (newActive != active) {
        //console.log(`AppIsActive set to ${newActive}`)
        setActive(newActive)
//      }
      //console.log(`after`)
    }

    //console.log(`subscribe`)
    AppState.addEventListener('change', _handleAppStateChange)

    return () => {
      //console.log(`unsubscribe`)
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [] )

  return active17
}

export default useAppIsActive
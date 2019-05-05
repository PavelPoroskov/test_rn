import { useState, useEffect, useCallback } from 'react'
import { AppState } from 'react-native'

function useAppIsActive() {
  const [active, setActive] = useState(AppState.currentState === 'active')

  const _handleAppStateChange = useCallback( nextAppState => {
    //console.log(`_handleAppStateChange ${nextAppState}`)
    const newActive = nextAppState === 'active'
    //      if (newActive != active) {
    //console.log(`AppIsActive set to ${newActive}`)
    setActive(newActive)
    //      }
  }, [] )

  useEffect(() => {

    //console.log(`subscribe`)
    AppState.addEventListener('change', _handleAppStateChange)

    return () => {
      //console.log(`unsubscribe`)
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [_handleAppStateChange])

  return active
}

export default useAppIsActive

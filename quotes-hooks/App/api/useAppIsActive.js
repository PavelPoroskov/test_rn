import { useState, useEffect } from 'react'
import { AppState } from 'react-native'

function useAppIsActive() {
  const [active, setActive] = useState(AppState.currentState === 'active')

  useEffect(() => {

    const _handleAppStateChange = nextAppState => {
      //console.log(`_handleAppStateChange ${nextAppState}`)
      const newActive = nextAppState === 'active'
      //      if (newActive != active) {
      //console.log(`AppIsActive set to ${newActive}`)
      setActive(newActive)
      //      }
    }

    //console.log(`subscribe`)
    AppState.addEventListener('change', _handleAppStateChange)

    return () => {
      //console.log(`unsubscribe`)
      AppState.removeEventListener('change', _handleAppStateChange)
    }
  }, [] )

  return active
}

export default useAppIsActive

import React, {useContext} from 'react'

const AppContext = React.createContext({
  appIsActive: true,
});

const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}
const useAppIsActive = () => {
  const context = useContext(AppContext)
  return context.appIsActive
}
export {
  AppContext,
  useAppContext,
  useAppIsActive
}
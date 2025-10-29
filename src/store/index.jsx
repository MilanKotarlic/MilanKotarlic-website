import React, { createContext, useReducer, useContext } from 'react'
import { reducer } from './reducer'
import { defaultState } from './defaultState'
import { setLanguage, setSiteData, setLoading, setError } from './actions'
import { actionTypes } from './actionTypes'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export { actionTypes, setLanguage, setSiteData, setLoading, setError }
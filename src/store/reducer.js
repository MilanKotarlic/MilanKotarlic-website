import { actionTypes } from './actionTypes'
import { defaultState } from './defaultState'

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      }
    case actionTypes.SET_SITE_DATA:
      return {
        ...state,
        siteData: action.payload
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
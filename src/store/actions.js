import { actionTypes } from './actionTypes'

export const setLanguage = (language) => ({
  type: actionTypes.SET_LANGUAGE,
  payload: language
})

export const setSiteData = (data) => ({
  type: actionTypes.SET_SITE_DATA,
  payload: data
})

export const setLoading = (loading) => ({
  type: actionTypes.SET_LOADING,
  payload: loading
})

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error
})
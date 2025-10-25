export const actionTypes = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_SITE_DATA: 'SET_SITE_DATA', 
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
}

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
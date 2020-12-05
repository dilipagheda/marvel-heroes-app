import {useEffect, useState, useContext, useCallback} from 'react'
import {Context} from '../Store'
import Apis from '../Apis'
import _ from 'lodash'

const useFetchData = () => {
  const [state, dispatch] = useContext(Context);
  const [showLoader, setShowLoader] = useState(false)
  const [redirectToError, setRedirectToError] = useState(false)

  const reset = useCallback(() => {
    console.log('reset..')
    dispatch({type:'RESET_CHARACTERS'})
  },[dispatch])

  const cancelSearch = () => {
    reset()
    dispatch({type:'SET_SEARCH_PHRASE', payload:""})
  }

  const fetchData = async (pageNumber, searchPhrase)=> {
    try{
      setShowLoader(true)
      dispatch({type:'SET_SEARCH_PHRASE', payload:searchPhrase})
      const response = await Apis.listCharacters(pageNumber, searchPhrase)
      dispatch({type:'SET_CHARACTERS', payload:{ ...response, pageNumber}})
      setShowLoader(false)
      console.log(state)
    }catch(error)
    {
      console.log(error)
      setRedirectToError(true)
    }
  }

  const fetchNext = () => {
    fetchData(state.currentPageNumber + 1, state.searchPhrase)
  }

  const debouncedFetchData = useCallback(_.debounce(fetchData, 1000, {leading: false,  trailing: true}), [])
  useEffect(() => {
    if(state.searchPhrase.length === 0 && state.results.length === 0)
    {
      fetchData(0, state.searchPhrase)
    }
  },[state.searchPhrase, state.results.length])  

  return [fetchNext, debouncedFetchData, cancelSearch, showLoader, redirectToError]

}

export default useFetchData
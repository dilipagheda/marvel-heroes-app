import React, {useEffect, useState, useContext, useCallback} from 'react'
import {Redirect} from 'react-router-dom'
import SearchBar from "material-ui-search-bar"
import CharactersList from  './CharactersList'
import Apis from '../Apis'
import {Context} from '../Store'
import LoadMoreButton from './LoadMoreButton'
import CircularProgress from '@material-ui/core/CircularProgress';

import '../styles/Characters.scss'

function Characters() {
  const [fireCall, setFireCall] = useState(false)
  const [searchDirty, setSearchDirty] = useState(false)
  const [state, dispatch] = useContext(Context);
  const [redirectToError, setRedirectToError] = useState(false)

  const reset = useCallback(() => {
    dispatch({type:'SET_CHARACTERS', payload:[]})
    dispatch({type:'SET_CURRENT_TOTAL', payload:0})
    dispatch({type:'SET_OVERALL_TOTAL', payload: 0})    
    dispatch({type:'SET_PAGE_NUMBER', payload:0})
  },[dispatch])

  useEffect(()=>{
    if(state.results.length === 0)
    {
      setFireCall(true)
    }
  },[state.results.length])

  useEffect(() => {
    if(state.searchPhrase.length > 0 && searchDirty)
    {
      const id = setTimeout(()=>{
        reset()
        setFireCall(true)
      },1000)
      return () => {
        clearTimeout(id)
      }
    }
  }, [state.searchPhrase, searchDirty, reset])

  useEffect(() => {
    if(fireCall)
    {
      const fetchData = async ()=> {
        try{
          const response = await Apis.listCharacters(state.pageNumber,state.searchPhrase)
          dispatch({type:'SET_CHARACTERS', payload:response.results})
          dispatch({type:'SET_CURRENT_TOTAL', payload:response.offset + response.count})
          dispatch({type:'SET_OVERALL_TOTAL', payload: response.total})
          setFireCall(false)
          setSearchDirty(false)
        }catch(error)
        {
          console.log(error)
          setRedirectToError(true)
        }
      }
      fetchData()
    }
  },[fireCall, state.pageNumber, state.searchPhrase, dispatch])  

  const onClickLoadMoreHandler = (event) => {
    dispatch({type:'SET_PAGE_NUMBER', payload: state.pageNumber + 1})
    setFireCall(true)
  }

  const renderCharactersList = () => {
    if(fireCall)
    {
      return (
        <div className="progress-indicator">
          <CircularProgress color="inherit" size={40}/>
        </div>
      )
    }else
    {
        return (
          <div className="characters-container">
            <CharactersList results={state.results}/>
            <LoadMoreButton onClickLoadMoreHandler={onClickLoadMoreHandler} noMoreRecords={state.currentTotal >= state.overallTotal}/>
          </div>
        )
      }
    }

  const onCancelSearchHandler = () => {
    reset()
    dispatch({type:'SET_SEARCH_PHRASE', payload:""})
    setFireCall(true)
  }

  const onChangeHandler = (newValue) => {
    dispatch({type:'SET_SEARCH_PHRASE', payload:newValue})
    setSearchDirty(true)
  }

  return (
    redirectToError ? 
    <Redirect to="/error" />
    : <div className="characters-container">
      <div className="search-bar-container">
        <SearchBar
          className="search-bar"
          value={state.searchPhrase}
          onChange={onChangeHandler}
          onRequestSearch={() => setFireCall(true)}
          onCancelSearch={onCancelSearchHandler}
        />
      </div>
      {renderCharactersList()}
    </div>
  );
}

export default Characters;

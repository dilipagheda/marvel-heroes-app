import React, {useEffect, useState, useContext} from 'react'
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

  const reset = () => {
    dispatch({type:'SET_CHARACTERS', payload:[]})
    dispatch({type:'SET_CURRENT_TOTAL', payload:0})
    dispatch({type:'SET_OVERALL_TOTAL', payload: 0})    
    dispatch({type:'SET_PAGE_NUMBER', payload:0})
  }

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
  }, [state.searchPhrase, searchDirty])

  useEffect(() => {
    if(fireCall)
    {
      const fetchData = async ()=> {
        const response = await Apis.listCharacters(state.pageNumber,state.searchPhrase)
        dispatch({type:'SET_CHARACTERS', payload:response.results})
        dispatch({type:'SET_CURRENT_TOTAL', payload:response.offset + response.count})
        dispatch({type:'SET_OVERALL_TOTAL', payload: response.total})
        setFireCall(false)
        setSearchDirty(false)
      }
      fetchData()
    }
  },[fireCall])  

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
          <>
          <CharactersList results={state.results}/>
          <LoadMoreButton onClickLoadMoreHandler={onClickLoadMoreHandler} noMoreRecords={state.currentTotal >= state.overallTotal}/>
        </>
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
    <div className="characters-container">
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

import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import SearchBar from "material-ui-search-bar"
import CharactersList from  './CharactersList'
import LoadMoreButton from './LoadMoreButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetchData from '../hooks/useFetchData'
import {Context} from '../Store'

import '../styles/Characters.scss'

function Characters() {
  const [state] = useContext(Context);
  const [fetchNext, debouncedFetchData, cancelSearch, showLoader, redirectToError] = useFetchData()

  const onClickLoadMoreHandler = (event) => {
    fetchNext()
  }

  const onCancelSearchHandler = () => {
    cancelSearch()
  }

  const onChangeHandler = (newValue) => {
    debouncedFetchData(0,newValue, true)
  }

  const renderCharactersList = () => {
    if(showLoader && state.results.length === 0)
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
            <LoadMoreButton onClickLoadMoreHandler={onClickLoadMoreHandler} noMoreRecords={state.currentTotal >= state.overallTotal} loader={showLoader}/>
          </div>
        )
      }
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
          // onRequestSearch={() => setFireCall(true)}
          onCancelSearch={onCancelSearchHandler}
        />
        {(showLoader && state.results.length > 0) && 
            <div className="small-progress-indicator">
              <CircularProgress color="inherit" size={20}/>
            </div>
        }
      </div>
      {renderCharactersList()}
    </div>
  );
}

export default Characters;

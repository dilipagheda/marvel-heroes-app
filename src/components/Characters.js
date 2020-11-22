import React, {useEffect, useState} from 'react'
import SearchBar from "material-ui-search-bar"
import CharactersList from  './CharactersList'
import Apis from '../Apis'
import LoadMoreButton from './LoadMoreButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/Characters.scss'

function Characters() {
  const [searchPhrase, setSearchPhrase] = useState("")
  const [fireCall, setFireCall] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [results, setResults] = useState([])
  const [currentTotal, setCurrentTotal] = useState(0)
  const [overallTotal, setOverallTotal] = useState(0)

  const reset = () => {
    setCurrentTotal(0)
    setOverallTotal(0)
    setPageNumber(0)
    setResults([])
  }

  useEffect(() => {
    if(searchPhrase.length === 0)
    {
      reset()
      setFireCall(true)
    }else{
      const id = setTimeout(()=>{
        reset()
        setFireCall(true)
      },1000)
      return () => {
        clearTimeout(id)
      }
    }
  }, [searchPhrase])

  useEffect(() => {
    if(fireCall)
    {
      const fetchData = async ()=> {
        const response = await Apis.listCharacters(pageNumber,searchPhrase)
        setResults(response.results)
        setCurrentTotal(response.offset + response.count)
        setOverallTotal(response.total)
        setFireCall(false)
      }
      fetchData()
    }
  },[fireCall])  

  const onClickLoadMoreHandler = (event) => {
    setPageNumber(pageNumber + 1)
    setFireCall(true)
  }

  const renderCharactersList = () => {
    if(fireCall)
    {
      return (
        <div className="progress-indicator">
          <CircularProgress color="inherit" size={40} color="purple"/>
        </div>
      )
    }else
    {
        return (
          <>
          <CharactersList results={results}/>
          <LoadMoreButton onClickLoadMoreHandler={onClickLoadMoreHandler} noMoreRecords={currentTotal >= overallTotal}/>
        </>
        )
      }
    }

  return (
    <div className="characters-container">
      <div className="search-bar-container">
        <SearchBar
          className="search-bar"
          value={searchPhrase}
          onChange={(newValue) => setSearchPhrase(newValue)}
          onRequestSearch={() => setSearchPhrase(searchPhrase)}
          onCancelSearch={() => setSearchPhrase("")}
        />
      </div>
      {renderCharactersList()}
    </div>
  );
}

export default Characters;

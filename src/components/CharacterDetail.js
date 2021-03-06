import React from 'react'
import { useParams,useLocation  } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import ComicsList from  './ComicsList'
import CharacterFactsChart from './CharacterFactsChart'
import BackButton from './BackButton'
import '../styles/CharacterDetail.scss'

function CharacterDetail() {
  let { id } = useParams()
  let location = useLocation();
  const info = location.state.info

  return (
    <div className="top-container">
      <BackButton />
      <Paper className="character-detail-container" elevation={3}>
        <div className="image">
          <img src={`${info.thumbnail.path}.${info.thumbnail.extension}`} alt={`image of ${info.name}`} height="600" />
        </div>
        <div className="details">
          <div className="greeting">Hey! I am</div>
          <h1 className="name">{info.name}</h1>
          <p className="description">{info.description}</p>
        </div>
      </Paper>
      <CharacterFactsChart 
        totalComics={info.comics.available} 
        totalStories={info.stories.available} 
        totalSeries={info.series.available} 
        totalEvents={info.events.available} 
      />
      <div className="comics-details-container">
        <h2 className="header">Are you wondering which comics I have appeared in?</h2>
        <ComicsList comicsInfo={info.comics.items} characterId={id}/>
      </div>
    </div>
  );
}

export default CharacterDetail;
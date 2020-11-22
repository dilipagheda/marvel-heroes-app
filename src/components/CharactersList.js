import React from 'react'
import Grid from '@material-ui/core/Grid';
import CharacterListItem from './CharactersListItem'
import '../styles/CharactersList.scss'

function CharactersList(props) {
  const {results} = props
  const renderCharacters = (characters) => {
    return characters.map(character => {
      return (
        <Grid item xs={12} sm={6} md={6} lg={4} className="character-card-container">
          <CharacterListItem info={character}/>
        </Grid>
      )
    })
  }

  return (
    <Grid container spacing={2} direction="row" justify="center" alignItems="center" className="characters-list-container">
      {renderCharacters(results)}
    </Grid>
  );
}

export default CharactersList;

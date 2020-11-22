import React from 'react'
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/CharacterListItem.scss'

function CharactersListItem(props) {
  const history = useHistory();

  const {info} = props
  const onClickHandler = (event) => {
    history.push(
      { pathname: `/detail/${info.id}`, state: {info: info} }
    )
  }

  return (
    <Card className="character-card">
        <CardMedia
          className="card-media"
          image={`${info.thumbnail.path}.${info.thumbnail.extension}`}
          title={info.name}
        />
        <CardContent className="card-content-container">
          <Typography gutterBottom variant="h5" component="h2" className="character-name">
            {info.name}
          </Typography>
        </CardContent>
        <CardActions className="card-actions-container">
        <Button size="small" color="primary" onClick={onClickHandler}>
          Learn More
        </Button>
      </CardActions>        
    </Card>
  );
}

export default CharactersListItem;

import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Api from '../Apis/index'
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/CharacterDetail.scss'
import ServerError from './ServerError';

function ComicListItem(props) {
  const {info} = props
  const [expanded, setExpanded] = useState(false)
  const [description, setDescription] = useState(null)
  const [showLoader, setShowLoader] = useState(false)
  const [redirectToError, setRedirectToError] = useState(false)

  const onChangeHandler = (event, expanded) => {
    setExpanded(expanded)
  }

  useEffect(() => {
    const fetchComicDetails = async () => {
      if(expanded && !description)
      {
        try{
          setShowLoader(true)
          const comicDetailsResponse = await Api.getComicDetails(info.resourceURI)
          setShowLoader(false)
          let description = comicDetailsResponse.results[0].description
          if(!description)
          {
            description = "Sorry! no description is available"
          }
          setDescription(description)
        }catch(error)
        {
          console.log(error)
          setRedirectToError(true)
        }
      }
    }
    fetchComicDetails()
  }, [expanded, info.resourceURI, description])

  return (
          redirectToError? 
          <Redirect to="/error" />
          :<Accordion onChange={onChangeHandler} expanded={expanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="">{info.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {showLoader? <CircularProgress /> : description }
              </Typography>
            </AccordionDetails>
          </Accordion>
  );
}

export default ComicListItem;
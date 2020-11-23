import React from 'react'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import '../styles/BackButton.scss'

const BackButton = (props) => {
  const history = useHistory();

  const onClickHandler = (event) => {
    history.push('/')
  }

  return (
    <Button className="back-button" size="medium" color="primary" onClick={onClickHandler}>
      <ArrowBackIosIcon />Home
    </Button>
  )
}

export default BackButton

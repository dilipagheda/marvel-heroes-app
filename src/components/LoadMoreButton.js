import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import '../styles/LoadMoreButton.scss'

function LoadMoreButton(props) {
  const {onClickLoadMoreHandler, noMoreRecords} = props

  return (
    noMoreRecords ? 
     <Paper className="no-more-records">No more records!</Paper>
    :<div className="load-more-container">
        <Button variant="contained" color="primary" onClick={onClickLoadMoreHandler}>
          Load More
        </Button>
      </div>
  );
}

export default LoadMoreButton;

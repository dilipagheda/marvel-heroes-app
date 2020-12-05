import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/LoadMoreButton.scss'

function LoadMoreButton(props) {
  const {onClickLoadMoreHandler, noMoreRecords, loader} = props
  return (
    noMoreRecords ? 
     <Paper className="no-more-records">No more records!</Paper>
    : <div className="load-more-container">
        <Button variant="contained" color="primary" onClick={onClickLoadMoreHandler} disabled={loader? true: false}>
          {loader ? <span><CircularProgress color="inherit" size={12}/></span> 
          : <span>Load More</span>
          }
        </Button>
      </div>
  );
}

export default LoadMoreButton;

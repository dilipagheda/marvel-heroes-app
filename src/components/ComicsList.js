import React from 'react'
import ComicListItem from './ComicListItem'

function ComicsList(props) {
  const {comicsInfo} = props
  const renderComicItems = (comics) => {
    if(!comics || comics.length === 0)
    {
      return (
        <div>
          Sorry! I did not appear in any comics!
        </div>
      )
    }
    return comics.map(comic => {
      return (
        <ComicListItem info={comic} />
      )
    })
  }
  return (
        <div>
          {renderComicItems(comicsInfo)}
        </div>
  );
}

export default ComicsList;
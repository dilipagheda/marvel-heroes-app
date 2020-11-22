import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Bar } from 'react-chartjs-2';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import '../styles/CharacterFactsChart.scss'

function CharacterFactsChart(props) {

  const {totalComics, totalSeries, totalStories, totalEvents} = props

  return (
      <Paper className="chart-container-outer" elevation={3}>
        <div className="facts">
          <h2 className="header">Did you know some interesting facts about me?</h2>
          <div className="subheader-container">
            <span className="subheader">I have appeared in</span>
          </div>
          <List>
            <ListItem button>
              <div className="fact-item"><span className='total-number'>{totalComics}</span> Comics</div>
            </ListItem>
            <Divider />
            <ListItem button divider>
              <div className="fact-item"><span className='total-number'>{totalSeries}</span> Series</div>
            </ListItem>
            <ListItem button>
              <div className="fact-item"><span className='total-number'>{totalStories}</span> Stories</div>
            </ListItem>
            <Divider light />
            <ListItem button>
              <div className="fact-item"><span className='total-number'>{totalEvents}</span> Events</div>
            </ListItem>
          </List>
        </div>
        <div className="bar-chart" style={{width: '50%'}}>
          <Bar
            height={500}
            options={{ maintainAspectRatio: false }}        
            data={{
              labels: ['Comics', 'Series', 'Stories',
                      'Events'],
              datasets: [
                {
                  label:'Total Count',
                  backgroundColor: 'teal',
                  data: [totalComics, totalSeries, totalStories, totalEvents]
                }
              ]
            }}
        />
        </div>
      </Paper>
  );
}

export default CharacterFactsChart;
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import LunchList from './LunchList';
import LunchTodayList from './LunchTodayList';
import CustomMeal from './CustomMealForm';
import DialogLunchCollection from './DialogLunchCollection';

const RenderEmptyMessage = ({ message }) => (
  <Typography variant="caption">{message}</Typography>
);

const GridedOutContent = ({ classes, state, actions }) => {
  const {
    gridded: { gridContainerStyle, gridItemStyle, children }
  } = classes;
  const {
    history,
    customMeal,
    trending,
    fetching,
    todaysOptions,
    offset,
    first
  } = state;
  return (
    <Grid container className={gridContainerStyle} spacing={8}>
      {customMeal && (
        <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
          <CustomMeal classes={classes} state={state} actions={actions} />
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
        {!fetching ? (
          <LunchTodayList
            meals={todaysOptions}
            parentActions={actions}
            title="Todays' Meals"
            classes={classes}
          />
        ) : (
          <RenderEmptyMessage message="Fetching meal of the day, please wait..." />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
        {history && history.length !== 0 ? (
          <Paper className={children}>
            <LunchList
              meals={history}
              parentActions={actions}
              title={`My last ${history.length} meals`}
              type="history"
              classes={classes}
              page={offset}
              size={first}
            />
          </Paper>
        ) : (
          <RenderEmptyMessage message="You do not have any previous meals" />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
        <DialogLunchCollection
          classes={classes}
          state={state}
          actions={actions}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
        {trending && trending.length !== 0 ? (
          <Paper className={children}>
            <LunchList
              meals={trending}
              parentActions={actions}
              title={`Current top ${trending.length} trends`}
              type="trend"
              classes={classes}
            />
          </Paper>
        ) : (
          <RenderEmptyMessage message="Meal trend feed is not available" />
        )}
      </Grid>
    </Grid>
  );
};

export default GridedOutContent;

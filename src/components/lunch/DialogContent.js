import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import LunchList from './LunchList';
import LunchTodayList from './LunchTodayList';

import DialogSelection from './DialogSelection';

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
      <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
        <Fragment>
          {!fetching ? (
            <Paper className={children}>
              <LunchTodayList
                meals={todaysOptions}
                parentActions={actions}
                title="Todays' Meals"
                classes={classes}
              />
            </Paper>
          ) : (
            <RenderEmptyMessage message="Fetching meal of the day, please wait..." />
          )}
        </Fragment>
        <Fragment>
          {customMeal && (
            <Paper className={children}>
              <Typography variant="subtitle1">Custom Order:</Typography>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                multiline
                id="customMeal"
                label="Custom Meal Order"
                type="text"
                rowsMax={6}
                onChange={e => actions.selection('selection', e.target.value)}
              />
            </Paper>
          )}
          <DialogSelection classes={classes} state={state} />
        </Fragment>
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

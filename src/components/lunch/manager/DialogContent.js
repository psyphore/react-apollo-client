import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import MealForm from './MealForm';

const RenderEmptyMessage = ({ message }) => (
  <Typography variant="caption">{message}</Typography>
);

const GridedOutContent = ({ classes, state, actions }) => {
  const {
    gridded: { gridContainerStyle, gridItemStyle }
  } = classes;
  const {
    fetching,
    meal,
    options,
    defaultProviders,
    defaultCategories
  } = state;
  return (
    <Grid container className={gridContainerStyle} spacing={8}>
      <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
        <MealForm classes={classes} state={state} actions={actions} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
        {!fetching ? (
          JSON.stringify(meal)
        ) : (
          <RenderEmptyMessage message="Fetching meal options, please wait..." />
        )}
      </Grid>
    </Grid>
  );
};

export default GridedOutContent;

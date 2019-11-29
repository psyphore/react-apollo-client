import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import MealForm from './MealForm';
import DayMealOptionList from './DayMealOptionList';

const RenderEmptyMessage = ({ message }) => (
  <Typography variant="caption">{message}</Typography>
);

const GridedOutContent = ({ classes, state, actions }) => {
  const {
    gridded: { gridContainerStyle, gridItemStyle }
  } = classes;
  const { fetching, options } = state;
  return (
    <Grid container className={gridContainerStyle} spacing={8}>
      <Grid item xs={12} sm={12} md={4} className={gridItemStyle}>
        <MealForm classes={classes} state={state} actions={actions} />
      </Grid>
      <Grid item xs={12} sm={12} md={8} className={gridItemStyle}>
        {!fetching ? (
          <DayMealOptionList
            title="Available Meals"
            meals={options}
            classes={classes}
            actions={actions}
          />
        ) : (
          <RenderEmptyMessage message="Fetching meal options, please wait..." />
        )}
      </Grid>
    </Grid>
  );
};

export default GridedOutContent;

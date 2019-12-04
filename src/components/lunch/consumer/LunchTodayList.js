import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { GradeTwoTone } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { MealIconSwitcher } from '../common';

export default ({
  meals,
  parentActions: { selectMeal, customMeal },
  title,
  classes: { text, gridded }
}) => (
  <Paper className={gridded.children}>
    <div className={text}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
    </div>
    <List>
      {meals &&
        meals.map(meal => (
          <ListItem button key={meal.id} onClick={() => selectMeal(meal)}>
            <ListItemIcon>
              <MealIconSwitcher category={meal.category} />
            </ListItemIcon>
            <ListItemText
              primary={meal.name + ' by ' + meal.provider}
              secondary={meal.content}
            />
          </ListItem>
        ))}
      <ListItem button onClick={customMeal}>
        <ListItemIcon>
          <GradeTwoTone />
        </ListItemIcon>
        <ListItemText primary="Customize Meal" secondary="let's mix it up" />
      </ListItem>
    </List>
  </Paper>
);

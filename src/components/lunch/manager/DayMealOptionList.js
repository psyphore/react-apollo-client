import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { GradeSharp, GradeTwoTone } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

export default ({
  title,
  meals,
  action: { selectMeal },
  classes: { text, gridded }
}) => (
  <Paper className={gridded.children}>
    <div className={text}>
      <Typography variant="display3" gutterBottom>
        {title}
      </Typography>
    </div>
    <List>
      {meals &&
        meals.map((meal, index) => (
          <ListItem button key={index} onClick={() => selectMeal(meal)}>
            <ListItemIcon>
              <GradeSharp />
            </ListItemIcon>
            <ListItemText
              primary={meal.name}
              secondary={meal.category + ' by ' + meal.provider}
            />
          </ListItem>
        ))}
    </List>
  </Paper>
);

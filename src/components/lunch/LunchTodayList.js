import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { GradeSharp, GradeTwoTone } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

export default props => {
  const { meals, parentActions, title } = props;
  return (
    <div>
      <Typography variant="title" gutterBottom>{title}</Typography>
      <List>
        {meals &&
          meals.map((meal, index) => (
            <ListItem
              button
              key={index}
              onClick={() => parentActions.selectMeal(meal)}
            >
              <ListItemIcon>
                <GradeSharp />
              </ListItemIcon>
              <ListItemText
                primary={meal.name}
                secondary={meal.type.replace(/_+/g, ' ')}
              />
            </ListItem>
          ))}
        <ListItem button onClick={parentActions.customMeal}>
          <ListItemIcon>
            <GradeTwoTone />
          </ListItemIcon>
          <ListItemText primary="Custom Meal Order" secondary="mix it up" />
        </ListItem>
      </List>
    </div>
  );
};

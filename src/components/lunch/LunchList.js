import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Grade } from '@material-ui/icons';

export default props => {
  const { meals, parentActions, extra } = props;
  return (
    <div>
      <List>
        {meals &&
          meals.map((meal) => (
            <ListItem
              button
              key={meal.id}
              onClick={() => parentActions.selectMeal(meal)}
            >
              <ListItemIcon>
                <Grade />
              </ListItemIcon>
              <ListItemText primary={meal.content} secondary={meal.date} />
            </ListItem>
          ))}
        {extra}
      </List>
    </div>
  );
};

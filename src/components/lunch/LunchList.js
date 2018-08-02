import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { HistorySharp } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

export default props => {
  const { meals, parentActions, title } = props;
  return (
    <div>
      <Typography variant="headline">{title}</Typography>
      <List>
        {meals &&
          meals.map(meal => (
            <ListItem
              button
              key={meal.id}
              onClick={() => parentActions.selectMeal({name: meal.content})}
            >
              <ListItemIcon>
                <HistorySharp />
              </ListItemIcon>
              <ListItemText primary={meal.content} secondary={meal.date} />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

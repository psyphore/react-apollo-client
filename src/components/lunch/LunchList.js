import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { HistorySharp, TrendingUpSharp } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

export default props => {
  const { meals, parentActions, title, type } = props;
  return (
    <div>
      <Typography variant="title" gutterBottom>{title}</Typography>
      <List>
        {meals &&
          meals.map(meal => (
            <ListItem
              button
              key={meal.id}
              onClick={() => parentActions.selectMeal({ name: meal.content })}
            >
              <ListItemIcon>
                {type === 'trend' ? <TrendingUpSharp /> : <HistorySharp />}
              </ListItemIcon>
              <ListItemText primary={meal.content} secondary={meal.date} />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

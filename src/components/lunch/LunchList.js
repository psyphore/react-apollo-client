import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { HistorySharp, TrendingUpSharp } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
// import Moment from 'react-moment';
// <Moment format="DD MMM YYYY">{date}</Moment>

export default ({ meals, parentActions: { selectMeal }, title, type }) => {
  return (
    <Fragment>
      <Typography variant="title" gutterBottom>
        {title}
      </Typography>
      <List>
        {meals &&
          meals.map(({ id, content, date }) => (
            <ListItem
              button
              onClick={() => selectMeal({ name: content })}
              key={id}
            >
              <ListItemIcon>
                {type === 'trend' ? <TrendingUpSharp /> : <HistorySharp />}
              </ListItemIcon>
              <ListItemText primary={content} secondary={date} />
            </ListItem>
          ))}
      </List>
    </Fragment>
  );
};

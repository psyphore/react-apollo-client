import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { HistorySharp, TrendingUpSharp } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { SkipPrevious, SkipNext } from '@material-ui/icons';

export default ({
  meals,
  parentActions: { selectMeal, nextHistory, prevHistory },
  title,
  type,
  page,
  size,
  classes: { text }
}) => {
  return (
    <Fragment>
      <div className={text}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Fragment>
            <Button onClick={() => prevHistory()}>
              <SkipPrevious color="action" />
            </Button>
            <p>{page}</p>
            <Button onClick={() => nextHistory()}>
              <SkipNext color="action" />
            </Button>
          </Fragment>
        </div>
      </div>
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

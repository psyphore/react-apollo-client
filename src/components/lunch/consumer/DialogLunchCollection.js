import React, { Fragment } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import Grid from '@material-ui/core/Grid';

import { MealIconSwitcher } from '../common';

import Tooltip from '../../tooltip';

const EmptyCollection = ({ lunch, text }) => (
  <Fragment>
    {!lunch && (
      <div className={text}>
        <Typography variant="display4" gutterBottom>
          Lunch Order Empty!
        </Typography>
      </div>
    )}
  </Fragment>
);

const LunchCollection = ({ lunch, children, clearMeal, text, removeItem }) => (
  <Fragment>
    {lunch && (
      <Paper className={children}>
        <Grid container spacing={8}>
          <Grid item xs={2} sm={2} md={2}>
            <Tooltip title="Clear Current Meal Selection" placement="top">
              <Fab aria-label="clear" color="secondary" onClick={clearMeal}>
                <DeleteForeverOutlined color="action" />
              </Fab>
            </Tooltip>
          </Grid>
          <Grid item xs={10} sm={10} md={10}>
            <div className={text}>
              <Typography variant="h6" gutterBottom>
                Current Selection
              </Typography>
            </div>
          </Grid>
        </Grid>
        <List>
          {lunch &&
            lunch.map((item, ix) => (
              <ListItem key={ix}>
                <MealIconSwitcher category={item.category} />
                <ListItemText
                  primary={item.provider + ': ' + item.name}
                  secondary={item.content}
                />
                <p>{item.quantity}</p>
                <Fab
                  aria-label="clear"
                  color="primary"
                  onClick={() => removeItem(item)}
                >
                  <DeleteForeverOutlined color="action" />
                </Fab>
              </ListItem>
            ))}
        </List>
      </Paper>
    )}
  </Fragment>
);

const DialogLunchCollection = ({
  classes: {
    text,
    gridded: { children }
  },
  state: { lunch },
  actions: { clearLunch, updateLunch }
}) => (
  <Fragment>
    <LunchCollection
      lunch={lunch}
      text={text}
      children={children}
      clearMeal={clearLunch}
      removeItem={updateLunch}
    />
    <EmptyCollection lunch={lunch} text={text} />
  </Fragment>
);

export default DialogLunchCollection;

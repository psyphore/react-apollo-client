import React, { Fragment } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import Grid from '@material-ui/core/Grid';

import Tooltip from '../tooltip';

const DialogSelection = ({
  classes: {
    text,
    gridded: { children }
  },
  state: { selection },
  actions: { clearMeal }
}) => (
  <Fragment>
    {selection && selection.name && (
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
          <ListItem>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText
              primary={selection.name}
              secondary={selection.type + ' by ' + selection.provider}
            />
          </ListItem>
        </List>
      </Paper>
    )}
  </Fragment>
);

export default DialogSelection;

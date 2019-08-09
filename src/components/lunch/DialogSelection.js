import React, { Fragment } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import Check from '@material-ui/icons/Check';

const DialogSelection = ({ classes: { children }, state: { selection } }) => (
  <Fragment>
    {selection && (
      <Paper className={children}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText
              primary={selection.name}
              secondary="Current Selection"
            />
          </ListItem>
        </List>
      </Paper>
    )}
  </Fragment>
);

export default DialogSelection;

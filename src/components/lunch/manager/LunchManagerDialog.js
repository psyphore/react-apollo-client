import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';

import { lunchDialogStyle } from '../../../assets/jss';

import SlideUp from '../../transitions/SlideUp';
import { Loader } from '../..';
import { SharedLunchManagerConsumer } from '../../../HOC';

import DialogToolBar from './DialogToolbar';
import DialogActions from './DialogActions';
import DialogContent from './DialogContent';

const FullScreenLunchManagerDialog = ({ classes }) => (
  <SharedLunchManagerConsumer>
    {({ state, actions }) => (
      <Dialog
        fullScreen
        onClose={actions.close}
        open={state.open}
        TransitionComponent={SlideUp}
      >
        <AppBar className={classes.appBar}>
          <DialogToolBar actions={actions} classes={classes} state={state} />
        </AppBar>
        <div className={classes.container}>
          {state.fetching && <Loader />}
          <div className={classes.header}>
            <DialogActions actions={actions} state={state} />
          </div>
          <div className={classes.content}>
            <DialogContent actions={actions} classes={classes} state={state} />
          </div>
          <div className={classes.footer} />
        </div>
      </Dialog>
    )}
  </SharedLunchManagerConsumer>
);

FullScreenLunchManagerDialog.propTypes = {
  classes: object.isRequired
};

export default withStyles(lunchDialogStyle)(FullScreenLunchManagerDialog);

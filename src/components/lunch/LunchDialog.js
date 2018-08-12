import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Before from '@material-ui/icons/NavigateBefore';
import Next from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';

import SlideUp from '../transitions/SlideUp';
import { Loader } from '../';
import LunchList from './LunchList';
import LunchTodayList from './LunchTodayList';
import LunchContext from '../../HOC/lunchContext';
import ToolTip from '../tooltip';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  container: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto 1fr',
    width: '100vw',
    maxWidth: '95vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' }
  },
  header: {
    gridRow: '-1 / 0'
  },
  content: {
    gridRow: '2 / 3',
    margin: '1%'
  },
  footer: {
    gridRow: '3 / 3',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  contentContainer: {
    display: 'grid',
    gridGap: '2.5px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    alignItems: 'center',
    width: '100vw',
    maxWidth: '95vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' },
    justifyItems: 'center'
  },
  contentOptions: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap'
  },
  contentOption: {
    maxWidth: '95vw',
    width: '100vw'
  }
});

const DialogToolBar = ({
  actions: { close, placeOrder },
  classes: { flex },
  state: { today }
}) => (
  <Toolbar>
    <IconButton color="inherit" aria-label="Close" onClick={close}>
      <CloseIcon />
    </IconButton>
    <Typography variant="title" color="inherit" className={flex}>
      {`${
        today ? today.format('DD MMMM YYYY') + ' -' : ''
      } Place Your Lunch Order`}
    </Typography>
    <Button
      aria-label="Lunch"
      color="primary"
      onClick={placeOrder}
      variant="fab"
    >
      <AddIcon />
    </Button>
  </Toolbar>
);

const DialogActions = ({ actions: { nextDay, prevDay }, state: { today } }) => (
  <Paper>
    <Grid container spacing={8} wrap="wrap" justify="space-evenly">
      <Grid item md={12} xs={12}>
        <Grid item md={3}>
          <ToolTip placement="top" title="Previous Day">
            <Button
              aria-label="PreviousDay"
              color="primary"
              onClick={() => prevDay()}
              variant="fab"
            >
              <Before />
            </Button>
          </ToolTip>
        </Grid>
        <Grid item md={3}>
          <Typography variant="subheading" component="h3">
            {today ? today.format('DD MMMM YYYY') : '?'}
          </Typography>
        </Grid>
        <Grid item md={3}>
          <ToolTip placement="top" title="Next Day">
            <Button
              aria-label="NextDay"
              color="primary"
              onClick={() => nextDay()}
              variant="fab"
            >
              <Next />
            </Button>
          </ToolTip>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);

const DialogSelection = ({ classes, state }) => (
  <Fragment>
    {state.selection ? (
      <Paper className={classes.contentOption}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText
              primary={state.selection}
              secondary="Current Selection"
            />
          </ListItem>
        </List>
      </Paper>
    ) : null}
  </Fragment>
);

const DialogContent = ({ classes, state, actions }) => {
  const { history, customMeal, trending, fetching, todaysOptions } = state;
  return (
    <div className={classes.contentContainer}>
      <Fragment>
        {!fetching ? (
          <Paper className={classes.contentOption}>
            <LunchTodayList
              meals={todaysOptions}
              parentActions={actions}
              title="Todays' Meals"
            />
          </Paper>
        ) : null}
      </Fragment>
      <Fragment>
        {customMeal ? (
          <Paper className={classes.contentOption}>
            <Typography variant="subheading">Custom Order:</Typography>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              multiline
              id="customMeal"
              label="Custom Meal Order"
              type="text"
              rowsMax={6}
              onChange={e => actions.selection('selection', e.target.value)}
            />
          </Paper>
        ) : null}
        <DialogSelection classes={classes} state={state} />
      </Fragment>
      <Fragment>
        {history && history.length !== 0 ? (
          <Paper className={classes.contentOption}>
            <LunchList
              meals={history}
              parentActions={actions}
              title={`My last ${history.length} meals`}
              type="history"
            />
          </Paper>
        ) : null}
      </Fragment>
      <Fragment>
        {trending && trending.length !== 0 ? (
          <Paper className={classes.contentOption}>
            <LunchList
              meals={trending}
              parentActions={actions}
              title={`Todays' top ${trending.length} trends`}
              type="trend"
            />
          </Paper>
        ) : null}
      </Fragment>
    </div>
  );
};

const FullScreenDialog = ({ classes }) => (
  <Fragment>
    <LunchContext.Consumer>
      {({ state, actions, person }) => (
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
            {state.fetching ? <Loader /> : null}
            <div className={classes.header}>
              <DialogActions actions={actions} state={state} />
            </div>
            <div className={classes.content}>
              <DialogContent
                actions={actions}
                classes={classes}
                person={person}
                state={state}
              />
            </div>
            <div className={classes.footer} />
          </div>
        </Dialog>
      )}
    </LunchContext.Consumer>
  </Fragment>
);

FullScreenDialog.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(FullScreenDialog);

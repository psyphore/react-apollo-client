import React from 'react';
import PropTypes from 'prop-types';
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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grade from '@material-ui/icons/Grade';
import AddIcon from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';

import SlideUp from '../transitions/SlideUp';
import { Loader } from '../';
import LunchList from './LunchList';

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
  }
});

function FullScreenDialog(props) {
  const { classes, parentState, parentActions } = props;

  if (!parentActions && !parentState) return <div />;

  return (
    <div>
      <Dialog
        fullScreen
        open={parentState.open}
        onClose={parentActions.close}
        TransitionComponent={SlideUp}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Close"
              onClick={parentActions.close}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              {`${
                parentState.today
                  ? parentState.today.format('DD MMMM YYYY') + ' -'
                  : ''
              } Place Your Lunch Order`}
            </Typography>
            <Button
              variant="fab"
              color="primary"
              aria-label="Lunch"
              onClick={parentActions.placeOrder}
            >
              <AddIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.container}>
          <div className={classes.header}>
            <Paper>
              <Typography variant="subheading">
                Actions: Paging to and from Google Sheets
              </Typography>
            </Paper>
          </div>
          <div className={classes.content}>
            <Grid container className={classes.root} spacing={8}>
              <Grid item md={12}>
                <Grid item md={5}>
                  <Paper />
                </Grid>
              </Grid>
              <Grid item md={12}>
                {parentState.fetching ? <Loader /> : null}
                <Grid item md={4}>
                  {!parentState.fetching ? (
                    <Paper>
                      <List>
                        {parentState.todaysOptions &&
                        parentState.todaysOptions.length !== 0
                          ? parentState.todaysOptions.map((meal, index) => (
                              <ListItem
                                button
                                key={index}
                                onClick={() => parentActions.selectMeal(meal)}
                              >
                                <ListItemIcon>
                                  <Grade />
                                </ListItemIcon>
                                <ListItemText
                                  primary={meal.name}
                                  secondary={meal.type.replace(/_+/g, ' ')}
                                />
                              </ListItem>
                            ))
                          : null}
                        <ListItem button onClick={parentActions.customMeal}>
                          <ListItemIcon>
                            <Grade />
                          </ListItemIcon>
                          <ListItemText
                            primary="Custom Meal Order"
                            secondary="mix it up"
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  ) : null}
                </Grid>
                <Grid item md={4}>
                  {parentState.customMeal ? (
                    <Paper className={classes.paper}>
                      <Typography variant="subheading">
                        Custom Order:
                      </Typography>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="customMeal"
                        label="Custom Meal Order"
                        type="text"
                        multiline
                        rowsMax={6}
                        fullWidth
                        onChange={e =>
                          parentActions.selection('selection', e.target.value)
                        }
                      />
                    </Paper>
                  ) : null}
                </Grid>
                <Grid item md={4}>
                  {parentState.selection ? (
                    <Paper className={classes.paper}>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Check />
                          </ListItemIcon>
                          <ListItemText
                            primary={parentState.selection}
                            secondary="Current Selection"
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  ) : null}
                </Grid>
                <Grid item md={4}>
                  <LunchList
                    meals={parentState.mealHistory.slice(0, 5)}
                    parentActions={parentActions}
                    title="last 5 meals"
                  />
                </Grid>
                <Grid item md={4}>
                  <LunchList
                    meals={parentState.mealHistory.slice(0, 5)}
                    parentActions={parentActions}
                    title="todays' trends"
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className={classes.footer}>
            <Paper>
              <Typography variant="subheading">
                Actions: Paging to and from Google Sheets
              </Typography>
            </Paper>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);

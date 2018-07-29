import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
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
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Grade from '@material-ui/icons/Grade';
import AddIcon from '@material-ui/icons/Add';
import { Check } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import * as moment from 'moment';

import { todaysMeals, placeOrder } from '../../graphql';
import { Loader } from '../common';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  flex1: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SnackAttack extends PureComponent {
  render() {
    const { message, open, onClose } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={6000}
          onClose={onClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    );
  }
}

class FullScreenDialog extends PureComponent {
  state = {
    open: false,
    selection: null,
    today: moment(),
    todaysOptions: [],
    fetching: false,
    extensions: null
  };

  handleClickOpen = async () => {
    this.setState({ open: true });
    await this.handleFetchingMealsOfTheDay();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePlaceOrder = async () => {
    // do some fency stuff here
    const { client, person } = this.props;

    // simulate posting meal order
    this.setState({
      fetching: true
    });

    const result = await client.mutate({
      mutation: placeOrder,
      variables: {
        body: {
          content: this.state.selection,
          date: moment().format('DDMMYYYY'),
          person: {
            id: person.id,
            firstname: person.firstname,
            lastname: person.lastname,
            mobile: person.mobile,
            email: person.email
          }
        }
      }
    });

    if (result.data.placeOrder) {
      this.setState({
        fetching: false,
        snackAlert: true,
        snackMessage: `Meal '${this.state.selection}' Placed Successfully`
      });
      setTimeout(() => {
        this.handleClose();
      }, 3000);
    }
  };

  handleFetchingMealsOfTheDay = async () => {
    const { client } = this.props;

    this.setState({
      selection: null,
      todaysOptions: [],
      fetching: true,
      extensions: null,
      customMeal: false
    });

    let isWeekend = moment().weekday() === 6 || moment().weekday() === 7;
    let day = isWeekend ? moment().weekday(1) : moment();

    this.setState({
      today: day
    });

    const result = await client.query({
      query: todaysMeals,
      variables: { date: day.format('DDMMYYYY') }
    });

    if (result.errors) {
      this.setState({
        selection: null,
        todaysOptions: [],
        errors: result.errors,
        fetching: false,
        extensions: result.extensions,
        snackAlert: false,
        snackMessage: null
      });
      return;
    }

    this.setState({
      selection: null,
      todaysOptions: result.data.meals,
      fetching: false,
      extensions: result.extensions
    });
  };

  handleMealSelection = e => {
    this.setState({
      selection: e.name
    });
  };

  handleCustomMeal = () => {
    this.setState({
      customMeal: !this.state.customMeal,
      selection: null
    });
  };

  render() {
    const { classes, auth, person } = this.props;
    const { fetching, todaysOptions, today, customMeal } = this.state;

    if (!auth.isAuthenticated(person)) return <div />;

    return (
      <div>
        <Button
          variant="fab"
          color="primary"
          aria-label="Lunch"
          onClick={this.handleClickOpen}
        >
          <AddShoppingCart />
        </Button>
        <SnackAttack
          message={this.state.snackMessage}
          open={this.state.snackAlert}
          onClose={() => this.setState({ snackAlert: false })}
        />
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Close"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                {`${today.format('DD MMMM YYYY')} - Place Your Lunch Order`}
              </Typography>
              <Button
                variant="fab"
                color="primary"
                aria-label="Lunch"
                onClick={this.handlePlaceOrder}
              >
                <AddIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.root} spacing={8}>
            <Grid item md={12}>
              <Grid item md={5}>
                <Paper />
              </Grid>
            </Grid>
            <Grid item md={12}>
              {fetching ? <Loader /> : null}
              <Grid item md={4}>
                {!fetching ? (
                  <Paper>
                    <List>
                      {todaysOptions && todaysOptions.length !== 0
                        ? todaysOptions.map((meal, index) => (
                            <ListItem
                              button
                              key={index}
                              onClick={() => this.handleMealSelection(meal)}
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
                      <ListItem button onClick={this.handleCustomMeal}>
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
                {customMeal ? (
                  <Paper className={classes.paper}>
                    <Typography variant="subheading">Custom Order:</Typography>
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
                        this.setState({ selection: e.target.value })
                      }
                    />
                  </Paper>
                ) : null}
              </Grid>
              <Grid item md={4}>
                {this.state.selection ? (
                  <Paper className={classes.paper}>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Check />
                        </ListItemIcon>
                        <ListItemText
                          primary={this.state.selection}
                          secondary="Current Selection"
                        />
                      </ListItem>
                    </List>
                  </Paper>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired
};

const LunchDialog = withApollo(FullScreenDialog);
export default withStyles(styles)(LunchDialog);

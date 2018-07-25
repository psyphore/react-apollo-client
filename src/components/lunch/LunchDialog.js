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
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import * as moment from 'moment';

import { todaysMeals } from '../../graphql';
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

  handlePlaceOrder = () => {
    // do some fency stuff here
    this.handleClose();
  };

  handleFetchingMealsOfTheDay = async () => {
    const { client } = this.props;

    this.setState({
      selection: null,
      todaysOptions: [],
      fetching: true,
      extensions: null
    });

    let isWeekend = moment().weekday() >= 6 || moment().weekday() <= 7;
    let day = isWeekend ? moment().weekday(1) : moment();

    this.setState({
      today: day
    });

    let date = day.format('DDMMYYYY');

    const result = await client.query({
      query: todaysMeals,
      variables: { date }
    });

    if (result.errors) {
      this.setState({
        selection: null,
        todaysOptions: [],
        errors: result.errors,
        fetching: false,
        extensions: result.extensions
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

  handleMealSelection = () => {};

  render() {
    const { classes, auth } = this.props;
    const { fetching, todaysOptions, today } = this.state;

    if (!auth.isAuthenticated()) return <div />;

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
              <Grid item md={9}>
                <Paper>
                  <List>
                    {todaysOptions && todaysOptions.length !== 0
                      ? todaysOptions.map((meal, index) => (
                          <ListItem
                            button
                            key={index}
                            onClick={e => this.handleMealSelection(e)}
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
                  </List>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper className={classes.paper} />
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
  auth: PropTypes.object.isRequired
};

const LunchDialog = withApollo(FullScreenDialog);
export default withStyles(styles)(LunchDialog);

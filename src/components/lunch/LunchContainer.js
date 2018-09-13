import React, { PureComponent } from 'react';
import { withApollo } from 'react-apollo';
import * as moment from 'moment';

import LunchButton from './LunchButton';
import LunchDialog from './LunchDialog';
import SnackBar from '../alert/SnackBar';
import { todaysMeals, placeOrder, myMealHistory } from '../../graphql';
import { LunchContext } from '../../HOC';

class LunchContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selection: null,
      today: moment(),
      todaysOptions: [],
      fetching: false,
      extensions: null,
      first: 10,
      offset: 0,
      history: [],
      trending: [],
      recommended: []
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleFetchingMealsOfTheDay = this.handleFetchingMealsOfTheDay.bind(
      this
    );
    this.handleMealSelection = this.handleMealSelection.bind(this);
    this.handleCustomMeal = this.handleCustomMeal.bind(this);
    this.handleFetchingHistory = this.handleFetchingHistory.bind(this);
    this.handleNextDay = this.handleNextDay.bind(this);
    this.handlePrevDay = this.handlePrevDay.bind(this);
    this.handleUpdateDay = this.handleUpdateDay.bind(this);
  }

  handleClickOpen = async () => {
    this.setState(() => ({
      open: true,
      today: moment(),
      selection: null,
      todaysOptions: [],
      fetching: false,
      extensions: null,
      first: 10,
      offset: 0,
      history: [],
      trending: [],
      recommended: []
    }));
    await this.asyncFetcher();
  };

  handleClose = () => {
    this.setState(() => ({ open: false }));
  };

  asyncFetcher = async () => {
    await this.handleFetchingMealsOfTheDay();
    await this.handleFetchingHistory();
  };

  handleNextDay = async () => {
    let day = this.state.today.add(1, 'd');
    this.setState(() => ({ today: day }));
    await this.handleFetchingMealsOfTheDay();
  };

  handlePrevDay = async () => {
    let day = this.state.today.subtract(1, 'd');
    this.setState(() => ({ today: day }));
    await this.handleFetchingMealsOfTheDay();
  };

  handleUpdateDay = value => {
    let day = moment(value);

    !day.isValid()
      ? this.setState(() => ({ today: moment() }))
      : this.setState(() => ({ today: day }));

    setTimeout(() => {
      this.handleFetchingMealsOfTheDay();
    }, 199);
  };

  handlePlaceOrder = async () => {
    const { client, person } = this.props;

    this.setState({
      fetching: true
    });

    const result = await client.mutate({
      mutation: placeOrder,
      variables: {
        body: {
          content: this.state.selection,
          date: this.state.today.format('DDMMYYYY'),
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
      this.setState(() => ({
        fetching: false,
        snackAlert: true,
        snackMessage: `Meal '${this.state.selection}' Placed Successfully`
      }));

      await this.handleFetchingHistory();

      setTimeout(async () => {
        await this.handleFetchingHistory();
      }, 2500);
    }
  };

  handleFetchingMealsOfTheDay = async () => {
    const { client } = this.props;
    const { today } = this.state;

    this.setState(() => ({
      selection: null,
      todaysOptions: [],
      fetching: true,
      extensions: null,
      customMeal: false
    }));

    const result = await client.query({
      query: todaysMeals,
      variables: { date: today.format('DDMMYYYY') },
      options: { fetchPolicy: 'network-only' }
    });

    if (result.errors) {
      this.setState(() => ({
        selection: null,
        todaysOptions: [],
        errors: result.errors,
        fetching: false,
        extensions: result.extensions,
        snackAlert: false,
        snackMessage: null
      }));
      return;
    }

    let cleanMeals = result.data.meals.map(({ type, name }) => {
      return { type: type.replace(/_+/g, ' '), name: name };
    });

    this.setState(() => ({
      selection: null,
      todaysOptions: cleanMeals,
      fetching: false,
      extensions: result.extensions
    }));
  };

  handleFetchingHistory = async () => {
    const { client } = this.props;
    const { first, offset } = this.state;

    const result = await client.query({
      query: myMealHistory,
      variables: { first, offset },
      options: { fetchPolicy: 'network-only' }
    });

    const {
      data: { lunchHistory }
    } = result;

    this.setState(() => ({
      history: lunchHistory
    }));
  };

  handleMealSelection = e => {
    this.setState(() => ({
      selection: e.name === 'nothing yet' ? e.type.replace(/_+/g, ' ') : e.name
    }));
  };

  handleCustomMeal = () => {
    this.setState(() => ({
      customMeal: !this.state.customMeal,
      selection: null
    }));
  };

  render() {
    const { person } = this.props;
    const { snackAlert, snackMessage } = this.state;

    const actions = {
      customMeal: this.handleCustomMeal,
      open: this.handleClickOpen,
      close: this.handleClose,
      selectMeal: this.handleMealSelection,
      placeOrder: this.handlePlaceOrder,
      selection: (prop, value) => this.setState({ [prop]: value }),
      nextDay: this.handleNextDay,
      prevDay: this.handlePrevDay,
      updateDay: this.handleUpdateDay
    };

    return (
      <LunchContext.Provider
        value={{ actions, state: this.state, person: person }}
      >
        <LunchButton clickHandler={this.handleClickOpen} />
        <LunchDialog />
        {snackAlert && (
          <SnackBar
            message={snackMessage}
            open={snackAlert}
            closeHandler={() => this.setState(() => ({ snackAlert: false }))}
          />
        )}
      </LunchContext.Provider>
    );
  }
}

export default withApollo(LunchContainer);

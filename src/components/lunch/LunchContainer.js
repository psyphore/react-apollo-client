import React, { PureComponent, Fragment } from 'react';
import { withApollo } from 'react-apollo';
import dayJS from 'dayjs';

import LunchButton from './LunchButton';
import LunchDialog from './LunchDialog';
import { SharedSnackbarConsumer } from '../alert/SnackBarProvider';
import { todaysMeals, placeOrder, myMealHistory } from '../../graphql';
import { LunchProvider } from '../../HOC';
import ErrorBoundary from '../error';

class LunchContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selection: null,
      today: dayJS(),
      todaysOptions: [],
      fetching: false,
      extensions: null,
      first: 5,
      offset: 0,
      history: [],
      trending: [],
      recommended: [],
      snackAlert: false,
      snackMessage: null,
      ownAcc: [],
      onBehalfOf: null
    };
  }

  handleClickOpen = async () => {
    this.setState(() => ({
      open: true,
      today: dayJS(),
      selection: null,
      todaysOptions: [],
      fetching: false,
      extensions: null,
      first: 5,
      offset: 0,
      history: [],
      trending: [],
      recommended: [],
      snackAlert: false,
      snackMessage: null,
      ownAcc: [],
      onBehalfOf: null
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
    let day = dayJS(value);

    !day.isValid()
      ? this.setState(() => ({ today: dayJS() }))
      : this.setState(() => ({ today: day }));

    setTimeout(() => {
      this.handleFetchingMealsOfTheDay();
    }, 199);
  };

  handlePlaceOrder = async () => {
    const { client } = this.props;
    const { selection, today } = this.state;

    this.setState({
      fetching: true
    });

    // todo: use token instead of person object
    const result = await client.mutate({
      mutation: placeOrder,
      variables: {
        body: {
          content: selection,
          date: today.toISOString()
        }
      }
    });

    if (result.data.placeOrder) {
      console.log('meal placement set state called');
      setTimeout(() => {
        console.log(result.data.placeOrder);
        this.setState(state => ({
          fetching: !state.fetching,
          snackAlert: !state.snackAlert,
          snackMessage: `Meal '${selection}' Placed Successfully`
        }));
        setTimeout(() => {
          this.setState(() => ({
            fetching: false,
            snackAlert: false,
            snackMessage: null,
            selection: null
          }));
        }, 6000);
      }, 1000);

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
      variables: { date: today.toISOString() },
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
        snackMessage: null,
        ownAcc: []
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

  nextHistoryBatch = async () => {
    this.setState((state, props) => ({
      offset: state.offset + 1 > 10 ? 10 : state.offset + 1
    }));

    await this.handleFetchingHistory();
  };

  prevHistoryBatch = async () => {
    this.setState((state, props) => ({
      offset: state.offset - 1 < 0 ? 0 : state.offset - 1
    }));

    await this.handleFetchingHistory();
  };

  handleMealSelection = e => {
    this.setState(() => ({
      selection: e.name === 'nothing yet' ? e.type.replace(/_+/g, ' ') : e.name
    }));
  };

  handleMealSelectionForSomeoneElse = e => {
    console.log(e);
    this.setState(() => ({
      onBehalfOf: e.id
    }));
  };

  handleCustomMeal = () => {
    this.setState(() => ({
      customMeal: !this.state.customMeal,
      selection: null
    }));
  };

  handleOwnAccount = item => {
    this.setState(state => ({
      ownAcc: [...state.ownAcc].push(item)
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
      updateDay: this.handleUpdateDay,
      nextHistory: this.nextHistoryBatch,
      prevHistory: this.prevHistoryBatch,
      ownAccount: this.handleOwnAccount,
      selectOnBehalfOf: this.handleMealSelectionForSomeoneElse
    };

    return (
      <ErrorBoundary>
        <LunchProvider value={{ actions, state: this.state, person: person }}>
          <SharedSnackbarConsumer>
            {({ openSnackbar }) => (
              <Fragment>
                <LunchButton clickHandler={this.handleClickOpen} />
                <LunchDialog />
                {snackAlert && openSnackbar(snackMessage)}
              </Fragment>
            )}
          </SharedSnackbarConsumer>
        </LunchProvider>
      </ErrorBoundary>
    );
  }
}

export default withApollo(LunchContainer);

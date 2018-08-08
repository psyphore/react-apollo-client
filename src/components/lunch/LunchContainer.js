import React, { PureComponent, Fragment } from 'react';

import { withApollo } from 'react-apollo';
import * as moment from 'moment';

import LunchButton from './LunchButton';
import LunchDialog from './LunchDialog';
import SnackBar from '../alert/SnackBar';
import { todaysMeals, placeOrder, myMealHistory } from '../../graphql';
import { LunchContext, PersonContext } from '../../HOC';

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
  }

  handleClickOpen = async () => {
    this.setState({ open: true });
    await this.asyncFetcher();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  asyncFetcher = async () => {
    await this.handleFetchingMealsOfTheDay();
    await this.handleFetchingHistory();
  };

  handleNextDay = async () => {
    // const { today } = this.state;
    // this.setState({ today: today.add(1, 'd') });
    this.setState((prevState, props) => ({ today: prevState.today.add(1, 'd') }));
    await this.handleFetchingMealsOfTheDay();
  };

  handlePrevDay = async () => {
    // const { today } = this.state;
    // this.setState({ today: today.subtract(1, 'd') });
    this.setState((prevState, props) => ({ today: prevState.today.subtract(1, 'd') }));
    await this.handleFetchingMealsOfTheDay();
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
    const { today } = this.state;

    this.setState({
      selection: null,
      todaysOptions: [],
      fetching: true,
      extensions: null,
      customMeal: false
    });

    // let isWeekend = moment().weekday() === 6 || moment().weekday() === 7;
    // let day = isWeekend ? moment().weekday(1) : today;

    // this.setState({
    //   today: day
    // });

    const result = await client.query({
      query: todaysMeals,
      variables: { date: today.format('DDMMYYYY') }
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

  handleFetchingHistory = async () => {
    const { client } = this.props;
    const { first, offset } = this.state;

    const result = await client.query({
      query: myMealHistory,
      variables: { first, offset }
    });

    const {
      data: { lunchHistory }
    } = result;

    this.setState({
      history: lunchHistory
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
      prevDay: this.handlePrevDay
    };

    return (
      <Fragment>
        <PersonContext.Consumer>
          {state => (
            <div>
              <LunchContext.Provider
                value={{ actions, state: this.state, person: person }}
              >
                <LunchButton clickHandler={this.handleClickOpen} />
                <LunchDialog />
                {snackAlert ? (
                  <SnackBar
                    message={snackMessage}
                    open={snackAlert}
                    closeHandler={() => this.setState({ snackAlert: false })}
                  />
                ) : null}
              </LunchContext.Provider>
            </div>
          )}
        </PersonContext.Consumer>
      </Fragment>
    );
  }
}

export default withApollo(LunchContainer);

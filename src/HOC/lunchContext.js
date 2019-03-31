import React, { createContext, Component } from 'react';
import { withApollo } from 'react-apollo';
import dayJS from 'dayjs';

import { todaysMeals, placeOrder, myMealHistory } from '../graphql';

const LunchContext = createContext({
  actions: {},
  state: {}
});

class ProviderComponent extends Component {
  fetchPolicy = 'network-only';
  defaultLimit = 5;
  defaultOffset = 0;
  defaultPageMax = 10;
  defaultPageMin = 0;

  state = {
    lunch: [],
    open: false,
    selection: null,
    today: dayJS(),
    todaysOptions: [],
    fetching: false,
    extensions: null,
    first: this.defaultLimit,
    offset: this.defaultOffset,
    history: [],
    trending: [],
    recommended: [],
    snackAlert: false,
    snackMessage: null,
    ownAcc: [],
    onBehalfOf: null
  };

  addLunch = lunch => {
    console.log('Adding lunch', lunch);
    const updatedCart = [...this.state.lunch];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === lunch.id
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...lunch, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setTimeout(() => {
      // simulate api call
      this.setState({ lunch: updatedCart });
    }, 700);
  };

  updateLunch = lunch => {
    console.log('Removing lunch with id: ' + lunch.id);
    const updatedCart = [...this.state.lunch];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === lunch.id
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setTimeout(() => {
      // simulate api call
      this.setState({ lunch: updatedCart });
    }, 700);
  };

  clearLunch = () => {
    console.info('Clearing Notifications');
    this.setState({ lunch: [] });
  };

  clearState = isOpen => {
    this.setState(() => ({
      lunch: [],
      open: isOpen ? isOpen : false,
      today: dayJS(),
      selection: null,
      todaysOptions: [],
      fetching: false,
      extensions: null,
      first: this.defaultLimit,
      offset: this.defaultOffset,
      history: [],
      trending: [],
      recommended: [],
      snackAlert: false,
      snackMessage: null,
      ownAcc: [],
      onBehalfOf: null
    }));
  };

  handleClickOpen = async () => {
    this.clearState(true);
    await this.asyncFetcher();
  };

  handleClose = () => {
    this.clearState(false);
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
      options: { fetchPolicy: this.fetchPolicy }
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
      options: { fetchPolicy: this.fetchPolicy }
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
      offset:
        state.offset + 1 > this.defaultPageMax
          ? this.defaultPageMax
          : state.offset + 1
    }));

    await this.handleFetchingHistory();
  };

  prevHistoryBatch = async () => {
    this.setState((state, props) => ({
      offset:
        state.offset - 1 < this.defaultPageMin
          ? this.defaultPageMin
          : state.offset - 1
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

  handleSelection = (prop, value) => this.setState({ [prop]: value });

  render() {
    const { Provider } = LunchContext;
    const { children } = this.props;

    return (
      <Provider
        value={{
          state: { ...this.state },
          actions: {
            addLunch: this.addLunch,
            updateLunch: this.updateLunch,
            clearLunch: this.clearLunch,
            customMeal: this.handleCustomMeal,
            open: this.handleClickOpen,
            close: this.handleClose,
            selectMeal: this.handleMealSelection,
            placeOrder: this.handlePlaceOrder,
            selection: this.handleSelection,
            nextDay: this.handleNextDay,
            prevDay: this.handlePrevDay,
            updateDay: this.handleUpdateDay,
            nextHistory: this.nextHistoryBatch,
            prevHistory: this.prevHistoryBatch,
            ownAccount: this.handleOwnAccount,
            selectOnBehalfOf: this.handleMealSelectionForSomeoneElse
          }
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const Provider = withApollo(ProviderComponent);
export const SharedLunchConumer = LunchContext.Consumer;

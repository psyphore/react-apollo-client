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
    selection: {
      name: null,
      comments: null,
      provider: null,
      ownAccount: false,
      type: undefined
    },
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
    onBehalfOf: null
  };

  handleStateUpdate = (prop, value) => this.setState({ [prop]: value });

  addLunch = lunch => {
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
    this.setState({ lunch: [] });
  };

  clearState = isOpen => {
    this.setState(() => ({
      lunch: [],
      open: isOpen ? isOpen : false,
      today: dayJS(),
      selection: {
        name: null,
        comments: null,
        provider: null,
        ownAccount: false,
        type: undefined
      },
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
    const {
      selection: { name, provider, ownAccount, comments, type },
      today,
      onBehalfOf
    } = this.state;

    this.setState({
      fetching: true
    });

    const payload = {
      provider: provider.replace('2', '_2').replace(/ +/g, '_'),
      comments: comments,
      content: name,
      date: today.toISOString(),
      ownAccount: ownAccount ? ownAccount : false,
      onBehalfOf: onBehalfOf ? onBehalfOf : null,
      type: type
    };

    const result = await client.mutate({
      mutation: placeOrder,
      variables: { body: payload }
    });

    if (result.data.placeOrder) {
      setTimeout(() => {
        this.setState(state => ({
          fetching: !state.fetching,
          snackAlert: !state.snackAlert,
          snackMessage: `Meal placed successfully!`
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
        selection: {
          name: null,
          comments: null,
          provider: null,
          ownAccount: false
        },
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

    const cleanMeals = [
      ...new Set(
        result.data.meals.map(meal => {
          meal.type = meal.type.replace(/_+/g, ' ');
          meal.provider = meal.provider.replace(/_+/g, ' ').trim();
          return meal;
        })
      )
    ];

    this.setState(() => ({
      selection: {
        name: null,
        comments: null,
        provider: null,
        ownAccount: false
      },
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
      history: [...new Set(lunchHistory)]
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

  handleMealSelection = e => this.handleStateUpdate('selection', e);

  handleMealSelectionFor = e => this.handleStateUpdate('onBehalfOf', e.id);

  handleCustomMeal = () => {
    this.setState(() => ({
      customMeal: !this.state.customMeal,
      selection: {
        name: undefined,
        comments: undefined,
        provider: undefined,
        ownAccount: false,
        type: 'Other'
      }
    }));
  };

  handleCustomMealEvents = (prop, value) => {
    const { selection } = this.state;
    selection[prop] = value;
    this.setState(() => ({ selection: selection }));
  };

  handleClearingMeal = () => {
    const { selection } = this.state;
    Object.keys(selection).map(key => {
      switch (key) {
        case 'ownAccount':
          {
            selection[key] = false;
          }
          break;
        case 'type':
          {
            selection[key] = 'Other';
          }
          break;
        default:
          {
            selection[key] = undefined;
          }
          break;
      }
    });

    this.setState(() => ({ selection: selection, customMeal: false }));
  };

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
            selection: this.handleStateUpdate,
            nextDay: this.handleNextDay,
            prevDay: this.handlePrevDay,
            updateDay: this.handleUpdateDay,
            nextHistory: this.nextHistoryBatch,
            prevHistory: this.prevHistoryBatch,
            selectOnBehalfOf: this.handleMealSelectionFor,
            editCustomMeal: this.handleCustomMealEvents,
            clearMeal: this.handleClearingMeal
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

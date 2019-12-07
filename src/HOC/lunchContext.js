import React, { createContext, Component } from 'react';
import { withApollo } from 'react-apollo';
import dayJS from 'dayjs';

import {
  todaysMeals,
  placeMultipleOrders,
  myMealHistory,
  fetchMealProperties
} from '../graphql';

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
  defaultNetworkTimeout = 799;

  state = {
    lunch: [],
    history: [],
    trending: [],
    recommended: [],
    today: dayJS(),
    todaysOptions: [],
    open: false,
    defaultCategories: [],
    defaultProviders: [],
    selection: {
      id: null,
      name: '',
      comments: '',
      provider: '',
      content: '',
      category: '',
      ownAccount: false
    },

    fetching: false,
    first: this.defaultLimit,
    offset: this.defaultOffset,

    snackAlert: false,
    snackMessage: null,
    onBehalfOf: null
  };

  handleStateUpdate = (prop, value) => this.setState(() => ({ [prop]: value }));

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
      this.handleStateUpdate('lunch', updatedCart);
    }, this.defaultNetworkTimeout);
  };

  addCustomLunch = lunch => {
    const updatedCart = [...this.state.lunch];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.name === lunch.name && item.id === lunch.id
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
      this.handleStateUpdate('lunch', updatedCart);
    }, this.defaultNetworkTimeout);
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
      this.handleStateUpdate('lunch', updatedCart);
    }, this.defaultNetworkTimeout);
  };

  removeLunch = lunch => {
    const updatedCart = [...this.state.lunch];
    const updatedItemIndex = updatedCart.findIndex(
      item =>
        item.id === lunch.id &&
        item.name === lunch.name &&
        item.category === lunch.category &&
        item.provider === lunch.provider
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };

    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    }

    setTimeout(() => {
      this.handleStateUpdate('lunch', updatedCart);
    }, this.defaultNetworkTimeout);
  };

  clearLunch = () => {
    this.handleStateUpdate('lunch', []);
  };

  clearState = isOpen => {
    this.setState(() => ({
      lunch: [],
      history: [],
      trending: [],
      recommended: [],
      todaysOptions: [],
      open: isOpen ? isOpen : false,
      today: dayJS(),
      selection: {
        id: null,
        name: '',
        comments: '',
        provider: '',
        content: '',
        category: '',
        ownAccount: false
      },

      fetching: false,
      first: this.defaultLimit,
      offset: this.defaultOffset,

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
    // await this.handleFetchingTrends();
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
    }, this.defaultNetworkTimeout);
  };

  handlePlaceOrder = async () => {
    const { client } = this.props;
    const { lunch, today } = this.state;

    this.setState({
      fetching: true
    });

    const payload = lunch.map(item => {
      const p = {
        id: item.id,
        name: item.name,
        provider: item.provider.replace('2', '_2').replace(/ +/g, '_'),
        category: item.category.replace(/ +/g, '_'),
        comments: item.comments,
        content: item.name,
        date: today.toISOString(),
        ownAccount: item.ownAccount ? item.ownAccount : false,
        onBehalfOf: item.onBehalfOf ? item.onBehalfOf : null
      };
      return p;
    });

    const result = await client.mutate({
      mutation: placeMultipleOrders,
      variables: { meals: payload }
    });

    if (result.data.placeMultipleOrder) {
      setTimeout(() => {
        this.setState(state => ({
          fetching: !state.fetching,
          snackAlert: !state.snackAlert,
          snackMessage: `
          ${result.data.placeMultipleOrders}
          Meal placed successfully!
          `
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
          id: null,
          name: null,
          comments: null,
          provider: null,
          content: null,
          category: null,
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
        result.data.meals
          .filter(meal => meal.id !== null)
          .map(meal => {
            meal.category = meal.category.replace(/_+/g, ' ');
            meal.provider = meal.provider.replace(/_+/g, ' ').trim();
            return meal;
          })
      )
    ];

    this.setState(() => ({
      selection: {
        id: null,
        name: null,
        comments: null,
        provider: null,
        content: null,
        category: null,
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

  handleMealSelection = e => {
    this.handleStateUpdate('selection', e);
    this.addLunch(e);
  };

  handleMealSelectionFor = e => this.handleStateUpdate('onBehalfOf', e.id);

  handleCustomMeal = () => {
    this.setState(() => ({
      customMeal: !this.state.customMeal,
      selection: {
        id: null,
        name: 'Custom Meal',
        comments: '',
        provider: '',
        content: '',
        category: 'OTHER',
        ownAccount: false
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
          selection[key] = false;
          break;
        case 'type':
          selection[key] = 'Other';
          break;
        default:
          selection[key] = undefined;
          break;
      }
      return true;
    });

    this.setState(() => ({ selection: selection, customMeal: false }));
    this.clearLunch();
  };

  handleFetchMealProperties = async () => {
    const { client } = this.props;

    const categoriesResult = await client.query({
      query: fetchMealProperties,
      variables: { type: 'CATEGORY' },
      options: { fetchPolicy: this.fetchPolicy }
    });

    if (categoriesResult.data.mealProps) {
      this.handleStateUpdate(
        'defaultCategories',
        categoriesResult.data.mealProps
      );
    }

    const providersResult = await client.query({
      query: fetchMealProperties,
      variables: { type: 'PROVIDER' },
      options: { fetchPolicy: this.fetchPolicy }
    });

    if (providersResult.data.mealProps) {
      this.handleStateUpdate(
        'defaultProviders',
        providersResult.data.mealProps
      );
    }
  };

  componentDidMount = async props => {
    // const {
    //   defaultCategories,
    //   defaultProviders
    // } = await fetchCategoriesAndProviders();
    // this.setState({
    //   defaultCategories: [...defaultCategories],
    //   defaultProviders: [...defaultProviders]
    // });
    await this.handleFetchMealProperties();
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
            removeLunch: this.removeLunch,
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
            addCustomMeal: this.addCustomLunch,
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
export const SharedLunchConsumer = LunchContext.Consumer;
export const lctx = LunchContext;

import React, { createContext, Component } from 'react';
import { withApollo } from 'react-apollo';
import dayJS from 'dayjs';

import { todaysMeals, placeOrder, setMealOptions } from '../graphql';

const LunchManagerContext = createContext({
  actions: {},
  state: {}
});

class ProviderComponent extends Component {
  fetchPolicy = 'network-only';
  defaultLimit = 5;
  defaultOffset = 0;
  defaultPageMax = 10;
  defaultPageMin = 0;
  networkTimeout = 199;

  state = {
    today: dayJS(),
    open: false,
    defaultProviders: ['2B CUISINE', 'DEJA VU'],
    defaultCategories: ['Meal of the day', 'Vegetarian', 'Banting'],
    meal: {
      date: undefined,
      name: '',
      content: '',
      comments: '',
      category: '',
      provider: ''
    },
    options: [],

    fetching: false,
    first: this.defaultLimit,
    offset: this.defaultOffset,

    snackAlert: false,
    snackMessage: null
  };

  handleFetchingOfCategoriesAndProviders = () => {
    return new Promise(resolve => {
      resolve({
        defaultProviders: ['2B CUISINE', 'DEJA VU'],
        defaultCategories: ['Meal of the day', 'Vegetarian', 'Banting'],
        meal: {
          date: undefined,
          name: '',
          content: '',
          comments: '',
          category: '',
          provider: ''
        }
      });
    });
  };

  handleStateUpdate = (prop, value) => this.setState({ [prop]: value });

  handleFetchingMealsOfTheDay = async () => {
    const { client } = this.props;
    const { today } = this.state;

    this.setState(() => ({
      meal: {
        date: undefined,
        name: '',
        content: '',
        comments: '',
        category: '',
        provider: ''
      },
      options: []
    }));

    const result = await client.query({
      query: todaysMeals,
      variables: { date: today.toISOString() },
      options: { fetchPolicy: this.fetchPolicy }
    });

    if (result.errors) {
      this.setState(() => ({
        meal: {
          date: undefined,
          name: undefined,
          content: undefined,
          comments: undefined,
          category: undefined,
          provider: undefined
        },
        options: [],
        errors: result.errors,

        fetching: false,
        snackAlert: false,
        snackMessage: null
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
      meal: {
        date: undefined,
        name: '',
        content: '',
        comments: '',
        category: undefined,
        provider: undefined
      },

      options: cleanMeals,

      fetching: false
    }));
  };

  clearState = isOpen => {
    this.setState(() => ({
      open: isOpen ? isOpen : false,

      today: dayJS(),
      defaultProviders: ['2B CUISINE', 'DEJA VU'],
      defaultCategories: ['Meal of the day', 'Vegetarian', 'Banting'],
      meal: {
        date: undefined,
        name: '',
        content: '',
        comments: '',
        category: '',
        provider: ''
      },
      options: [],

      fetching: false,
      first: this.defaultLimit,
      offset: this.defaultOffset,

      snackAlert: false,
      snackMessage: null
    }));
  };

  handleOpen = async () => {
    this.clearState(true);
    await this.asyncFetcher();
  };

  handleClose = () => {
    this.clearState(false);
  };

  asyncFetcher = async () => {
    await this.handleFetchingOfCategoriesAndProviders();
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
    }, this.networkTimeout);
  };

  handleMealSelection = e => this.handleStateUpdate('meal', e);

  handleClearMealSelection = () =>
    this.handleStateUpdate('meal', {
      date: undefined,
      name: '',
      content: '',
      comments: '',
      category: '',
      provider: ''
    });

  handleSaveMealOptions = async () => {
    const { client } = this.props;
    const { options, today } = this.state;

    this.setState(() => ({ fetching: true }));

    const collection = options.map(o => {
      const payload = {
        provider: o.provider.replace('2', '_2').replace(/ +/g, '_'),
        content: o.content,
        name: o.name,
        date: today.toISOString(),
        category: o.category,
        comments: o.comments
      };
      return payload;
    });

    const result = await client.mutate({
      mutation: setMealOptions,
      variables: { body: collection }
    });

    if (result.data.placeOrder) {
      setTimeout(() => {
        this.setState(state => ({
          fetching: !state.fetching,
          snackAlert: !state.snackAlert,
          snackMessage: `Meal updated successfully!`
        }));
        setTimeout(() => {
          this.setState(() => ({
            fetching: false,
            snackAlert: false,
            snackMessage: null
          }));
        }, this.networkTimeout);
      }, this.networkTimeout);
    }
  };

  handleMealOptionAdding = e => {
    console.log(e);
    const { meal, options, today } = this.state;
    const updatedCart = [...options];
    const updatedItemIndex = updatedCart.findIndex(
      item =>
        item.name === meal.name &&
        item.category === meal.category &&
        item.provider === meal.provider
    );

    if (updatedItemIndex < 0) {
      meal['date'] = today;
      updatedCart.push({ ...meal });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem['date'] = today;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    setTimeout(() => {
      this.handleStateUpdate('options', updatedCart);
      this.handleClearMealSelection();
    }, this.networkTimeout);
  };

  handleMealOptionsUpdate = async () => {
    const { options } = this.state;
    const updatedCart = [...options];

    console.log('> final meal cart: ', updatedCart);

    await this.handleSaveMealOptions();
  };

  handleMealEditEvents = e => {
    const { name, value } = e.target;
    const { meal } = this.state;
    meal[name] = value;
    this.handleMealSelection(meal);
  };

  handleUpdateDay = value => {
    let day = dayJS(value);

    !day.isValid()
      ? this.setState(() => ({ today: dayJS() }))
      : this.setState(() => ({ today: day }));

    setTimeout(() => {
      this.handleFetchingMealsOfTheDay();
    }, this.networkTimeout);
  };

  componentDidMount = () => {
    this.handleFetchingOfCategoriesAndProviders().then(value => {
      this.setState({ ...value });
    });
  };

  render() {
    const { Provider } = LunchManagerContext;
    const { children } = this.props;

    return (
      <Provider
        value={{
          state: { ...this.state },
          actions: {
            open: this.handleOpen,
            close: this.handleClose,

            addMeal: this.handleMealOptionAdding,
            updateMeals: this.handleMealOptionsUpdate,

            selectMeal: this.handleMealSelection,
            clearMeal: this.handleClearMealSelection,

            mealEvent: this.handleMealEditEvents,
            updateDay: this.handleUpdateDay
          }
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const Provider = withApollo(ProviderComponent);
export const SharedLunchManagerConsumer = LunchManagerContext.Consumer;
export const lmctx = LunchManagerContext;

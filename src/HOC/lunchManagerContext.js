import React, { createContext, Component } from 'react';
import { withApollo } from 'react-apollo';
import dayJS from 'dayjs';

import { todaysMeals, placeOrder } from '../graphql';

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
    todaysOptions: [],
    open: false,
    defaultProviders: ['2B CUISINE', 'DEJA VU'],
    defaultCategories: ['Meal of the day', 'Vegetarian', 'Banting'],
    meal: {
      date: undefined,
      item: {
        name: undefined,
        content: undefined,
        comments: undefined,
        category: undefined,
        provider: undefined
      }
    },
    options: [],

    fetching: false,
    first: this.defaultLimit,
    offset: this.defaultOffset,

    snackAlert: false,
    snackMessage: null
  };

  handleFetchingOfCategoriesAndProviders = () => {
    return new Promise((resolve, reject) => {
      resolve({
        providers: ['2B CUISINE', 'DEJA VU'],
        categories: ['Meal of the day', 'Vegetarian', 'Banting']
      });
    });
  };

  handleStateUpdate = (prop, value) => this.setState({ [prop]: value });

  handleFetchingMealsOfTheDay = async () => {
    const { client } = this.props;
    const { today } = this.state;

    this.setState(() => ({
      todaysOptions: [],
      meal: {
        date: undefined,
        meal: {
          name: undefined,
          content: undefined,
          comments: undefined,
          category: undefined,
          provider: undefined
        }
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
        todaysOptions: [],
        meal: {
          date: undefined,
          meal: {
            name: undefined,
            content: undefined,
            comments: undefined,
            category: undefined,
            provider: undefined
          }
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

  clearState = isOpen => {
    this.setState(() => ({
      open: isOpen ? isOpen : false,

      today: dayJS(),
      todaysOptions: [],
      defaultProviders: ['2B CUISINE', 'DEJA VU'],
      defaultCategories: ['Meal of the day', 'Vegetarian', 'Banting'],
      meal: {
        date: undefined,
        item: {
          name: undefined,
          content: undefined,
          comments: undefined,
          category: undefined,
          provider: undefined
        }
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
    await this.handleFetchingMealsOfTheDay();
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
      mutation: placeOrder,
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
        }, 6000);
      }, 1000);
    }
  };

  initProvider = () => {
    return {};
  };

  render() {
    const { Provider } = LunchManagerContext;
    const { children } = this.props;
    console.log('lunch manager context rendering...');

    return (
      <Provider
        value={{
          state: { ...this.state },
          actions: {
            open: this.handleOpen,
            close: this.handleClose
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

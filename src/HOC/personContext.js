import React, { createContext, Component } from 'react';
import { withApollo } from 'react-apollo';

import { Auth } from '../services';

import { getMeQuery } from '../graphql';

const PersonContext = createContext({
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
    me: {},
    fetching: false
  };

  updateMe = me => {
    const updatedMe = me;
    this.setState(() => ({ me: updatedMe, fetching: false }));
  };

  clearMe = () => {
    this.setState({ me: {} });
  };

  authMe = () => {
    const auth = new Auth();
    auth.logout();
    auth.login();
  };

  fetchMe = async () => {
    const { client } = this.props;
    this.setState(() => ({ fetching: true }));
    const result = await client.query({
      query: getMeQuery,
      variables: {},
      options: { fetchPolicy: this.fetchPolicy }
    });

    console.info('fetch me result', result);

    const {
      data: { me }
    } = result;

    this.updateMe(me);
  };

  render() {
    const { Provider } = PersonContext;
    const { children } = this.props;
    return (
      <Provider
        value={{
          state: { ...this.state },
          actions: {
            updateMe: this.updateMe,
            clearMe: this.clearMe,
            authenticate: this.authMe,
            fetchMe: this.fetchMe
          }
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const Provider = withApollo(ProviderComponent);
export const Consumer = PersonContext.Consumer;
export const personContext = PersonContext;

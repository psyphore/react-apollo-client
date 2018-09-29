import React, { Component, createContext } from 'react';
import { withApollo } from 'react-apollo';

import { Auth } from '../services';

const Context = createContext({
  title: process.env.REACT_APP_NAME,
  auth: () => new Auth(),
  dispatch: () => null
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'READ': {
      return {
        ...state,
        title: action.payload
      };
    }
    case 'WRITE': {
      return {
        ...state,
        title: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

class ProviderComponent extends Component {
  state = {
    title: process.env.REACT_APP_NAME,
    auth: () => new Auth(),
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    //console.log(`current app state: ${JSON.stringify(this.state, null, 2)}`);
  }

  render() {
    const { Provider } = Context;
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>;
  }
}

export const Provider = withApollo(ProviderComponent);
export const Consumer = Context.Consumer;

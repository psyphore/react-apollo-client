import React, { Component, createContext } from 'react';

const Context = createContext({
  generalNotes: [],
  privateNotes: [],
  dispatch: () => null,
  subscribe: () => null,
  unsubscribe: () => null
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
    notification: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  updateNotes = e => {
    this.setState(() => ({ notification: e }));
  };

  render() {
    const { Provider } = Context;
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>;
  }
}

export const Provider = ProviderComponent;
export const Consumer = Context.Consumer;

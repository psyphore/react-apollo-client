import React, { createContext, Component } from 'react';

import { Auth } from '../services';

const PersonContext = createContext({
  actions: {},
  authMe: () => {
    const auth = new Auth();
    auth.logout();
    auth.login();
  }
});

class ProviderComponent extends Component {
  state = {
    me: {}
  };

  updateMe = me => {
    console.log('Updating me', me);
    const updatedMe = me;
    setTimeout(() => {
      // simulate api call
      this.setState({ me: updatedMe });
    }, 700);
  };

  clearMe = () => {
    console.info('Clearing Me');
    this.setState({ me: {} });
  };

  render() {
    const { Provider } = PersonContext;
    const { children } = this.props;
    return (
      <Provider
        value={{
          ...this.state,
          actions: {
            updateMe: this.updateMe,
            clearMe: this.clearMe
          }
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const Provider = ProviderComponent;
export const Consumer = PersonContext.Consumer;

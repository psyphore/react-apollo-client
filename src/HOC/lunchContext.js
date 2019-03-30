import React, { createContext, Component } from 'react';

const LunchContext = createContext({
  actions: {},
  lunch: []
});

class ProviderComponent extends Component {
  state = {
    lunch: []
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

  render() {
    const { Provider } = LunchContext;
    const { children } = this.props;

    return (
      <Provider
        value={{
          ...this.state,
          actions: {
            addLunch: this.addLunch,
            updateLunch: this.updateLunch,
            clearLunch: this.clearLunch
          }
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const Provider = ProviderComponent;
export const SharedLunchConumer = LunchContext.Consumer;

import React, { Component, createContext } from 'react';

const Context = createContext({
  actions: {}
});

class ProviderComponent extends Component {
  state = {
    notification: []
  };

  addNotification = note => {
    console.log('Adding notification', note);
    const updatedCart = [...this.state.notifications];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === note.id);

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...note, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setTimeout(() => {
      // simulate api call
      this.setState({ notifications: updatedCart });
    }, 700);
  };

  updateNotification = note => {
    console.log('Removing notification with id: ' + note.id);
    const updatedCart = [...this.state.notifications];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === note.id);

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
      this.setState({ notifications: updatedCart });
    }, 700);
  };

  clearNotifications = () => {
    console.info('Clearing Notifications');
    this.setState({ notifications: [] });
  };

  render() {
    const { Provider } = Context;
    const { children } = this.props;
    return (
      <Provider
        value={{
          ...this.state,
          actions: {
            addNotification: this.addNotification,
            updateNotification: this.updateNotification,
            clearNotifications: this.clearNotifications
          }
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const Provider = ProviderComponent;
export const Consumer = Context.Consumer;

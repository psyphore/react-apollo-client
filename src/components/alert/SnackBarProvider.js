import React, { createContext, PureComponent } from 'react';

const Context = createContext();

class ProviderComponent extends PureComponent {
  state = {
    isOpen: false,
    message: ''
  };

  openSnackbar = message => {
    this.setState({
      message,
      isOpen: true
    });
  };

  closeSnackbar = () => {
    this.setState({
      message: '',
      isOpen: false
    });
  };

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;
    const { Provider } = Context;

    return (
      <Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: isOpen,
          message: this.state.message
        }}
      >
        {children}
      </Provider>
    );
  }
}

export const SharedSnackbarConsumer = Context.Consumer;
export const SharedSnackbarProvider = ProviderComponent;

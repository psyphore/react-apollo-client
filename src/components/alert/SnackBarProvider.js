import React, { createContext, PureComponent } from 'react';
import SharedSnackbar from './SharedSnackBar';

const Context = createContext();

class ProviderComponent extends PureComponent {
  state = {
    isOpen: false,
    message: ''
  };

  counter = 0;

  snackCount = () => {
    console.group('Snackbar Activation');
    this.counter += 1;
    console.log(this.counter);
    console.groupEnd();
  };

  openSnackbar = message => {
    this.snackCount();
    this.setState(() => ({
      message,
      isOpen: true
    }));
  };

  closeSnackbar = () => {
    this.setState(() => ({
      message: null,
      isOpen: false
    }));
  };

  render() {
    const { children } = this.props;
    const { isOpen, message } = this.state;
    const { Provider } = Context;

    return (
      <Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: isOpen,
          message: message
        }}
      >
        <SharedSnackbar />
        {children}
      </Provider>
    );
  }
}

export const SharedSnackbarConsumer = Context.Consumer;
export const SharedSnackbarProvider = ProviderComponent;

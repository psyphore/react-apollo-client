import React, { createContext, PureComponent } from 'react';

const SharedSnackbarContext = createContext();

export class SharedSnackbarProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      message: ''
    };
  }

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

    return (
      <SharedSnackbarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: isOpen,
          message: this.state.message
        }}
      >
        {children}
      </SharedSnackbarContext.Provider>
    );
  }
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;

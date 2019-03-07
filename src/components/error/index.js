import React, { Component, Fragment } from 'react';

const ErrorMessage = ({ error }) => (
  <Fragment>{error && error.message ? error.message : error}</Fragment>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  componentDidCatch(error, info) {
    this.setState(() => ({
      hasError: true,
      errorMessage: `${error}`
    }));

    console.group('Error Bound');
    console.error(error);
    console.error(info);
    console.groupEnd();
  }

  render() {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;

    return (
      <Fragment>
        {hasError && errorMessage && <ErrorMessage error={errorMessage} />}
        {children}
      </Fragment>
    );
  }
}

export default ErrorBoundary;

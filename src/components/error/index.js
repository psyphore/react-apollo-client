import React, { Fragment } from 'react';

const ErrorMessage = ({ error }) => (
  <Fragment>{JSON.stringify(error)}</Fragment>
);
export default ErrorMessage;

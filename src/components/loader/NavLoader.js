import React, { Fragment } from 'react';
import Loader from './index';

export default function Loading(props) {
  const { error, pastDelay, retry } = props;
  if (error) {
    return (
      <Fragment>
        Error! <button onClick={retry}>Retry</button>
      </Fragment>
    );
  } else if (pastDelay) {
    return <Loader />;
  } else {
    return null;
  }
}

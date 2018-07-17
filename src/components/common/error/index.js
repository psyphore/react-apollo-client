import React, { PureComponent } from 'react';

export default class ErrorMessage extends PureComponent {
  render() {
    const { error } = this.props;
    return <div>{JSON.stringify(error)}</div>;
  }
}

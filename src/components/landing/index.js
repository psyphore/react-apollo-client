import React, { PureComponent } from 'react';
import './index.css';

export default class Landing extends PureComponent {
  render() {
    return (
      <div className="landing-container">
        <div className="brand">brand</div>
        <div className="header">header</div>
        <div className="menu">menu</div>
        <div className="content">content</div>
        <div className="footer">footer</div>
      </div>
    );
  }
}

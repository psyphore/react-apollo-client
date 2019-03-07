import React, { PureComponent, Fragment } from 'react';

import { withApollo } from 'react-apollo';
import dayJS from 'dayjs';

import LeaveButton from './LeaveButton';
import LeaveDialog from './LeaveDialog';
import SnackBar from '../alert/SnackBar';
import { LeaveContext, PersonContext } from '../../HOC';

class LeaveContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selection: null,
      today: dayJS(),
      todaysOptions: [],
      fetching: false,
      extensions: null
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { person } = this.props;
    const { snackAlert, snackMessage } = this.state;
    const actions = {
      open: this.handleClickOpen,
      close: this.handleClose
    };

    return (
      <Fragment>
        <PersonContext.Consumer>
          {state => (
            <div>
              <LeaveContext.Provider
                value={{ actions, state: this.state, person: person }}
              >
                <LeaveButton clickHandler={this.handleClickOpen} />
                <LeaveDialog />
                {snackAlert ? (
                  <SnackBar
                    message={snackMessage}
                    open={snackAlert}
                    closeHandler={() => this.setState({ snackAlert: false })}
                  />
                ) : null}
              </LeaveContext.Provider>
            </div>
          )}
        </PersonContext.Consumer>
      </Fragment>
    );
  }
}

export default withApollo(LeaveContainer);

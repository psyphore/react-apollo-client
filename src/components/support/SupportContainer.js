import React, { PureComponent } from 'react';
import { withApollo } from 'react-apollo';

import { currentSupportPerson } from '../../graphql';
import SupportButton from './SupportButton';
import SupportDialog from './SupportDialog';

class SupportContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      open: false,
      fetching: true,
      extensions: null
    };

    this.handleFetchingSupportPerson = this.handleFetchingSupportPerson.bind(
      this
    );
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async handleFetchingSupportPerson() {
    const { client } = this.props;

    this.setState({
      selectedValue: null,
      open: false,
      fetching: true,
      extensions: null
    });

    const result = await client.query({
      query: currentSupportPerson
    });

    if (result.errors) {
      this.setState({
        selectedValue: null,
        open: true,
        fetching: false,
        extensions: result.extensions
      });
      return;
    }

    this.setState({
      selectedValue: result.data.watcher,
      open: true,
      fetching: false,
      extensions: result.extensions
    });
  }

  async handleClickOpen() {
    this.setState({ open: true });
    await this.handleFetchingSupportPerson();
  }

  handleClose(value) {
    this.setState({ selectedValue: value, open: false });
  }

  render() {
    return (
      <div>
        <SupportButton clickHandler={this.handleClickOpen} />
        <SupportDialog
          selectedValue={this.state.selectedValue || null}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default withApollo(SupportContainer);

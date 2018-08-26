import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { graphql, compose, withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import {
  getMyAvatarQuery,
  getMyNotifications,
  getMyNotificationsQuery
} from '../../graphql';
import PersonChipImage from './PersonChipImage';
import Tooltip from '../tooltip';
import AppBarButtonLoader from '../loader/AppBarButtonLoader';

// https://github.com/benawad/slack-clone-client/blob/49_subscriptions_auth/src/containers/MessageContainer.js

const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
});

class ProfileButton extends PureComponent {
  state = {
    hasMoreItems: true,
    messages: [],
    id: null
  };

  async componentWillMount() {
    const {
      data: { me, loading }
    } = this.props;

    if (!loading) this.setState((prevState, props) => ({ id: me.id }));

    // this.unsubscribe = this.subscribe();
    await this.notifications();
  }

  componentWillUnmount() {
    // if (this.unsubscribe) {
    //   this.unsubscribe();
    // }
  }

  async notifications() {
    const { client } = this.props;
    const result = await client.query({
      query: getMyNotificationsQuery,
      variables: { id: this.state.id || 'p41' }
    });

    const {
      data: { myNotifications }
    } = result;

    console.log(myNotifications);

    // subscribeToMore({
    //   document: getMyNotifications,
    //   variables: { id: 'p41' },
    //   updateQuery: (prev, { subscriptionData }) => {
    //     const { data } = subscriptionData;
    //     if (!data) return prev;
    //     return {
    //       ...prev,
    //       messages: [data.myNotifications, ...prev.messages]
    //     };
    //   }
    // });
  }

  subscribe = () =>
    this.props.data.subscribeToMore({
      document: getMyNotifications,
      variables: { id: this.state.id || 'p41' },
      updateQuery: (prev, { subscriptionData }) => {
        const { data } = subscriptionData;
        if (!data) {
          this.setState((prevState, data) => ({
            message: prevState
          }));
          return prev;
        }

        this.setState((prevState, data) => ({
          messages: data.myNotifications || prevState
        }));

        return {
          // ...prev,
          // ...prev.messages
          messages: [data.myNotifications]
        };
      }
    });

  render() {
    const {
      data: { me, loading },
      classes
    } = this.props;
    const { messages } = this.state;

    return (
      <div className={classes.row}>
        <Tooltip
          title={me && me.firstname ? me.firstname : 'My Profile'}
          placement="top"
        >
          <Badge
            badgeContent={messages.length || 0}
            color="primary"
            classes={{ badge: classes.badge }}
          >
            <Button
              component={Link}
              disabled={loading}
              to="/me"
              variant="fab"
              color="primary"
            >
              {loading ? (
                <AppBarButtonLoader />
              ) : (
                me && <PersonChipImage detail={me} />
              )}
            </Button>
          </Badge>
        </Tooltip>
      </div>
    );
  }
}

ProfileButton.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object
};

export default compose(
  withApollo,
  graphql(getMyAvatarQuery, {
    options: () => ({
      fetchPolicy: 'network-only',
      variables: {}
    })
  })
)(withStyles(styles)(ProfileButton));

import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import { getMyAvatarQuery } from '../../graphql';
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

const gqlOptions = {
  options: () => ({
    fetchPolicy: 'network-only',
    variables: {}
  })
};

const ProfileButton = ({ data: { me, loading }, classes }) => (
  <div className={classes.row}>
    <Tooltip
      title={me && me.firstname ? me.firstname : 'My Profile'}
      placement="top"
    >
      <Badge
        badgeContent={0}
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

ProfileButton.propTypes = {
  data: object.isRequired,
  classes: object
};

export default graphql(getMyAvatarQuery, gqlOptions)(
  withStyles(styles)(ProfileButton)
);

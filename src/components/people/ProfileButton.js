import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

import { getMyAvatarQuery } from '../../graphql';
import PersonChipImage from './PersonChipImage';
import Tooltip from '../tooltip';
import AppBarButtonLoader from '../loader/AppBarButtonLoader';

// https://github.com/benawad/slack-clone-client/blob/49_subscriptions_auth/src/containers/MessageContainer.js

import { personProfilebuttonStyle } from '../../assets/jss';

const gqlOptions = {
  options: () => ({
    fetchPolicy: 'network-only',
    variables: {}
  })
};

const ProfileButton = ({ data: { me, loading }, classes }) => (
  <div className={classes.row}>
    <Tooltip
      title={me && me.firstname ? me.firstname : 'Unauthorized'}
      placement="top"
    >
      {/* <Badge
        badgeContent={0}
        color="primary"
        classes={{ badge: classes.badge }}
      > */}
      <Button
        component={Link}
        disabled={loading || !me}
        to="/me"
        variant="fab"
        color="primary"
      >
        {loading ? (
          <AppBarButtonLoader />
        ) : me ? (
          <PersonChipImage detail={me} />
        ) : (
          <Typography variant="caption">?</Typography>
        )}
      </Button>
      {/* </Badge> */}
    </Tooltip>
  </div>
);

ProfileButton.propTypes = {
  data: object.isRequired,
  classes: object
};

export default graphql(getMyAvatarQuery, gqlOptions)(
  withStyles(personProfilebuttonStyle)(ProfileButton)
);

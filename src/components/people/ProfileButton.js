import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
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
      <Fab component={Link} disabled={loading || !me} to="/me" color="primary">
        {loading ? (
          <AppBarButtonLoader />
        ) : me ? (
          <PersonChipImage detail={me} />
        ) : (
          <Typography variant="caption">?</Typography>
        )}
      </Fab>
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

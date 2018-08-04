import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { getMyAvatarQuery } from '../../graphql';
import PersonChipImage from './PersonChipImage';
import Tooltip from '../tooltip';

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
  }
});

function ProfileButton(props) {
  const { data, classes } = props;
  return (
    <div className={classes.row}>
      {data && data.me ? (
        <Tooltip title={data.me.firstname} placement="top">
          <Button
            component={Link}
            to="/me"
            variant="fab"
            color="primary"
            aria-label="MyProfile"
          >
            <PersonChipImage detail={data.me} />
          </Button>
        </Tooltip>
      ) : null}
    </div>
  );
}

ProfileButton.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object
};

export default graphql(getMyAvatarQuery, {})(withStyles(styles)(ProfileButton));

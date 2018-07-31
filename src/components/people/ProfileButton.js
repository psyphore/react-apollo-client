import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

import { getMyAvatarQuery } from '../../graphql';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

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
  const { data, classes } = props
  return (
    <div className={classes.row}>
      {data && data.me ? (
        <Button
          component={Link}
          to="/me"
          variant="fab"
          color="primary"
          aria-label="MyProfile"
        >
          {data.me.avatar ? (
            <Avatar
              alt={data.me.firstname + ' ' + data.me.lastname}
              src={baseUrl + data.me.avatar}
              className={classNames(
                classes.avatar,
                classes.bigAvatar
              )}
            />
          ) : (
            <Avatar
              alt={data.me.firstname + ' ' + data.me.lastname}
              className={classNames(
                classes.avatar,
                classes.bigAvatar
              )}
            >
              {data.me.firstname.substring(0, 1) +
                data.me.lastname.substring(0, 1)}
            </Avatar>
          )}
        </Button>
      ) : null}
    </div>
  );
}

ProfileButton.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object
};

export default graphql(getMyAvatarQuery, {})(withStyles(styles)(ProfileButton));

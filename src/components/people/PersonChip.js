import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Link from 'react-router-dom/Link';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  },
  size: {
    width: 60,
    height: 60
  }
});

const PersonChip = ({ classes, detail }) => (
  <Fragment>
    <Link to={'/person/' + detail.id} style={{ textDecoration: 'none' }}>
      <Chip
        avatar={
          detail.avatar ? (
            <Avatar size={classes.size} src={baseUrl + detail.avatar} />
          ) : (
            <Avatar sizes={classes.size}>
              {detail.firstname.substring(0, 1) +
                detail.lastname.substring(0, 1)}
            </Avatar>
          )
        }
        label={detail.firstname + ' ' + detail.lastname}
        className={classes.chip}
      />
    </Link>
  </Fragment>
);

PersonChip.propTypes = {
  detail: object.isRequired,
  classes: object.isRequired
};

export default withStyles(styles)(PersonChip);

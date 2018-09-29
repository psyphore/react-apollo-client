import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '../tooltip';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    margin: theme.spacing.unit / 2
  },
  size: {
    width: 60,
    height: 60
  },
  label: {
    width: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

const AvatarRender = ({ size, detail, height = 60, width = 60 }) =>
  detail.avatar ? (
    <Avatar size={size} src={`${baseUrl + detail.avatar}/${width}/${height}`} />
  ) : (
    <Avatar sizes={size}>
      {detail.firstname.substring(0, 1) + detail.lastname.substring(0, 1)}
    </Avatar>
  );

const PersonChip = ({ classes: { root, size, label }, detail }) => (
  <Tooltip title={detail.firstname + ' ' + detail.lastname} placement="top">
    <Chip
      avatar={<AvatarRender size={size} detail={detail} />}
      label={detail.firstname + ' ' + detail.lastname}
      classes={{
        root,
        label
      }}
      component="a"
      href={'/person/' + detail.id}
      clickable
      variant="outlined"
    />
  </Tooltip>
);

PersonChip.propTypes = {
  detail: object.isRequired,
  classes: object.isRequired
};

export default withStyles(styles)(PersonChip);

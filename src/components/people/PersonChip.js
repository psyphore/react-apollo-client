import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '../tooltip';

import { personChipStyle } from '../../assets/jss';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

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
      clickable
      variant="outlined"
    />
  </Tooltip>
);

PersonChip.propTypes = {
  detail: object.isRequired,
  classes: object.isRequired
};

export default withStyles(personChipStyle)(PersonChip);

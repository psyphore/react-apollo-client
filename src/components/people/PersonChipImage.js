import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

export default props => {
  let { detail, sizeClass } = props;
  return (
    <div>
      {detail.avatar ? (
        <Avatar size={sizeClass} src={baseUrl + detail.avatar} />
      ) : (
        <Avatar sizes={sizeClass}>
          {detail.firstname.substring(0, 1) + detail.lastname.substring(0, 1)}
        </Avatar>
      )}
    </div>
  );
};

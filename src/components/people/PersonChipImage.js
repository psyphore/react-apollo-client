import React, { Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`;

export default ({ detail, sizeClass }) => (
  <Fragment>
    {detail.avatar ? (
      <Avatar
        alt={detail.firstname + ' ' + detail.lastname}
        className={classNames({ margin: 10 }, { width: 60, height: 60 })}
        size={sizeClass || 60}
        src={`${baseUrl + detail.avatar}/${60}/${60}`}
      />
    ) : (
      <Avatar
        alt={detail.firstname + ' ' + detail.lastname}
        className={classNames({ margin: 10 }, { width: 60, height: 60 })}
        sizes={sizeClass || 60}
      >
        {detail.firstname.substring(0, 1) + detail.lastname.substring(0, 1)}
      </Avatar>
    )}
  </Fragment>
);
